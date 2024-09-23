import React, { useEffect, useState } from 'react'
import axios from "axios";
import "../component/style.css";
import { IoLocation } from "react-icons/io5";
const WeatherHome = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState({});
  const [background, setBackground] = useState("");
  
  const changeBackground =(condition,temperature)=>{
    console.log(temperature)
    console.log(condition)
    const p ="My name is prashant";
    console.log(p.includes("Prashant"));
  }

  //get API
  const getWeatherAPI = async (value = "Jabalpur") => {
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=c3539e73591240b0ae063419242209&q=${value}`).then((response) => {
      setData(response.data);
      changeBackground(response?.data?.current?.condition?.text , response?.data?.current?.temp_c);
      localStorage.setItem("responseData", JSON.stringify(response.data));
    })
      .catch((error) => { console.log(error); })
  }
  console.log("Data ", data)
  const handleFind = async () => {
    console.log("city ", city);
    getWeatherAPI(city);
  }

  const sides = [
    {
      id: 1,
      icon: "",
      title: "FEELS LIKE",
      value: data?.current?.feelslike_c
    },
    {
      id: 2,
      icon: "",
      title: "PRECIPITATION",
      value: data?.current?.precip_in
    },
    {
      id: 3,
      icon: "",
      title: "VISIBILIY",
      value: data?.current?.vis_km
    },
    {
      id: 4,
      icon: "",
      title: "HUMIDITY",
      value: data?.current?.humidity
    }
  ]

  useEffect(() => {
    getWeatherAPI();
  }, [])
  return (
    <div className='main-container'>
      <div className='layout-container'>
        <div className='glassmorphic-container'>
          <div className='search-container'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-geo-alt-fill location-icon" viewBox="0 0 20 20">
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
            </svg>
            <input className='search-bar' type='text' value={city} name='city' placeholder='Enter city to be searched' onChange={(e) => { setCity(e.target.value) }} />
            <button className='search-button' onClick={handleFind}>Search</button>
          </div>

          <div className='temperature-container'>
            <div className='temperature-glass-container'>
              <div className='location-name'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-geo-alt-fill location-name-icon" viewBox="0 0 20 20">
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                </svg>
                <p className='location-title'>{data?.location?.name} <span className='region-title'>{data?.location?.region}</span></p>
              </div>

              <div className='temperature-display'>
                <h1 className='temperature-c'>{data?.current?.temp_c}</h1>
                <span className='condition-text'>{data?.current?.condition?.text}</span>
              </div>

              <div className='outer-side-div'>
              {sides.map((s) => {
                return(
                  <div className='sides-container' key={s.id}>
                  <div className='side-glass-container'>
                    <span className='side-value-tag'>{s.value}</span>
                    <p className='side-p-tag'><span>{s.id}</span> {s.title}</p>
                  </div>
                </div>
                )
              })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherHome
