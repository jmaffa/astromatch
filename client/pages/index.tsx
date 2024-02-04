import Head from "next/head";
import clientPromise from "../lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import LoginButton from "./components/login-btn";
import Header from "./components/header";
import Link from "next/link";


type ConnectionStatus = {
  isConnected: boolean;
};

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="relative min-h-screen bg-[url('/landing.jpg')] bg-cover bg-fixed">
      <Head>
        <title>AstroMatch</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="flex justify-between items-center h-full pl-8">
        {/* Text container */}
        <div className="max-w-lg space-y-6">
          <h1 className="text-5xl font-extrabold text-white">
            <span className="block text-white">Your Perfect</span>
            <span className="block text-white">Match in the Stars</span>
          </h1>
          <p className="text-white">
            Discover the magic of AstroMatch, where celestial energies unite hearts
            in perfect alignment...
          </p>
          <button className="px-6 py-3 bg-secondary text-white rounded-full font-bold">
            <Link href='/signup'>Start Here</Link>
          </button>
        </div>

        {/* Planet Image container */}
        <div className="flex-1 flex justify-end items-end">
          <img src="/planet.svg" alt="Planet" width={500} height={500} />
        </div>
      </div>
      
      {/* Footer if needed */}
    </div>
  );
}
