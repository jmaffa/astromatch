import { WithId, Document } from "mongodb";
import clientPromise from "../../lib/mongodb";

export default async (
  req: any,
  res: {
    json: (
      arg0:
        | WithId<Document>[]
        | { insertedId: Object }
        | { error: string }
        | { exists: boolean }
    ) => void;
  }
) => {
  try {
    const client = await clientPromise;
    const db = client.db("charts");

    const { email } = req.body; // Extract the parameter

    const existingUser = await db.collection("chart").findOne({ email });
    const exists = !!existingUser; // boolean
    res.json({ exists });
  } catch (e) {
    console.error(e);
    res.json({ error: "An error occurred while fetching data" });
  }
};
