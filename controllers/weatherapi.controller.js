
import axios from "axios";
export const forcast = async (req, res, next) => {

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
        console.log("halatryyyyyy");
        const response = await axios.request(options);

        return res.status(200).json({
          data: response.data,
        });
      } catch (error) {
        console.log("hala");
        console.error(error);
      }


    // try {
    //     res.send({data: "HELLO"});
    // } catch (err) {
    //     console.error(`Error while getting users `, err.message);
    //     next(err);
    // }
};