import axios from "axios";
export const forcast = async (req, res, next) => {
  const location = req.params.location;
  const timesteps = req.params.time;
  const options = {
    method: "GET",
    url: "https://tomorrow-io1.p.rapidapi.com/v4/weather/forecast",
    params: {
      // location: "32.223330,35.234320",
      // location: "42.15, 82,1",
      location: location,
      timesteps: timesteps,
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
};