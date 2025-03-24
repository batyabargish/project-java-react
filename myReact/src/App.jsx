
///אם אני מבטלת את הקובץ הישן של המסעדות למרות שאני לא משתמשת בו באמת זה משנה לי את כל התצוגה לשמאל לכן בינתיים אני משאירה אותו עד שאני אצליח לתקן את זה
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from './commponents/signUp';
import { LoginU } from './commponents/login';
import { HomePage } from './commponents/homePage';
import Information from './commponents/information';
import { Hotels, HotelDetails } from './commponents/hotels';
import { Restaurants, RestaurantsDetails } from './commponents/restaurants';
import { Attractions, AttractionsDetails } from './commponents/attractions';
import { Res, ResDetails } from './commponents/res';

import { Chabad } from './commponents/chabad';
import HelpWidget from './commponents/help';
import { useDispatch } from 'react-redux';
import { loadUserFromStorage } from './features/userSlice';
import { LoadScript } from "@react-google-maps/api";
import { Nav } from './commponents/toolBar';
import MapComponent from './commponents/googleMaps';
import {Footer} from './commponents/footer'; 
import  {ProfileSettings}  from './commponents/profileSettings.jsx';


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />
      
      <LoadScript googleMapsApiKey="AIzaSyBNVjEXhyDOUvcCECJFY5x_OGKt38dxVBk">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginU />} />
          <Route path="/information" element={<Information />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/restaurants/:id" element={<RestaurantsDetails />} />
          <Route path="/attractions" element={<Attractions />} />
          <Route path="/attractions/:id" element={<AttractionsDetails />} />
          <Route path="/res" element={<Res />} />
          <Route path="/res/:id" element={<ResDetails />} />
          <Route path="/chabad" element={<Chabad />} />
          <Route path="/ProfileSettings" element={<ProfileSettings />} />
        </Routes>
      </LoadScript>
      
      <HelpWidget />
      
      <Footer />
    </div>
  );
};

export default App;
