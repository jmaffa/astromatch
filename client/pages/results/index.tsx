import Head from "next/head";
import clientPromise from "../../lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";

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

  interface User {
    _id: string;
    name: string;
    risingSign: string;
    venusSign: string;
    moonSign: string;
  }
  export default function Results({isConnected}: InferGetServerSidePropsType<typeof getServerSideProps>, venusSign: string) {
    const [results,setResults] = useState<User[]>([]);
    
    const fetchResults = async () => {
      const res = await fetch("/api/getUsersByRising");
      const data = await res.json();
      setResults(data);
      console.log(data)
    };
    const getResults = async () => {
      try{
          const res = await fetch('/api/getUsersByRising', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  venusSign: 'aquarius'
              })
          })
          const data = await res.json()

          if (res.ok){
              console.log('Success:',data)
              setResults(data)
          } else{
              console.error('Error:', data)
          }

      } catch(error){
          console.error('Error:', error)
      }
  }
    useEffect(() => {
      console.log(isConnected);
      if (isConnected) {
        // Fetch data from mongo
        getResults();
      }

    }, []);
    return (
        <div className='flex-col h-full bg-primary pl-3 pt-6'>
          <button className="flex bg-secondary hover:bg-secondary text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            <Link href='/'>Home</Link>
          </button>
          {/* Results Header */}
          <div className="py-10 px-3">
                <h1 className="text-white text-xl text-decoration-line: underline">Results</h1>
          </div>
          {/* Results */}
          <div>
            {/* Map through all results */}
            {results.map((result) => (
              <div key={result._id} className="flex flex-row w-screen p-3 rounded-lg m-3">
                <div className="w-1/4">
                  <h1 className="text-white text-xl">{result.name.substring(0,1).toUpperCase() + result.name.substring(1)}</h1>
                  <h2 className="text-white text-lg">{"rising: " + result.risingSign}</h2>
                </div>
                <div className="w-1/4">
                  <h2 className="text-white text-lg">{"venus: " + result.venusSign}</h2>
                  <h2 className="text-white text-lg">{"moon: " + result.moonSign}</h2>
                </div>
              </div>
            ))}
          </div>
          <div className="-ml-5">
            <img src="/results-planet.svg"></img>
          </div>
        </div>
    )
  }