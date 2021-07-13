import axios from "axios";

const Api = axios.create({
    baseURL: 'http://localhost:4000/api/',
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
 
  });


  export default Api