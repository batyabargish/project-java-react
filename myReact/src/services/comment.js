
import axios from 'axios';



export const getAllComments = async () => {
    const response = await axios.get(`http://localhost:8080/api/comments/getAllComments`)
    return response;
  
  }


  export const addComment = async (newC) => {
    console.log("bbb");
    
    const response = await axios.post(`http://localhost:8080/api/comments/createComments`,newC)
    console.log("cccc");
    
    return response.data;
  
  }




  export default { getAllComments ,addComment};