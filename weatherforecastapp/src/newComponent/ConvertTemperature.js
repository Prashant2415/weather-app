import React, { useState } from 'react';
import "../newComponent/styles.css";
const ConvertTemperature = () => {
    const [temperature, setTemperature] = useState("");
    const [unit, setUnit] = useState("celcius");
    const [convertedValues, setConvertedValues] = useState({ celsius: '', fahrenheit: '', kelvin: '' });

    const handleTemperatureChange = (e) => {
        const value = parseFloat(e.target.value);
        setTemperature(e.target.value);
        if (!isNaN(value)) {
            convertTemperature(value, unit);
        } else {
            setConvertedValues({ celsius: '', fahrenheit: '', kelvin: '' });
        }
    }
    const convertTemperature = (value, unit) => {
        let celsius, fahrenheit, kelvin;

        switch (unit) {
            case 'celsius':
                celsius = value;
                fahrenheit = (value * 9 / 5 + 32).toFixed(2);
                kelvin = (value + 273.15).toFixed(2);
                break;
            case 'fahrenheit':
                celsius = ((value - 32) * 5 / 9).toFixed(2);
                fahrenheit = value;
                kelvin = (((value - 32) * 5 / 9) + 273.15).toFixed(2);
                break;
            case 'kelvin':
                celsius = (value - 273.15).toFixed(2);
                fahrenheit = ((value - 273.15) * 9 / 5 + 32).toFixed(2);
                kelvin = value;
                break;
            default:
                return;
        }

        setConvertedValues({ celsius, fahrenheit, kelvin });
    };
    const handleUnitChange = (e) => {
        const selectedUnit = e.target.value;
        setUnit(selectedUnit);

        if (temperature) {
            convertTemperature(parseFloat(temperature), selectedUnit);
        }
    };
    return (
        <div className='temperature-main-div'>
            <div className='temperature-inner-div'>
                <div className='temperature-title'>
                    <h1>Convert</h1>
                </div>
                <div className='temperature-input-container'>
                    <input className='temperature-input' type='number' value={temperature} onChange={handleTemperatureChange} />
                </div>
                <div className='temperature-select-option'>
                    <select className='temperature-select' value={unit} onChange={handleUnitChange}>
                        <option className='temperature-option' value="celsius">Celsius (°C)</option>
                        <option className='temperature-option' value="fahrenheit">Fahrenheit (°F)</option>
                        <option className='temperature-option' value="kelvin">Kelvin (K)</option>
                    </select>
                </div>
                <div className="results">
                    <h3>Converted Values:</h3>
                    <div className='result-flex'>
                    <p>Celsius: {convertedValues.celsius}</p>
                    <p>Fahrenheit: {convertedValues.fahrenheit}</p>
                    <p>Kelvin: {convertedValues.kelvin}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConvertTemperature;
