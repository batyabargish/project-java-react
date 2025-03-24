// const express = require("express");
// const fetch = require("node-fetch");
// const app = express();
// const port = 5000;

// const apiKey = "YOUR_GOOGLE_API_KEY"; // החלף במפתח API שלך

// app.get("/distance-matrix", async (req, res) => {
//     const { origins, destinations } = req.query;

//     const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&mode=driving&key=${apiKey}`;
//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         res.json(data);
//     } catch (error) {
//         res.status(500).json({ error: "שגיאה בקבלת המידע" });
//     }
// });

// app.listen(port, () => {
//     console.log(`Proxy server running on http://localhost:${port}`);
// });
