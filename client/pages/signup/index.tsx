import { InferGetServerSidePropsType } from "next";
import { getServerSideProps } from "..";
import { useState } from "react";
import { send } from "process";

// primary (background 191941)
// secondary (buttons) CB18B9
// other buttons AB8AE7
// white F7F7F7
export default function Signup() {
    const [name, setName] = useState('')
    const email = useState('')
    const birthday = useState('')
    const birthHour = useState('')
    const birthMinute = useState('')
    const birthLocation = useState('')
    
    const postData = async () => {
        try{
            const res = await fetch('/api/createChart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: 'John Doe',
                    gender: 'Male',
                    email: 'john@example.com',
                    venusSign: 'Aries',
                    moonSign: 'Leo',
                    risingSign: 'Libra'
                })
            })
            const data = await res.json()

            if (res.ok){
                console.log('Success:',data)
            } else{
                console.error('Error:', data)
            }
        } catch(error){
            console.error('Error:', error)
        }
    }
    // function sendData(){
        
    // }
    return (
        <div className='flex-col h-full bg-primary'>
            {/* Arrows */}
            <div className="flex justify-between px-5">
                <div className="text-white">
                    <h1>←</h1>
                </div>
            </div>
            {/* enter data */}
            <div className="px-5">
                <h1 className="text-white text-decoration-line: underline">Enter Data</h1>
            </div>
            {/* form */}
            <div className="flex-row">
                {/* left half */}
                <div className="flex flex-row justify-start pl-8">
                    <div className="text-white text-left px-4 py-1 m-2">
                        <hr></hr>
                        <p className="font-share-tech">Name</p>
                    </div>
                    <div className="text-white text-center px-4 py-1 m-2">
                        <input className="bg-primary-light text-white" type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)}></input>
                    </div>
                </div>
                
            </div>
            <button onClick={postData} className="bg-secondary hover:bg-secondary text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Button
            </button>
        </div>
        
    )
  }