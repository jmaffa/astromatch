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

    const { venusSign } = req.params; // Extract the rising sign parameter

    // Find your romantic matches
    const usersWithMatchingVenusSign = await db
      .collection("chart")
      .find({ risingSign: venusSign }) // Assuming risingSign is the field you want to match
      .toArray();

    res.json(usersWithMatchingVenusSign);
  } catch (e) {
    console.error(e);
    res.json({ error: "An error occurred while fetching data" });
  }
};
