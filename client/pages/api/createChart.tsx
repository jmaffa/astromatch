import { WithId, Document } from "mongodb";
import clientPromise from "../../lib/mongodb";
import axios from "axios";

export type Planet = {
  name: string;
  full_degree: number;
  norm_degree: number;
  speed: number;
  is_retro: string;
  sign_id: number;
  sign: string;
  house: number;
};

export type CreateChartParams = {
  name: string;
  gender: string;
  email: string;
  day: number;
  month: number;
  year: number;
  hour: number;
  min: number;
  lat: number;
  lng: number;
  tzone: number;
};

const createChart = async (params: CreateChartParams) => {
  try {
    const client = await clientPromise;
    const db = client.db("charts");
    const astrologyApiUrl =
      "https://json.astrologyapi.com/v1/western_horoscope";
    const userId = 628181;
    const apiKey = "2b3c65dff80156234484b6ff058b4f0e";
    const astrologyApiResponse = await axios.post(
      astrologyApiUrl,
      {
        day: params.day,
        month: params.month,
        year: params.year,
        hour: params.hour,
        min: params.min,
        lat: params.lat,
        lon: params.lng, // Use lon instead of lng
        tzone: params.tzone,
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(userId + ":" + apiKey).toString(
            "base64"
          )}`, // header with id and apikey
          "Content-Type": "application/json",
        },
      }
    );

    const venusSign = astrologyApiResponse.data.planets.find(
      (p: Planet) => p.name == "Venus"
    ).sign;
    const moonSign = astrologyApiResponse.data.planets.find(
      (p: Planet) => p.name == "Moon"
    ).sign;
    const risingSign = astrologyApiResponse.data.houses.get[0].sign; // because rising = first house

    // insert into db, user id generated for us
    const res = await db.collection("chart").insertOne({
      name: params.name,
      gender: params.gender,
      email: params.email,
      venusSign,
      moonSign,
      risingSign,
    });

    return res.insertedId;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export default async (
  req: any,
  res: {
    json: (
      arg0: WithId<Document>[] | { insertedId: Object } | { error: string }
    ) => void;
  }
) => {
  try {
    // Extract parameters from the request or any other source
    const params: CreateChartParams = req.body;

    // Call fetchData with parameters
    const insertedId = await createChart(params);

    res.json({ insertedId });
  } catch (e) {
    res.json({ error: "An error occurred while fetching data" });
  }
};
