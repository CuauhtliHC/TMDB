import axios from "axios";

axios.defaults.baseURL = process.env.VERCEL_URL;

export default axios;
