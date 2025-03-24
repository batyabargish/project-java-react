


import { useEffect, useState } from "react";
import { Form, Link, useParams } from 'react-router-dom'; 
import { useSelector, useDispatch } from "react-redux";
import { getAllR, getOR } from "../features/recreationSlice.js";
import { addC } from '../features/commentSlice.js';
import { deleteR } from '../features/recreationSlice.js';
import TextareaAutosize from 'react-textarea-autosize';
import { Box, CardActions, Card,Button , CardContent, Typography, IconButton ,Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";



export const Attractions = () => {
  const dispatch = useDispatch();
  const rec = useSelector((state) => state.recreation.recreationlist || []);
  const cUser = useSelector((state) => state.users.currentUser);
  const [userLocation, setUserLocation] = useState(null);
  const [distances, setDistances] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllR());
  }, [dispatch]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => console.error("Error getting location", error)
      );
    }
  }, []);

  useEffect(() => {
    if (userLocation && rec.length > 0) {
      calculateDistances();
    }
  }, [userLocation, rec]);

  const calculateDistances = async () => {
    if (!userLocation || !window.google || !window.google.maps) return;
    const directionsService = new google.maps.DirectionsService();
    const newDistances = {};
    for (const r of rec) {
      if (r.location) {
        try {
          const result = await new Promise((resolve, reject) => {
            directionsService.route(
              {
                origin: userLocation,
                destination: r.location,
                travelMode: google.maps.TravelMode.DRIVING,
              },
              (res, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                  resolve(res);
                } else {
                  reject(`Unable to find route for ${r.location}: ${status}`);
                }
              }
            );
          });

          const duration = result.routes[0].legs[0].duration.text;
          newDistances[r.id] = duration;
        } catch (error) {
          console.error(error);
        }
      }
    }
    setDistances(newDistances);
  };

  const handleDelete = (id) => {
    if (id) {
      dispatch(deleteR(id));
    } else {
      console.error("ID is undefined");
    }
  };

  return (
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
    >

  
      <Typography variant="h3" gutterBottom sx={{ color: 'rgba(233, 178, 68, 0.8)',fontWeight: 'bold',  // הדגשה
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',  // צל לטקסט
      position:'center' }}>
        אטרקציות במונטונגרו
      </Typography>
  
      {/* כרטיסי המלונות */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        {Array.isArray(rec) &&
          rec.map((r) => (
            r.sug === "attraction" && (
              <Card key={r.id} sx={{ maxWidth: 345, margin: '20px', borderRadius: 2, boxShadow: 3 ,direction: 'rtl', backgroundColor: 'rgba(255, 255, 255, 0.9)' ,height:"250px" ,width:"300px"}}>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    {r.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    <strong>מיקום:</strong> {r.location}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>מרחק:</strong> {distances[r.id] || "מחשב..."}
                  </Typography>
                </CardContent>
                <CardActions>
                
                  <Link to={`/attractions/${r.id}`} style={{ textDecoration: 'none' }}>
  <Button
    size="small"
    variant="contained"
    sx={{
      backgroundColor:'rgba(238, 203, 133, 0.8)', 
      color: 'white', 
      
      '&:hover': {
        backgroundColor: 'rgba(233, 178, 68, 0.8)', 
      },
    }}
  >
    פרטים נוספים על האטרקציה
  </Button>
</Link>
                  {cUser && cUser.admin && (
                    <Button size="small" color="secondary" onClick={() => handleDelete(r.id)}>
                      הסרה
                    </Button>
                  )}
                </CardActions>
              </Card>
            )
          ))}
      </Box>
    </Box>
  );
};





/////////////////////////////////////////////////////////////////






export const AttractionsDetails = () => {
  const dispatch = useDispatch();
  const recreation = useSelector((state) => state.recreation.currentRecreation);
  const cUser = useSelector((state) => state.users.currentUser);
  const { id } = useParams();
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [openDialog, setOpenDialog] = useState(false); 

  const [newComment, setNewComment] = useState({
    id: 0,
    comment: "",
    createdAt: new Date(),
    userId: cUser?.id || null,
    recreationId: recreation.id,
    rating: recreation.rating,
  });

  useEffect(() => {
    dispatch(getOR(id));
  }, [dispatch, id]);

  const handleAddCommentClick = () => {
    if (cUser && Object.keys(cUser).length > 0) {
      setShowCommentForm(true);
    } else {
      setOpenDialog(true); // Show dialog if user not logged in
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

      await dispatch(addC(commentData));
      dispatch(getOR(id));
      setNewComment({ ...newComment, comment: "" });
      setShowCommentForm(false);
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  const handleNavigation = () => {
    const navigationUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      recreation.location
    )}&travelmode=driving`;
    window.open(navigationUrl, "_blank");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        paddingTop: "80px",
        width:"80vw",
      }}
    >
   
<Box
  sx={{
    position: "absolute",
    top: 0,
    left: "50%", // ממרכז את התמונה
    transform: "translateX(-50%)", // דוחף את התמונה בחזרה אל המרכז
    width: "90%", // התמונה תתרחב פי 2 מהרוחב המקורי
    height: "100%",
    backgroundImage: 'url(/images/12.jpg)',
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(2px)",
    zIndex: 0,
  }}
/>


<Box
  sx={{
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 4,
    borderRadius: "20px",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
    width: "800px", 
    maxWidth: "100%", 
    backdropFilter: "blur(5px)",
    textAlign: "center",
    overflow: "hidden", 
    wordWrap: "break-word", 
    maxWidth: "80vw",   
  }}
>

        <Typography variant="h4" sx={{ color: 'rgba(202, 149, 44, 0.8)' , fontWeight: "bold" }}>
          {recreation?.name}
        </Typography>

        <Typography variant="body1" sx={{ mt: 2 }}>
          {recreation?.description}
        </Typography>

        <Box sx={{ mt: 3 }}>
          <IconButton
            onClick={handleNavigation}
            color="primary"
            sx={{
              borderRadius: "40%",
              backgroundColor: "#f0f0f0",
              padding: "10px",
              "&:hover": {
                backgroundColor: "#c0c0c0",
              },
            }}
          >
            <LocationOnIcon sx={{ fontSize: 30 }} />
          </IconButton>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {recreation?.location}
          </Typography>
        </Box>

        {recreation.commentsList && recreation.commentsList.length > 0 ? (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              תגובות:
            </Typography>
            {recreation.commentsList.map((comment) => (
              <Box
                key={comment.id}
                sx={{
                  mt: 2,
                  p: 2,
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: 2,
                  boxShadow: 2,
                }}
              >
                <Typography variant="body2">{comment.comment}</Typography>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ mt: 1 }}
                >
                  {comment.user?.name || "משתמש אנונימי"} | {" "}
                  {new Date(comment.createdAt).toLocaleString()}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ mt: 3 }}
          >
            אין תגובות
          </Typography>
        )}
{!showCommentForm && (
  <Box sx={{ mt: 3 ,color:'rgba(202, 149, 44, 0.8)' }}>
    <Button
      variant="outlined"
      color='rgba(202, 149, 44, 0.8)' 
      onClick={handleAddCommentClick}
    >
      הוסף תגובה
    </Button>
  </Box>
)}
 

 {showCommentForm && (
          <form onSubmit={handleSubmitComment} style={{ marginTop: "20px" }}>
            <TextareaAutosize
              minRows={3}
              value={newComment.comment}
              onChange={(e) =>
                setNewComment((prev) => ({
                  ...prev,
                  comment: e.target.value,
                }))
              }
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                marginTop: "10px",
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="inherit"
              sx={{ mt: 2 }}
            >
              שלח תגובה
            </Button>
          </form>
        )}

        {/* Dialog */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
        >
          <DialogTitle>שגיאה</DialogTitle>
          <DialogContent>
            <DialogContentText>
              עליך להתחבר למערכת כדי להוסיף תגובה.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
          <Button color="primary" component={Link} to="/login">
            התחבר
          </Button>
          <Button color="secondary" component={Link} to="/signUp">
            הרשם
          </Button>
        </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};
