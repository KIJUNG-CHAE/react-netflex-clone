import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "1ff4ca3ef84cc113678d951c7905d543",
    language: "ko-KR",
  },
});

export default instance;
