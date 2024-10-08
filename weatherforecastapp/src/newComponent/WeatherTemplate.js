import React, { useEffect, useState } from 'react'
import "../newComponent/styles.css";
import axios from "axios";
import ConvertTemperature from './ConvertTemperature';
const WeatherTemplate = () => {
    const [data, setData] = useState({});
    const [city, setCity] = useState("");
    const [icon, setIcon] = useState("");
    const [list, setList] = useState([]);
    const localData = JSON.parse(localStorage.getItem('cityDetails'));
    const apiKey = "61689bcee9c82e9ef943f208bddd3aea";
    const handleTodayForecast = async(lat, lon)=>{
        let forecast = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`).then((response)=>{
            //const targetDate = response.data.list[0].dt_txt.split(' ')[0];
             const targetDate = "2024-09-25";
            const filteredData = response.data.list.filter(entry => entry.dt_txt.split(' ')[0] === targetDate);
            setList(filteredData);
        })
        .catch((error)=>{console.log(error)})
    }
   console.log(list)
    const getWeatherAPI = async (value = "Jabalpur") => {
        //GET API to get city details from weatherapi site
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=c3539e73591240b0ae063419242209&q=${value}`).then((response) => {
            setData(response.data);
            const update = response.data.current.condition.icon;
            setIcon(update);
            let {lat,lon} = response.data.location;
            handleTodayForecast(lat,lon)
            localStorage.setItem("weatherData", JSON.stringify(response.data));
        })
            .catch((error) => { console.log(error) })  
    }
    const handleSearch = async () => {
        getWeatherAPI(city);
    }

    let airCondition = [
        {
            id: 1,
            title: "Real Feel",
            icon: "",
            value: data?.current?.feelslike_c
        },
        {
            id: 2,
            title: "Wind",
            icon: "",
            value: `${data?.current?.wind_kph} km/h`
        },
        {
            id: 3,
            title: "Humidity",
            icon: "",
            value: data?.current?.humidity
        },
        {
            id: 4,
            title: "UV Index",
            icon: "",
            value: data?.current?.uv
        }
    ];
    let todaysForecast = [
        {
            id: 1,
            time: "00:00am",
            icon: "",
            value: 2
        },
        {
            id: 2,
            time: "03:00am",
            icon: "",
            value: 2
        },
        {
            id: 3,
            time: "06:00am",
            icon: "",
            value: 2
        },
        {
            id: 4,
            time: "09:00am",
            icon: "",
            value: 2
        },
        {
            id: 5,
            time: "12:00am",
            icon: "",
            value: 2
        },
        {
            id: 6,
            time: "15:00am",
            icon: "",
            value: 2
        },
        {
            id: 7,
            time: "18:00am",
            icon: "",
            value: 2
        },
        {
            id: 8,
            time: "21:00am",
            icon: "",
            value: 2
        },
    ]
    let weekDays = [
        {
        id:1,
        title: "Mon",
        icon: "",
        value: 20
        },
        {
        id:2,
        title: "Tue",
        icon: "",
        value: 20
        },
        {
        id:3,
        title: "Wed",
        icon: "",
        value: 20
        },
        {
        id:4,
        title: "Thu",
        icon: "",
        value: 20
        },
        {
        id:5,
        title: "Fri",
        icon: "",
        value: 20
        },
        {
        id:6,
        title: "Sat",
        icon: "",
        value: 20
        },
        {
        id:7,
        title: "Sun",
        icon: "",
        value: 20
        },
        ]
    useEffect(() => {
        getWeatherAPI();
    }, [])

    return (
        <div className='weather-container'>
            <div className='menu-container'></div>
            <div className='main-container'>
                <div className='inner-main-container'>
                    <div className='search-container'>
                        <input className='input-search' type='text' value={city} name='city' placeholder='Enter location' onChange={(e) => { setCity(e.target.value) }} />
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
                            <img src={`https:${icon}`} />
                        </div>
                    </div>

                    <div className='current-update-container'>
                        <div className='air-condition-container'>
                            <p className='air-title'>Air Conditions</p>
                        </div>
                        <div className='air-condition-display'>
                            {airCondition.map((air) => {
                                return (
                                    <div className='inner-air-container' key={air.id}>
                                        <p className='air-p-tag'>{air.title}</p>
                                        <span className='air-span-tag'>{air.value}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className='todays-forecast-container'>
                        <div className='todays-forecast'>
                            <p className='todays-title'>Today's Forecast</p>
                        </div>
                        <div className='todays-forecast-display'>
                            {list.map((l) => {
                                return (
                                    <div className='inner-container-tf'>
                                        <span className='tf-span-tag'>{l.dt_txt.split(' ')[1]}</span>
                                        <img className='tf-img-tag' src={`https://openweathermap.org/img/wn/${l.weather[0].icon}.png`} />
                                        <p className='tf-value'>{l.main.temp}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>


                </div>
            </div>
            
            <div className='weekday-forecast-container'>
            <ConvertTemperature/>
            </div>
        </div>
    )
}

export default WeatherTemplate
