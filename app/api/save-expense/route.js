import { NextResponse } from "next/server";
const { MongoClient } = require("mongodb");

const uri = process.env.DB_URL;

export async function POST(request) {
  const resource = await request.json();
  const { groupName, month, expense } = resource;

  if (!groupName || !month || !expense) {
    return NextResponse.json(
      "Invalid request. Missing groupName, month, or expense data.",
      { status: 400 }
    );
  }

  const client = new MongoClient(uri);

  try {
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(groupName);

    // Add the expense for the given month
    const result = await collection.updateOne(
      {}, // Assuming the document is identified by the collection name (groupName)
      {
        $push: {
          [`expenseDetails.${month}.expense`]: expense, // Add the expense to the month's array
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
    return NextResponse.json("ERROR", { status: 500 });
  } finally {
    await client.close(); // Ensure the client is closed
  }
}
