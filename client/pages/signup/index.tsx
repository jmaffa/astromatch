import { InferGetServerSidePropsType } from "next";
import { getServerSideProps } from "..";
import { useState } from "react";

export default function Signup() {
    const name = useState('')
    const email = useState('')
    const birthday = useState('')
    const birthHour = useState('')
    const birthMinute = useState('')
    const birthLocation = useState('')

    return (
        <div className="container">
            <h1>Signup</h1>
            <input></input>
        </div>
    )
  }