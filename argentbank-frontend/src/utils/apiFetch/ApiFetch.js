import axios from "axios";
const baseUrl = "http://localhost:3001/api/v1/";


  // Get the connexion token

export const getLogin = (email, password) => {
  return axios
  .post(baseUrl+"user/login", {
    email,
    password,
  })
  .then((response) => response.data.body.token)
};


  // Get the profile of the corresponding token

export const getProfile = () => {
  return axios
  .post(
    baseUrl+"user/profile",
    {},
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    }
  )
  .then((response) => response.data.body)
};

//  Update the profile of the corresponding token
 
export const updateProfile = (firstName, lastName) => {
  return axios
  .put(
    baseUrl+"user/profile",
    {
      firstName,
      lastName,
    },
    {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    }
  )
  .then((response) => response.data.body)
};