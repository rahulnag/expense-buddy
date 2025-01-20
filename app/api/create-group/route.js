import { NextResponse } from "next/server";
const { MongoClient } = require("mongodb");

const uri = process.env.DB_URL;
export async function POST(request) {
  const resource = await request.json();
  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri);
  try {
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(resource.groupName);
    const returned_resource = await collection.insertOne(resource);

    // const options = { ordered: true };
    // const returned_resource = await collection.insertMany(resource, options)
    return NextResponse.json({
      msg: "SUCCESS",
      count: returned_resource.insertedCount,
    });
  } catch {
    return NextResponse.json({ msg: "ERROR" }, { status: 500 });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
