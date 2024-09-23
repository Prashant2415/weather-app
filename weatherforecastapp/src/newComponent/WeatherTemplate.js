import React, { useEffect, useState } from 'react'
import "../newComponent/styles.css";
import axios from "axios";
const WeatherTemplate = () => {
    const [data, setData] = useState({});
    const [city, setCity] = useState("");
    const [icon, setIcon] = useState("");
    console.log("City ", city);
    const getWeatherAPI = async (value = "Jabalpur") => {
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=c3539e73591240b0ae063419242209&q=${value}`).then((response) => {
            setData(response.data);
            const update = response.data.current.condition.icon;
            setIcon(update);
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
            time: "6:00am",
            icon: "",
            value: 2
        },
        {
            id: 2,
            time: "9:00am",
            icon: "",
            value: 2
        },
        {
            id: 3,
            time: "12:00am",
            icon: "",
            value: 2
        },
        {
            id: 4,
            time: "15:00am",
            icon: "",
            value: 2
        },
        {
            id: 5,
            time: "18:00am",
            icon: "",
            value: 2
        },
        {
            id: 6,
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
                            {todaysForecast.map((tf) => {
                                return (
                                    <div className='inner-container-tf'>
                                        <span className='tf-span-tag'>{tf.time}</span>
                                        <img className='tf-img-tag' src={`https:${icon}`} />
                                        <p className='tf-value'>{tf.value}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>


                </div>
            </div>
            <div className='weekday-forecast-container'>
                <div className='weekday-container-align'>
                <div className='inner-weekday-forecast-container'>
                    <p className='weekday-container-title'>7 days Forecast</p>
                </div>
                <div className='weekdays-container'>
                {weekDays.map((wd) => {
                                return (
                                    <div className='inner-container-wd'>
                                        <span className='wd-span-tag'>{wd.title}</span>
                                        <img className='wd-img-tag' src={`https:${icon}`} />
                                        <p className='wd-value'>{wd.value}</p>
                                    </div>
                                )
                            })}
                </div>
                </div>

            </div>
        </div>
    )
}

export default WeatherTemplate
