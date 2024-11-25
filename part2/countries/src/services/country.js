import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/";
const apiKey = import.meta.env.VITE_OPEN_WEATHER;

const getAll = () => {
    const request = axios.get(`${baseUrl}/api/all/`);
    return request.then((response) => response.data);
};

const getWeather = (latitude, longitude) => {
    const request = axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    );
    return request.then((response) => response.data);
};

export default {
    getAll,
    getWeather
};
