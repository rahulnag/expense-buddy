//check if the group exist or not, and if not exist then create a group else throw a warning
import { NextResponse } from "next/server";
const { MongoClient } = require("mongodb");

const uri = process.env.DB_URL;

export async function POST(request) {
  const resource = await request.json();

  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri);

  try {
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(resource.groupName); // Assuming "groups" is your collection name

    // Check if the groupName exists
    const groupName = resource.groupName;
    const group = await collection.findOne({ groupName: groupName });
    if (!group) {
      // If group does not exist
      return NextResponse.json(`Group does not exist`, { status: 401 });
    } else {
      // If group exists, check for group password and then connect to the group, then return the group data

      // if group name exist then tell user that group name exist, enter password to join the group
      // else tell user to choose a different group name

      if (group?.groupPassword == resource?.groupPassword) {
        return NextResponse.json(group, {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": `${process.env.WEB_URL}`,
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        });
      } else {
        return NextResponse.json(`Wrong credentials`, { status: 401 });
      }
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
