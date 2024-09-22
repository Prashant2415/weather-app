import './App.css';
import WeatherHome from './component/WeatherHome';
import { weatherStatus } from './component/utility';
function App() {
  localStorage.setItem("weatherStatusMessage", JSON.stringify(weatherStatus));
  return (
    <div className='app-container'>
      <WeatherHome/>
    </div>
  );
}

export default App;
