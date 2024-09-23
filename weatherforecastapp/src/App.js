import './App.css';
import { weatherStatus } from './component/utility';
import WeatherTemplate from './newComponent/WeatherTemplate';
function App() {
  localStorage.setItem("weatherStatusMessage", JSON.stringify(weatherStatus));
  return (
    <div>
      <WeatherTemplate/>
    </div>
  );
}

export default App;
