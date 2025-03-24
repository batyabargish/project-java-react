


import React, { useState } from "react";
import { GoogleMap, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

const MapComponent = () => {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [userAddress, setUserAddress] = useState(""); 

  const destination = "Dukley Hotel & Resort, Jadranski Put, Zavala Peninsula, Budva 85310"; 

  // פונקציה לזיהוי מיקום אוטומטי
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("המיקום שהתקבל:", latitude, longitude);
          setUserLocation({ lat: latitude, lng: longitude });
          geocodeLocation(latitude, longitude); 
        },
        (error) => {
          console.error("שגיאה בזיהוי מיקום", error);
          alert("לא הצלחנו לזהות את המיקום שלך. נסי שוב.");
        },
        {
          enableHighAccuracy: true,  
          timeout: 5000,  
          maximumAge: 0  
        }
      );
    } else {
      alert("הדפדפן שלך לא תומך במיקום אוטומטי.");
    }
};


  const geocodeLocation = async (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    const latLng = new window.google.maps.LatLng(lat, lng);
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          console.log("כתובת מזוהה:", results[0].formatted_address); // הדפסת הכתובת
          setUserAddress(results[0].formatted_address); // עדכון הכתובת בסטייט
        } else {
          console.log("לא נמצאה כתובת עבור המיקום הזה.");
        }
      } else {
        console.log("שגיאה בהגדרת המיקום:", status);
      }
    });
};


  const calculateRoute = async () => {
    if (!userLocation) {
      alert("יש להזין מיקום ידני או לאפשר זיהוי מיקום אוטומטי.");
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    const request = {
      origin: userLocation,
      destination: destination,
      travelMode: window.google.maps.TravelMode.DRIVING, 
    };

    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        setDirectionsResponse(result);
      } else {
        console.error(`שגיאה בהבאת המסלול: ${status}`);
      }
    });
  };

  return (
    <div>
      <button onClick={getUserLocation} style={{ marginBottom: "10px" }}>
        זיהוי מיקום אוטומטי
      </button>
      <button onClick={calculateRoute}>חשב מסלול</button>

    
      <GoogleMap
        center={userLocation || { lat: 42.2867, lng: 18.8453 }} 
        zoom={12}
        mapContainerStyle={{ width: "100%", height: "500px" }}
      >
        {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;




