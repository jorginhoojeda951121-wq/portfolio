import { MongoClient, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const uri = process.env.MONGODB_URI;
const dbName = "portfolio_contacts";
const collectionName = "contacts";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  let client: MongoClient | undefined;
  try {
    const { id } = params;
    const updates = await request.json();
    
    delete updates.id;
    
    if (!uri) {
      console.error("MONGODB_URI is not configured on the server");
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }

    client = new MongoClient(uri);
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }
    
    const updatedContact = await collection.findOne({ _id: new ObjectId(id) });
    
    return NextResponse.json({ 
      success: true, 
      contact: { ...updatedContact, id: updatedContact?._id.toString() }
    });
  } catch (error) {
    console.error("Error updating contact:", error);
    return NextResponse.json({ error: "Failed to update contact" }, { status: 500 });
  } finally {
    try {
      if (client) {
        await client.close();
      }
    } catch (e) {
      console.error("Error closing MongoDB client:", e);
    }
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  let client: MongoClient | undefined;
  try {
    const { id } = params;

    if (!uri) {
      console.error("MONGODB_URI is not configured on the server");
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }

    client = new MongoClient(uri);
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return NextResponse.json({ error: "Failed to delete contact" }, { status: 500 });
  } finally {
    try {
      if (client) {
        await client.close();
      }
    } catch (e) {
      console.error("Error closing MongoDB client:", e);
    }
  }
}
