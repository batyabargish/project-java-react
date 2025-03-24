

import React, { useState } from "react";
import { Typography, Box, Card, CardContent, Grid, Button, TextField, Paper, Divider } from "@mui/material";
import EmailSender from "./email"; // קומפוננטת המייל
import MapComponent from './googleMaps';
import HelpWidget from './help';

export const Chabad = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reply_to: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


    const handleNavigation = () => {
    const destination = "Dukley Hotel & Resort, Budva, Montenegro"; // כתובת היעד
    const navigationUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&travelmode=driving`;
    window.open(navigationUrl, "_blank");
  };


  return (
    <>
    <Box sx={{ padding: "20px", maxWidth: "1200px", margin: "0 auto", fontFamily: 'Arial, sans-serif', textAlign: "center" ,marginTop:"80px"}}>
      <Typography variant="h3" sx={{ color: 'rgba(233, 178, 68, 0.8)', marginBottom: "10px",fontWeight: 'bold' }}>
        בית חב"ד בודבה מונטנגרו
      </Typography>

      <Typography variant="h5" sx={{ color: "#555", marginBottom: "20px" }}>
        אודות בית חבד
      </Typography>
      <Typography paragraph sx={{ marginBottom: "20px" }}>
      נוסד ע"י הרב איידלקאפ בשנת 2022, בשנת 2023 הצטרפו לפעילות הרב לייזר והרבנית מושקי ארנפלד.

בית חב"ד מספק את השירותים הבאים:
מרכז למטייל, סעודות ליל שבת, סעודות יום שבת, תפילות יום חול, תפילות שבת

מהו בית חב"ד?
בית חב"ד, הוא מרכז קהילתי יהודי של תנועת חסידות חב"ד-ליובאוויטש.
מרכזים אלו מספקים מגוון שירותים ופעילויות ליחידים ולמשפחות יהודים, לרבות חינוך דתי, אירועים חברתיים ותכניות קהילתיות. הם גם משמשים לעתים קרובות כמקום למטיילים יהודים למצוא קהילה מסבירת פנים ומכילה, כמו גם סיוע באוכל כשר ובצרכים דתיים אחרים.

את בתי חב"ד הקימו שלוחים אותם שלח הרבי מליובאוויטש, ניתן למצוא בתי חב"ד כמעט בכל איזור ברחבי העולם.
      </Typography>

      <Box sx={{ marginBottom: "30px" }}>
        <Typography variant="h5" sx={{ color: "#555", marginBottom: "10px" }}>
          שלוחי חב"ד
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Card sx={{ width: "250px", backgroundColor: "#fff4e6", textAlign: "center", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
              <CardContent>
                <Typography variant="h6">הרב לייזר ארנפלד</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={{ width: "250px", backgroundColor: "#fde8e8", textAlign: "center", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
              <CardContent>
                <Typography variant="h6">הרבנית מושקי ארנפלד</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Typography variant="h5" sx={{ marginTop: "40px", marginBottom: "20px" }}>
        איך מגיעים לבית חב"ד
      </Typography>
      <Typography variant="subtitle1" sx={{ color: "#555" }}>
        הכתובת שלנו
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: "20px" }}>
        Dukley Hotel & Resort, Jadranski Put, Zavala Peninsula, Budva 85310
      </Typography>
      <Button variant="contained" color="primary" onClick={handleNavigation} sx={{ marginTop: "20px" }}>
        ניווט לבית חב"ד
      </Button>
      <MapComponent />

      <Divider sx={{ marginTop: "50px", marginBottom: "20px" }} />
      <Box sx={{ textAlign: "left", marginBottom: "30px" }}>
        <Typography variant="h5" sx={{ marginBottom: "10px" }}>
          אנחנו זמינים כאן
        </Typography>
        <Paper sx={{ padding: "20px", backgroundColor: "#f8f9fa" }}>
          <Typography>📞 +38268815599</Typography>
          <Typography>💬 WhatsApp: +38268815599</Typography>
          <Typography>✉️ chabadbudva@gmail.com</Typography>
        </Paper>
      </Box>

      <Box sx={{ textAlign: "center", marginBottom: "50px" }}>
        <Typography variant="h5" sx={{ marginBottom: "20px" }}>
          אנחנו זמינים גם במייל
        </Typography>
        <Paper sx={{ padding: "20px", margin: "0 auto", maxWidth: "400px" }}>
          <form>
            <TextField
              fullWidth
              margin="normal"
              label="שם מלא"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="דואר אלקטרוני"
              name="reply_to"
              value={formData.reply_to}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="נשמח לפרט"
              name="message"
              value={formData.message}
              onChange={handleChange}
              multiline
              rows={4}
            />
            <EmailSender formData={formData} />
          </form>
        </Paper>
      </Box>

      <HelpWidget />
    </Box>
    </>
  );
};
