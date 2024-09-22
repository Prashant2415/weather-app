import React, { useEffect, useState } from 'react'
import axios from "axios";
import "../component/style.css";
import { IoLocation } from "react-icons/io5";
const WeatherHome = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState({});
  //get API
  const getWeatherAPI = async (value = "Jabalpur") => {
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=c3539e73591240b0ae063419242209&q=${value}`).then((response) => {
      setData(response.data);
    })
      .catch((error) => { console.log(error); })
  }
  console.log("Data ", data)
  const handleFind = async () => {
    console.log("city ", city);
    getWeatherAPI(city);
  }

  useEffect(() => {
    getWeatherAPI();
  }, [])
  return (
    // <div>
    //   <h1>Weather Home</h1>
    //   <div>
    //     <input type='text' value={city} name='city' onChange={(e)=>{setCity(e.target.value)}}/>
    //     <br/>
    //     <button onClick={handleFind}>Find</button>
    //   </div>
    // </div>
    <div className='main-container'>
      <div className='layout-container'>
        <div className='glassmorphic-container'>
          <div className='search-container'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-geo-alt-fill location-icon" viewBox="0 0 20 20">
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
            </svg>
            <input className='search-bar' type='text' value={city} name='city' placeholder='Enter city to be searched' onChange={(e) => { setCity(e.target.value) }} />
            <button className='search-button' onClick={handleFind}>Search</button>
          </div>

          <div className='temperature-container'>
            <div className='temperature-glass-container'>
              <div className='location-name'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-geo-alt-fill location-name-icon" viewBox="0 0 20 20">
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                </svg>
                <p className='location-title'>{data?.location?.name}</p>
              </div>

              <div className='temperature-display'>
                <h1 className='temperature-c'>{data?.current?.temp_c}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherHome
