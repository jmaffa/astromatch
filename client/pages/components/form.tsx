import { useState } from "react";
import LoginButton from "./login-btn"
import { CreateChartParams } from "../api/createChart";
import axios from 'axios';

const ChartForm: React.FC = () => {
  const [formData, setFormData] = useState<CreateChartParams>({
    name: '',
    gender: 0,
    email: '',
    day: 1,
    month: 1,
    year: 2000,
    hour: 0,
    min: 0,
    lat: 0.0,
    lng: 0.0,
    tzone: 0.0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: name === 'name' || name === 'email' ? value : Number(value)
    }));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submitted")
    const apiEndpoint = 'http://localhost:3000/api/createChart';
    const createChart = async () => {
      try {
        console.log(formData.min);
        console.log(formData.hour);
        console.log(formData.year);
        const response = await axios.post(apiEndpoint, {
          name: formData.name,
          gender: "female",
          email: formData.email,
          day: formData.day,
          month: formData.month,
          year: formData.year,
          hour: formData.hour,
          min: formData.min,
          lat: 19.132,
          lng: 72.342,
          tzone: 5.5,
        });
        console.log("response from server: ", response.data);
      } catch (error) {
        console.error('Error while calling api:', error);
      }
    }
    createChart();
    // Here you would typically send formData to your backend or some state management store
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
        </div>

        {/* Repeat for each field, replacing id, type, name, value, and placeholder as necessary */}
        <div className="mb-4">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value={0}>Female</option>
            <option value={1}>Male</option>
            <option value={2}>Prefer not to say</option>
            {/* Add other gender options if needed */}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        {/* You can repeat the structure for each input field as needed */}
        {/* Example for 'day' field */}
        <div className="mb-4">
          <label htmlFor="month" className="block text-sm font-medium text-gray-700">Month</label>
          <input
            type="number"
            name="month"
            id="month"
            value={formData.month}
            onChange={handleChange}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            min={1}
            max={12}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="day" className="block text-sm font-medium text-gray-700">Day</label>
          <input
            type="number"
            name="day"
            id="day"
            value={formData.day}
            onChange={handleChange}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            min={1}
            max={31}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
          <input
            type="number"
            name="year"
            id="year"
            value={formData.year}
            onChange={handleChange}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            min={1}
            max={2024}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="hour" className="block text-sm font-medium text-gray-700">Time of Birth - hour in military time</label>
          <input
            type="number"
            name="hour"
            id="hour"
            value={formData.hour}
            onChange={handleChange}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            min={0}
            max={24}
          />
          
        </div>
        <div className="mb-4">
          <label htmlFor="min" className="block text-sm font-medium text-gray-700">Time of Birth - minute </label>
          <input
              type="number"
              name="min"
              id="min"
              value={formData.min}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              min={0}
              max={59}
            />
        </div>
        <div className="mb-4">
          <label htmlFor="lat" className="block text-sm font-medium text-gray-700">Lat</label>
          <input
              type="number"
              name="lat"
              id="lat"
              value={formData.lat}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
        </div>
        <div className="mb-4">
          <label htmlFor="lng" className="block text-sm font-medium text-gray-700">Long</label>
          <input
              type="number"
              name="lng"
              id="lng"
              value={formData.lng}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
        </div>


        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChartForm;