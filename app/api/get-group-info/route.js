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
    let query = {};
    const data = await collection.find(query).toArray();

    return NextResponse.json(data[0], {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": `${process.env.WEB_URL}`,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch {
    return NextResponse.json("Error", { status: 500 });
    // return NextResponse.json({ "msg": "FAILED" })
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
