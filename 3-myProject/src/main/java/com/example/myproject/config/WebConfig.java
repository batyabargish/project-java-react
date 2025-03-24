package com.example.myproject.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration  // קובע שמדובר בקונפיגורציה
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // מתיר לכל הכתובות ב-API שלך
                .allowedOrigins("http://localhost:5173", "http://localhost:5181")  // כאן אתה מגדיר את הכתובת של ה-frontend שלך
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // מתיר את השיטות האלו
                .allowedHeaders("*"); // מתיר כל כותרת (כמו Content-Type, Authorization)
                //.allowCredentials(true);  // אם אתה צריך לשלוח עוגיות
    }
}

