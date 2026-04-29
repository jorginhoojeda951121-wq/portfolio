import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const uri = process.env.MONGODB_URI;
const dbName = "portfolio_contacts";
const collectionName = "contacts";

export async function GET() {
    let client: MongoClient | undefined;
    try {
        if (!uri) {
            console.error("MONGODB_URI is not configured on the server");
            return NextResponse.json({ error: "Database not configured" }, { status: 500 });
        }

        client = new MongoClient(uri);
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        const contacts = await collection.find({}).sort({ timestamp: -1 }).toArray();

        return NextResponse.json(contacts);
    } catch (error) {
        console.error("Error fetching contacts:", error);
        return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
    } finally {
        if (client) await client.close();
    }
}

export async function POST(request: NextRequest) {
    let client: MongoClient | undefined;
    try {
        const contact = await request.json();

        if (!contact.name || !contact.email || !contact.phone || !contact.message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        if (!contact.timestamp) {
            contact.timestamp = new Date().toISOString();
        }

        if (!contact.status) {
            contact.status = "new";
        }

        if (!uri) {
            console.error("MONGODB_URI is not configured on the server");
            return NextResponse.json({ error: "Database not configured" }, { status: 500 });
        }

        client = new MongoClient(uri);
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        const result = await collection.insertOne(contact);

        return NextResponse.json({
            success: true,
            id: result.insertedId,
            contact: { ...contact, id: result.insertedId.toString() }
        });
    } catch (error) {
        console.error("Error creating contact:", error);
        return NextResponse.json({ error: "Failed to create contact" }, { status: 500 });
    } finally {
        if (client) await client.close();
    }
}