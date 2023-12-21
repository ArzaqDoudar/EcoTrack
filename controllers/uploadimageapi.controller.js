
import axios from 'axios';
import fs from "fs";
import FormData from "form-data";
const data = new FormData();
data.append('file', fs.createReadStream('/PATH/TO/diagram-phishing-attack.png'));

export async function uploadImage() {
  const options = {
    method: 'POST',
    url: 'https://upload-image-and-return-url-by-thichthicodeteam.p.rapidapi.com/api/upload-image',
    headers: {
      Accept: '*/*',
      'X-RapidAPI-Key': '395b7cace2msh03c0453c05785d9p19b29djsn80ef7b724a99',
      'X-RapidAPI-Host': 'upload-image-and-return-url-by-thichthicodeteam.p.rapidapi.com',
      ...data.getHeaders(),
    },
    data: data,
  };

  try {
    const response = await axios.request(options);
    return response.data; // Assuming the response contains the image link
  } catch (error) {
    console.error(error);
    throw new Error('Image upload failed');
  }
}

