import { InferGetServerSidePropsType } from "next";
import { getServerSideProps } from "..";
import { useState } from "react";
import { send } from "process";
import Link from "next/link";

// primary (background 191941)
// secondary (buttons) CB18B9
// other buttons AB8AE7
// white F7F7F7
export default function Signup() {
    const [name, setName] = useState('')
    const [rising, setRising] = useState('')
    const [moon, setMoon] = useState('')
    const [venus, setVenus] = useState('')
    const [ownGender, setOwnGender] = useState('')

    // TODO: needs to read the radio buttons then send those values along :)
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
        <div className='flex-col h-full bg-primary pb-10'>
            
            {/* Arrows */}
            <div className="flex justify-between">
                <div className="text-white flex-col align-middle pt-8 px-6">
                    {/* TODO: Make this a button that navigates you home */}
                    <button className="flex w-1/8 bg-secondary hover:bg-secondary text-blue-700 font-semibold hover:text-white py-2 px-4 hover:bg-opacity-80 rounded">
                        <Link href='/'>Home</Link>
                    </button>
                    <p className="pt-2 mt-6 w-1/2">(Pre Step) Calculate your birth chart! To find your list of matches, please calculate your birth chart <a target="_blank" href="https://astro-charts.com/" className="text-tertiary underline transition ease-in-out">here</a> and fill out the form when you have your results. </p>
                </div>
                {/* TODO: Make the planet fit lol */}
                <div className="flex-1 flex justify-end items-end overflow-hidden">
                    <img src="/planet-2.svg" alt="Planet" width={1000} />
                </div>
            </div>
            {/* enter data */}
            
            {/* form */}
            <div className="text-white flex-row w-screen -mt-60">
                <div className="px-5">
                    <h1 className="text-white text-xl text-decoration-line: underline">Enter Data</h1>
                </div>
                {/* Name */}
                <div className="flex flex-row justify-start pl-8 py-5">
                    <div className="text-left px-4 py-2 w-1/4">
                        <hr className="w-1/4"></hr>
                        <p className="">Name</p>
                    </div>
                    <div className="text-center px-4 py-1 w-1/3">
                        <input className="bg-primary-light text-white w-full rounded-md px-2 py-1" type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)}></input>
                    </div>
                </div>
                {/* Gender */}
                <div className="flex flex-row justify-start pl-8 py-5 text-white">
                    <div className="text-left px-4 py-1 w-1/4">
                        <hr className="w-1/4"></hr>
                        <p className="">Gender</p>
                    </div>
                    <div className="text-center px-4 py-1 w-1/3">
                        <div className="flex flex-col">
                            <div className="flex items-center mr-4 mb-4">
                                <input id="radio1" type="radio" name="radio" className="transition duration-200 hover:scale-125" />
                                <label htmlFor="radio1" className="flex items-center cursor-pointer px-2">
                                    Male
                                </label>
                            </div>
                            <div className="flex items-center mr-4 mb-4">
                                <input id="radio2" type="radio" name="radio" className="transition duration-200 hover:scale-125" />
                                <label htmlFor="radio2" className="flex items-center cursor-pointer px-2">
                                    Female
                                </label>
                            </div>
                            <div className="flex items-center mr-4 mb-4">
                                <input id="radio3" type="radio" name="radio" className="transition duration-200 hover:scale-125" />
                                <label htmlFor="radio3" className="flex items-center cursor-pointer px-2">
                                    Non-Binary
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                {/* SIGNS: Venus, Moon, Rising */}
                <div className="flex flex-row justify-start pl-8 py-5">
                    <div className=" text-left px-4 py-1 w-1/4">
                        <hr className="w-1/4"></hr>
                        <p className="">Venus Sign</p>
                    </div>
                    <div className="text-center px-4 py-1 w-1/3">
                        <input className="bg-primary-light text-white w-full rounded-md rounded-md px-2 py-1" type="text" placeholder="Aries, Pisces..." value={venus} onChange={e => setVenus(e.target.value)}></input>
                    </div>
                </div>
                <div className="flex flex-row justify-start pl-8 py-5">
                    <div className=" text-left px-4 py-1 w-1/4">
                        <hr className="w-1/4"></hr>
                        <p className="">Moon Sign</p>
                    </div>
                    <div className="text-center px-4 py-1 w-1/3">
                        <input className="bg-primary-light text-white w-full rounded-md rounded-md px-2 py-1" type="text" placeholder="Sagittarius, Libra..." value={moon} onChange={e => setMoon(e.target.value)}></input>
                    </div>
                </div>
                <div className="flex flex-row justify-start pl-8 py-5">
                    <div className=" text-left px-4 py-1 w-1/4">
                        <hr className="w-1/4"></hr>
                        <p className="">Rising Sign</p>
                    </div>
                    <div className="text-center px-4 py-1 w-1/3">
                        <input className="bg-primary-light text-white w-full rounded-md rounded-md px-2 py-1" type="text" placeholder="Aquarius, Taurus..." value={rising} onChange={e => setRising(e.target.value)}></input>
                    </div>
                </div>
                {/* Dating Preference */}
                <div className="flex flex-row justify-start pl-8 py-5 text-white">
                    <div className="text-left px-4 py-1 w-1/4">
                        <hr className="w-1/4"></hr>
                        <p className="">Dating Preference</p>
                    </div>
                    <div className="text-center px-4 py-1 w-1/3">
                        <div className="flex flex-col">
                            <div className="flex items-center mr-4 mb-4">
                                <input id="radio4" type="radio" name="dating" className="transition duration-200 hover:scale-125" />
                                <label htmlFor="radio4" className="flex items-center cursor-pointer px-2">
                                    Romantic
                                </label>
                            </div>
                            <div className="flex items-center mr-4 mb-4">
                                <input id="radio5" type="radio" name="dating" className="transition duration-200 hover:scale-125" />
                                <label htmlFor="radio5" className="flex items-center cursor-pointer px-2">
                                    Platonic
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Gender Preference */}
                <div className="flex flex-row justify-start pl-8 py-5 text-white">
                    <div className="text-left px-4 py-1 w-1/4">
                        <hr className="w-1/4"></hr>
                        <p className="">Gender Preference</p>
                    </div>
                    <div className="text-center px-4 py-1 w-1/3">
                        <div className="flex flex-col">
                            <div className="flex items-center mr-4 mb-4">
                                <input id="radio6" type="radio" name="gender" className="transition duration-200 hover:scale-125" />
                                <label htmlFor="radio6" className="flex items-center cursor-pointer px-2">
                                    Male
                                </label>
                            </div>
                            <div className="flex items-center mr-4 mb-4">
                                <input id="radio7" type="radio" name="gender" className="transition duration-200 hover:scale-125" />
                                <label htmlFor="radio7" className="flex items-center cursor-pointer px-2">
                                    Female
                                </label>
                            </div>
                            <div className="flex items-center mr-4 mb-4">
                                <input id="radio8" type="radio" name="gender" className="transition duration-200 hover:scale-125" />
                                <label htmlFor="radio8" className="flex items-center cursor-pointer px-2">
                                    Non-Binary
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Submit Button */}
            <div className='flex-col h-full bg-primary flex justify-center items-center pb-10'>
                <button onClick={postData} className="bg-secondary hover:bg-secondary text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    Done
                </button>
            </div>
            {/* TODO: add the other graphics */}

            
        </div>
        
    )
  }