import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = "catIpTracking";
const collectionName = "ips";

const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL ||
  "https://discord.com/api/webhooks/1377284384024952952/haM7BTElsOd8yMzXENPQMc9o7dh1oMpbfDEhnD2nB1EO0rhOX-xVmVo-GA-k2wMajtS0";

export async function GET(request: any) {
  const ip =
    request.headers.get("x-forwarded-for") || request.connection.remoteAddress;

  const response = await fetch(
    `https://proxycheck.io/v2/${ip}?key=905036-1j7377-8y43r3-01016d?vpn=1&asn=1`
  );

  const data = await response.json();

  const isVPN = data[ip].type;
  const location = data[ip].country;
  const full_data = data[ip];

  const timestamp = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Tokyo",
    hour12: false,
  });

  const document = {
    ip,
    isVPN,
    location,
    full_data,
    timestamp,
  };

  try {
    if (!uri) {
      console.error("MONGODB_URI is not configured on the server");
    } else {
      const client = new MongoClient(uri);
      await client.connect();
      try {
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        await collection.insertOne(document);
        console.log("Data inserted successfully!");
      } finally {
        await client.close();
      }
    }

    const discordMessage = {
      content: `Maxwell Carter (Spain) portfolio is checked by:
        **IP:** \`\`\`${ip}\`\`\`
        **VPN:** ${isVPN}
        **Proxy:** ${full_data.proxy}
        **Country:** ${full_data.country || "N/A"}
        **Region:** ${full_data.region || "N/A"}
        **City:** ${full_data.city || "N/A"}
        **Timestamp:** ${timestamp}
        https://www.ip2location.io/
        If vpn is business and proxy is no, in this case check that IP on ip2location.io.
        Or if you think you need to check double check, check on ip2location.io.
        `,
    };

    const discordResponse = await fetch(discordWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordMessage),
    });

    if (discordResponse.ok) {
      console.log("Message sent to Discord!");
    } else {
      console.error(
        "Failed to send message to Discord:",
        discordResponse.status
      );
    }
  } catch (error) {
    console.error(
      "Error inserting data into MongoDB or sending to Discord",
      error
    );
  } finally {
    // client closed where created (if created)
  }

  return new Response(
    JSON.stringify({
      ip,
      isVPN,
    }),
    { status: 200 }
  );
}
