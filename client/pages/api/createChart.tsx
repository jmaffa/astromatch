import { WithId, Document, ReadPreference } from "mongodb";
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

    const { name, email, gender, preference, venusSign, moonSign, risingSign } =
      req.body; // Extract the parameters
    // insert into db, user id generated for us
    const res = await db.collection("chart").insertOne({
      name: name,
      gender: gender,
      email: email,
      preference: preference,
      venusSign,
      moonSign,
      risingSign,
    });

    return res.insertedId;
  } catch (e) {
    console.error(e);
    res.json({ error: "An error occurred while posting data" });
  }
};
