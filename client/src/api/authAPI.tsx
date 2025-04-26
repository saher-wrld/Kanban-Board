import { UserLogin } from "../interfaces/UserLogin";

// Function to send a POST request to the '/auth/login' endpoint with user login information
// This function will be used to authenticate the user and get a JWT token
const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
 try{
  // send a POST reeuest to the 'auth/login' with user login info in JSON format
  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo), // convert the user info to JSON format
  });

  // throw error if the response is not OK 
  if (!response.ok) {
    const errorData = await response.json(); // Parse error response as JSON
    throw new Error(`Error: ${errorData.message}`); // Throw a detailed error message   
    }

  // Parse the response as JSON
  const data = await response.json();

  return data; // return the data recieved from the server
  } catch (err){
    console.log('Error from user login: ', err); // will log any errors that occur during the fetch
    return Promise.reject('Could not fetch user info'); // this returns a rejected promise with an error message
  }
}




export { login };
