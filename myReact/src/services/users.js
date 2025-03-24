import axios from "axios";



export const getAllUsers = async () => {
  const response = await axios.get('http://localhost:8080/api/Users/getAllUsers')
  return response;

}


export async function loginUser(user) {
    try {
        const response = await axios.post('http://localhost:8080/api/Users/Log_in', user);
        console.log("login successful!");
        console.log(response);
        
        return response;//.data
    } catch (error) {
        if (error.response && error.response.status === 400) {
            console.log("The password is incorrect");
            throw new Error("The password is incorrect");
        } else if(error.response && error.response.status === 404){
            console.log("The username is incorrect");
            throw new Error("The username is incorrect");
        }
    }
  }
  



export async function signUpUser(user) {
    console.log('signUpUser function called with:', user);
  
    try {
        const response = await axios.post('http://localhost:8080/api/Users/signUp', user); 
        console.log(`Registration successful: ${response.data} (status: ${response.status})`); 
        // alert("Registration successful");
  
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 409) {
            console.log('Username already exists');
            throw new Error('Username already exists');
            
        } else {
            console.log('An error occurred:', error.message);
            throw error;
        }
    }
  }


export const updateUser = async (id, user) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/Users/updateUsers/${id}`, user);
        console.log(response.data);

        return response.data; 
        
    } catch (error) {
        console.error("Error during API call:", error.response?.data || error.message);
        throw error; 
    }
};

  
export default { getAllUsers ,loginUser,signUpUser,updateUser};