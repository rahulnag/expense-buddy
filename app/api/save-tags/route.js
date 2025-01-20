import { NextResponse } from "next/server";
const { MongoClient } = require("mongodb");

const uri = process.env.DB_URL;

export async function POST(request) {
  const resource = await request.json();
  const { groupName, tags } = resource;

  if (!groupName || !tags) {
    return NextResponse.json(
      "Invalid request. Missing groupName, , or tags data.",
      { status: 400 }
    );
  }

  const client = new MongoClient(uri);

  try {
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(groupName);

    // Add the tags for the given
    const result = await collection.updateOne(
      {}, // Assuming the document is identified by the collection name (groupName)
      {
        $push: {
          [`tags`]: tags, // Add the tags to the 's array
        },
      },
      { upsert: true } // Create the document if it doesn't exist
    );

    return NextResponse.json({
      msg: "SUCCESS",
      modifiedCount: result.modifiedCount,
      upsertedCount: result.upsertedCount || 0,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json("Error", { status: 500 });
  } finally {
    await client.close(); // Ensure the client is closed
  }
}
