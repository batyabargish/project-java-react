


import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import axios from 'axios';

const Information = () => {
    const [inforSabbat, setInforSabbat] = useState('');
    const [currentTime, setCurrentTime] = useState('');

    const havdalahItem = inforSabbat.items?.find(item => item.category === "havdalah");

    useEffect(() => {
        axios.get("https://www.hebcal.com/shabbat/?cfg=json&geonameid=3448439").then((response) => {
            setInforSabbat(response.data);
        });

        const updateTime = () => {
            const currentDate = new Date();
            currentDate.setHours(currentDate.getHours() - 1);
            const currentHour = currentDate.getHours();
            const currentMinutes = currentDate.getMinutes();
            setCurrentTime(`${currentHour}:${currentMinutes.toString().padStart(2, "0")}`);
        };

        updateTime();
        const interval = setInterval(updateTime, 60000);

        return () => clearInterval(interval);
    }, []);

    function convertTo24HourFormat(time) {
        if (!time) return "מידע לא זמין";
        const timeParts = time.split(/(am|pm)/i);
        if (timeParts.length < 2) return "מידע לא תקין";
        const [timePart, modifier] = timeParts;
        let [hours, minutes] = timePart.split(":").map(Number);
        if (modifier.toLowerCase() === "pm" && hours !== 12) hours += 12;
        if (modifier.toLowerCase() === "am" && hours === 12) hours = 0;
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    }

    function formatDateRange(startDate) {
        const startParts = startDate.split("-");
        const startDateObj = new Date(startParts[0], startParts[1] - 1, startParts[2]);
        const nextDateObj = new Date(startDateObj.getTime() + 24 * 60 * 60 * 1000);
        const startFormatted = `${startParts[2]}-${startParts[1]}-${startParts[0]}`;
        const nextFormatted = `${nextDateObj.getDate().toString().padStart(2, "0")}-${(nextDateObj.getMonth() + 1).toString().padStart(2, "0")}-${nextDateObj.getFullYear()}`;
        return `${startFormatted} - ${nextFormatted}`;
    }

    return (
        <Box sx={{ padding: 3, textAlign: 'center' ,marginTop:'80px'}}>
            <Typography 
                variant="h3" 
                color='rgba(233, 178, 68, 0.8)'  
                sx={{ 
                    mb: 4, 
                    mt: 4, 
                    fontFamily: 'Quicksand, sans-serif', 
                    fontWeight: 'bold',
                }}
            >
                מידע למטייל במונטנגרו
            </Typography>

            <Grid container spacing={3} sx={{ mb: 3 }} justifyContent="center">
                {/* כרטיס שבת */}
                <Grid item xs={12} sm={4}>
                    <Card sx={{
                        backgroundColor:'rgba(242, 227, 200, 0.8)',  
                        borderRadius: 2, 
                        boxShadow: 3, 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        justifyContent: 'center', // ממרכז את התוכן
                        alignItems: 'center', // ממרכז את התוכן
                    }}>
                        <CardContent>
                            <Typography variant="h5" color="#e69500">זמני השבת</Typography>
                            {inforSabbat && inforSabbat.items && inforSabbat.items[5].hebrew && (
                                <Typography variant="body1" sx={{ color: '#e69500' }}>{inforSabbat.items[5].hebrew}</Typography>
                            )}
                            {inforSabbat && inforSabbat.range && inforSabbat.range.start && (
                                <Typography variant="body2" color="textSecondary">{formatDateRange(inforSabbat.range.start)}</Typography>
                            )}
                            <Typography variant="body2">כניסת שבת</Typography>
                            {inforSabbat && inforSabbat.items && inforSabbat.items[3].title && (
                                <Typography variant="body1">{convertTo24HourFormat(inforSabbat.items[3].title.replace("Candle lighting: ", ""))}</Typography>
                            )}
                            <Typography variant="body2">יציאת שבת</Typography>
                            {havdalahItem && havdalahItem.title && (
                                <Typography variant="body1">{convertTo24HourFormat(havdalahItem.title.replace("Havdalah: ", ""))}</Typography>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                {/* כרטיס מטבע */}
                <Grid item xs={12} sm={4}>
                    <Card sx={{
                        backgroundColor: 'rgba(253, 232, 232, 0.8)', 
                        borderRadius: 2, 
                        boxShadow: 3, 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        justifyContent: 'center', // ממרכז את התוכן
                        alignItems: 'center', // ממרכז את התוכן
                    }}>
                        <CardContent>
                            <Typography variant="h5" color="#d9534f">מטבע</Typography>
                            <Typography variant="body1">Euro Member</Typography>
                            <Typography variant="body1">€ Countries</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* כרטיס שעה */}
                <Grid item xs={12} sm={4}>
                    <Card sx={{
                        backgroundColor: 'rgba(232, 232, 240, 0.8)', 
                        borderRadius: 2, 
                        boxShadow: 3, 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        justifyContent: 'center', // ממרכז את התוכן
                        alignItems: 'center', // ממרכז את התוכן
                    }}>
                        <CardContent>
                            <Typography variant="h5" color="#495057">שעה במונטנגרו</Typography>
                            <Typography variant="h6">{currentTime}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>קצת על מונטנגרו</Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
                מונטנגרו היא אחד היעדים העולים של השנים האחרונות, הודות לנופיה הפראיים, עיירות החוף הקסומות שבה והאגמים המשגעים המשובצים לאורכה. מונטנגרו שוכנת לחופו של הים האדריאטי וגובלת בקרואטיה, אלבניה, בוסניה-הרצגובינה וסרביה, אותם תוכלו לשלב בקלות כחלק מהטיול שלכם.
                {/* טקסט נוסף */}
            </Typography>

            <Typography variant="h5">מונטנגרו למטייל מתחלקת למספר אזורים מרכזיים:</Typography>
            <Typography variant="body1">הצפון – אזור מלא בהרים ונהרות ומתאים למטייל שמחפש את השקט והטבע. כאן תמצאו את האטרקציות המיוחדות ביותר למי שמחפש חוויות טבע בלתי נשכחות.</Typography>
            <Typography variant="body1">הדרום – מרכזי תיירות חוף עם עיירות חוף קסומות. החופים במונטנגרו מושלמים למי שמחפש נופש סולידי עם שמש מרהיבה ומי טורקיז.</Typography>
            <Typography variant="body1">המרכז – ערים כמו פודגוריצה עם חיי לילה מעניינים ותרבות עשירה. פה תוכלו לחוות את השילוב המושלם בין מודרניות להיסטוריה עתיקה.</Typography>

            <Typography variant="h5">מספרי טלפון חשובים</Typography>
            <Typography variant="body1">משטרה: 122</Typography>
            <Typography variant="body1">אמבולנס: 124</Typography>
            <Typography variant="body1">קו סיוע לנהגים: 9807</Typography>
            <Typography variant="body1">קידומת המדינה: 382</Typography>

            <Button 
                variant="contained" 
                sx={{ backgroundColor: 'rgba(238, 203, 133, 0.8)', '&:hover': { backgroundColor: 'rgba(233, 178, 68, 0.8)'}, mt: 2 }}
                onClick={() => window.open('https://www.discovercars.com/?a_aid=montenegro-sheli', '_blank')}
            >
                להשכרת רכב במונטנגרו
            </Button>
        </Box>
    );
};

export default Information;
