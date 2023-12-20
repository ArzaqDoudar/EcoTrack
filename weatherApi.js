// // weatherApi.js
// const axios = require('axios');

// const getWeatherData = async () => {
//   const options = {
//     method: 'GET',
//     url: 'https://tomorrow-io1.p.rapidapi.com/v4/weather/forecast',
//     params: {
//       location: '42.15,82.1',
//       timesteps: '1h',
//       units: 'metric'
//     },
//     headers: {
//       'X-RapidAPI-Key': '395b7cace2msh03c0453c05785d9p19b29djsn80ef7b724a99',
//       'X-RapidAPI-Host': 'tomorrow-io1.p.rapidapi.com'
//     }
//   };

//   try {
//     const response = await axios.request(options);
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// };
// export default getWeatherData;
// //module.exports = getWeatherData;


const express = require("express");
const axios = require("axios");

const app = express();

app.get("/forcast", async (req, res, next) => {
  const options = {
    method: "GET",
    url: "https://tomorrow-io1.p.rapidapi.com/v4/weather/forecast",
    params: {
      location: "42.15, 82,1",
      timesteps: "1h",
      units: "metric",
    },
    headers: {
      "X-RapidAPI-Key": "bfc458b598msh353fdd2883a6cf9p166c0ajsn98ca5c935d73",
      "X-RapidAPI-Host": "tomorrow-io1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return res.status(200).json({
      data: response.data,
    });
  } catch (error) {
    console.error(error);
  }
});

// app.listen(9999, () => {
//   console.log("Connected");
// });