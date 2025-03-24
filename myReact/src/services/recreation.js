



import axios from 'axios';



export const getAllRecreation = async () => {
    const response = await axios.get(`http://localhost:8080/api/Recreation/getAllRecreation`)
    return response;
  
  }
  export const getOneR = async (id) => {
    
    const response = await axios.get(`http://localhost:8080/api/Recreation/getRecreationById/${id}`,id)    
    return response;
  
  }

  export const deleteRecreation = async (id) => {
    
    const response = await axios.delete(`http://localhost:8080/api/Recreation/deleteRecreation/${id}`,id)    
    return response;
  
  }


