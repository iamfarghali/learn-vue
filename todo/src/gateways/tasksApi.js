import axios from "axios";
export default axios.create({
  baseURL: "http://todo.test/api/tasks",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});
