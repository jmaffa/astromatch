import { WithId, Document } from "mongodb";
import clientPromise from "../../lib/mongodb";

export default async (req: any, res: { json: (arg0: WithId<Document>[]) => void; }) => {
   try {
       const client = await clientPromise;
       const db = client.db("charts");

       const chart = await db
           .collection("chart")
           .find({})
           .toArray();

       const chartAsJson = res.json(chart);
       console.log(chartAsJson)
   } catch (e) {
       console.error(e);
   }
};