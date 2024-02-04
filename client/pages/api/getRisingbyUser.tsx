import { WithId, Document } from "mongodb";
import clientPromise from "../../lib/mongodb";

export default async (
  req: any,
  res: {
    json: (
      arg0: WithId<Document>[] | { insertedId: Object } | { error: string }
    ) => void;
  }
) => {
  try {
    const client = await clientPromise;
    const db = client.db("charts");

    const { email } = req.body; // get the user's info from their email

    // Find user in DB to get their info
    const userInfo = await db
      .collection("chart")
      .find({ email: email }) // Assuming risingSign is the field you want to match
      .toArray();

    res.json(userInfo);
  } catch (e) {
    console.error(e);
    res.json({ error: "An error occurred while fetching data" });
  }
};
