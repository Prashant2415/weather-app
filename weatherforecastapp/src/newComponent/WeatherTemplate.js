import React, { useEffect, useState } from 'react'
import "../newComponent/styles.css";
import axios from "axios"
const WeatherTemplate = () => {
    const [data, setData] = useState({});
    const [city, setCity] = useState("");
    const [icon, setIcon] = useState("");
    console.log("City ", city);

    const getWeatherAPI = async(value = "Jabalpur")=>{
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=c3539e73591240b0ae063419242209&q=${value}`).then((response)=>{
            setData(response.data);
            const update = response.data.current.condition.icon;
            console.log(update)
            let v = update.substring(2);
            console.log(v);
            setIcon(v);
            localStorage.setItem("weatherData", JSON.stringify(response.data));
        })
        .catch((error)=>{console.log(error)})
    }

    const handleSearch = async ()=>{
        getWeatherAPI(city);
    }
    useEffect(()=>{
        getWeatherAPI();
    },[])

  return (
    <div className='weather-container'>
      <div className='menu-container'></div>
      <div className='main-container'>
        <div className='inner-main-container'>
        <div className='search-container'>
            <input className='input-search' type='text' value={city} name='city'   placeholder='Enter location' onChange={(e)=>{setCity(e.target.value)}}/>
            <button className='search-button' onClick={handleSearch}>Search</button>
        </div>
        
        <div className='city-name-temp-icon-container'>
            <div className='city-name-temp'>
                <h1 className='city-name'>{data?.location?.name}</h1>
                <span className='city-state'>{data?.location?.region}</span>
                <p className='city-temp'>{data?.current?.temp_c}</p>
                <p className='city-text'>{data?.current?.condition?.text}</p>
            </div>

            <div className='icon'>
                <img src={icon} alt='image'/>
            </div>
        </div>
        
        <div className='current-update-container'>

        </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherTemplate
