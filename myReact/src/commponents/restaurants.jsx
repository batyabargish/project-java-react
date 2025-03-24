import { useEffect } from "react";
import { Link,useParams } from 'react-router-dom'; 
import { useSelector, useDispatch } from "react-redux";
import { getAllR ,getOR} from "../features/recreationSlice.js";
import { addC } from '../features/commentSlice.js'
import { Box, Typography, Card, CardContent, Button, TextField } from "@mui/material";

import { deleteR } from '../features/recreationSlice.js'



import "./hotels.css"; // ייבוא קובץ ה-CSS

export const Restaurants = () => {
  const dispatch = useDispatch();
  const rec = useSelector((state) => state.recreation.recreationlist);
  const cUser  = useSelector((state) => state.users.currentUser); 

 // console.log(rec);

  // const [t, sett] = useState('');
  // sett(now());


  useEffect(() => {
    dispatch(getAllR());
  }, [dispatch]);


  const handleM = async (e, id) => {
    e.preventDefault();
    if (id) {
        await dispatch(deleteR(id)); // שלח את ה-ID שנמצא ב-rec
    } else {
        console.error("ID is undefined");
    }
}


  return (
    <>
     <Box 
      sx={{
        paddingTop: '80px', 
        paddingX: 3, 
        backgroundImage: 'url(/images/12.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh', 
        width: '80vw',
        paddingBottom: '40px', 
        filter: 'blur(px)'
      }}
    ></Box>


     <Typography variant="h3" gutterBottom sx={{ color: 'rgba(233, 178, 68, 0.8)',fontWeight: 'bold',  // הדגשה
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',  // צל לטקסט
      position:'center' ,marginTop: "80px"}}>
       מסעדות כשרות במונטנגרו
      </Typography> 

      <div className="card-container"> {/* שימוש בקלאס שהוגדר ב-CSS */}
        {rec &&
          rec.map((r) => (
            r.sug === "restaurant" &&(
            <div className="recreation-card" key={r.id}>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {r.name}
                </Typography>
                {/* <Typography variant="body2" className="card-description">
                  סוג: {r.sug}
                </Typography> */}
                {/* <Typography variant="body2" className="card-description">
                  תיאור: {r.description}
                </Typography> */}
                <Typography variant="body2" className="card-description">
                  סטטוס: {r.status ? "זמין" : "לא זמין"}
                </Typography>
                {/* <Typography variant="body2" className="card-description">
                  מחיר: ₪{r.price}
                </Typography> */}
                <Typography variant="body2" className="card-description">
                  מיקום: {r.location}                
                </Typography>
                {r.link && (
                  <Typography variant="body2">
                    <a href={r.link} target="_blank" rel="noopener noreferrer">                   
                      קישור לאתר
                    </a>
                  </Typography> )}
                  {/* <Typography variant="body2"> */}
                  {/* קישור לעמוד פרטי המלון */}
                  {/* <Link to={`/hotels/${r.id}`}> */}
                    {/* פרטים נוספים */}
                  {/* </Link> */}
                {/* </Typography> */}
                <Link to={`/hotels/${r.id}`}>
                    <button>פרטים נוספים על המסעדה</button>
                 </Link>
                 {cUser && cUser.isAdmin? (
                  <button onClick={(e) => handleM(e, r.id)}>הסרה</button> ) : null}
              </CardContent>
            </div>
          )))}
      </div>
   
    </>
  );
};


// export const RestaurantsDetails  = () => {

//   const dispatch = useDispatch();
//   const recreation = useSelector((state) => state.recreation.currentRecreation);
//   const cUser  = useSelector((state) => state.users.currentUser); 
//   const { id } = useParams();
//   const [showCommentForm, setShowCommentForm] = useState(false);

//   useEffect(() => {
//     dispatch(getOR(id));
//   }, [dispatch, id]);


// console.log("recreation.id==",recreation.id);

//   const [newComment, setNewComment] = useState({
//     id: 0, // תמיד יישאר 0
//     comment: "", // יתחיל כריק, יכיל את התגובה של המשתמש
//     createdAt:new Date(),
//     userId: cUser.id , // אם אין משתמש מוגדר, אפשר להגדיר ברירת מחדל
//   recreationId: recreation.id ,
   
    
//   });

  

 

//   const handleAddCommentClick = () => {
//     if(cUser && Object.keys(cUser).length>0){
//       setShowCommentForm(true);}
//       else{
//         alert("You are not a registered user")}
    
//   }


//   const handleSubmitComment = async (e) => {
//     e.preventDefault();
  
//     // בדוק אם recreation קיים
//     if (!recreation || !recreation.id) {
//       console.error("recreation לא זמין");
//       return; // עצור אם recreation.id לא קיים
//     }
  
//     try {
//       const commentData = {
//         ...newComment,
//         recreationId: recreation.id, // ודא ש-recreationId נשלח נכון
//       };

//       await dispatch(addC(commentData)); // שלח את התגובה
  

//       setNewComment(""); // איפוס התגובה
//       setShowCommentForm(false); // סגירת הטופס
//     } catch (error) {
//       console.error("לא הצלחנו לשלוח את התגובה:", error);
//     }
//   };
  


//   const handleNavigation = () => {
//     const navigationUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(recreation.location)}&travelmode=driving`;
//     window.open(navigationUrl, "_blank");
//   };


//   return (
//     <>
//     <HomePage/>
//       <p>{recreation?.name}</p>
//       <p>{recreation?.sug}</p>
//       <p>{recreation?.description}</p>
//       <p>{recreation?.location}</p>
//       <button onClick={handleNavigation} style={{ marginTop: "20px" }}>ניווט למקום</button>

//       {recreation.commentsList && recreation.commentsList.length > 0 ? (
//         <div>
//           <h3>Comments:</h3>
//           {recreation.commentsList.map((comment) => (
//            recreation.sug === "restaurant" &&(

//             <div key={comment.id}>
//               <p>Comment: {comment.comment}</p>
//               <p>recreation.sug----------{recreation.sug}</p>
//               <p>By: {comment.user.name}</p>
//               <p>At: {new Date(comment.createdAt).toLocaleString()}</p>
//             </div>
//           )))}
//         </div>
//       ) : (
//         <p>No comments available</p>
//       )}

//       {/* כפתור הצגת הטופס */}
//       <button onClick={handleAddCommentClick}>Add a comment</button>

//       {/* טופס הוספת תגובה */}
//       {showCommentForm && (
//         <form onSubmit={handleSubmitComment}>
//           <textarea
//             value={newComment.comment}
//             onChange={(e) => setNewComment((prev) => ({...prev,comment: e.target.value, }))}          
//               placeholder="Write your comment here..."
//           />
//           <button type="submit">Submit</button>
//         </form>
//       )}

//       {recreation.link && (
//         <Link to={recreation.link}>
//           <button> להזמנה מבוקינג</button>
//         </Link>
//       )}
//     </>
//   );
// };

// /////////////////////////////////////////////////////////////////


export const RestaurantsDetails = () => {
  const dispatch = useDispatch();
  const recreation = useSelector((state) => state.recreation.currentRecreation);
  const cUser = useSelector((state) => state.users.currentUser);
  const { id } = useParams();
  const [showCommentForm, setShowCommentForm] = useState(false);

  useEffect(() => {
    dispatch(getOR(id));
  }, [dispatch, id]);

  console.log("recreation.id==", recreation?.id);

  const [newComment, setNewComment] = useState({
    id: 0,
    comment: "",
    createdAt: new Date(),
    userId: cUser?.id || null,
    recreationId: recreation?.id || null,
  });

  const handleAddCommentClick = () => {
    if (cUser && Object.keys(cUser).length > 0) {
      setShowCommentForm(true);
    } else {
      alert("You are not a registered user");
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!recreation || !recreation.id) {
      console.error("Recreation not available");
      return;
    }

    try {
      const commentData = {
        ...newComment,
        recreationId: recreation.id,
      };

      await dispatch(addC(commentData)); // שליחת תגובה
      setNewComment({ ...newComment, comment: "" }); // איפוס התגובה
      setShowCommentForm(false); // סגירת הטופס
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  const handleNavigation = () => {
    const navigationUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      recreation?.location || ""
    )}&travelmode=driving`;
    window.open(navigationUrl, "_blank");
  };

  return (
    <>
    
      <h1>מסעדה: {recreation?.name}</h1>
      <p>סוג: {recreation?.sug}</p>
      <p>תיאור: {recreation?.description}</p>
      <p>מיקום: {recreation?.location}</p>

      <button onClick={handleNavigation} style={{ marginTop: "20px" }}>
        ניווט למסעדה
      </button>

      {/* הצגת תגובות */}
      {recreation.commentsList && recreation.commentsList.length > 0 ? (
        <div>
          <h3>תגובות:</h3>
          {recreation.commentsList.map(
            (comment) =>
              recreation.sug === "restaurant"  && (////////////////////////===1???????
                <div key={comment.id}>
                  <p>תגובה: {comment.comment}</p>
                  <p>מאת: {comment.user?.name || "משתמש אנונימי"}</p>
                  <p>בתאריך: {new Date(comment.createdAt).toLocaleString()}</p>
                </div>
              )
          )}
        </div>
      ) : (
        <p>אין תגובות</p>
      )}

      {/* כפתור להוספת תגובה */}
      <button onClick={handleAddCommentClick}>הוסף תגובה</button>

      {/* טופס הוספת תגובה */}
      {showCommentForm && (
        <form onSubmit={handleSubmitComment}>
          <textarea
            value={newComment.comment}
            onChange={(e) =>
              setNewComment((prev) => ({ ...prev, comment: e.target.value }))
            }
            placeholder="כתוב תגובה כאן..."
          />
          <button type="submit">שלח תגובה</button>
        </form>
      )}

     
        <Link to={recreation.link}>
          <button>הזמן מקום</button>
        </Link>
      
    </>
  );
};
































































































































