package com.steam.module;

import java.util.Arrays;
import java.util.List;
import java.util.Map;


import com.steam.dao.GameRepository;
import com.steam.service.impl.GameService;
import org.springframework.data.repository.query.Param;
import org.springframework.web.client.RestTemplate;

import javax.persistence.*;


@Entity
public class Game {
    @Id
    private Integer appid;

    private String name;
    private String header_image;

    private String categories;

    private String movie;

    private String description;
    private String age;

    private String price;

    private String language;

    private String popularity;



    public Game(int appid) {
        this.appid = appid;
        this.fetchAttributes();
    }

    public Game() {}

    private void fetchAttributes() {
        RestTemplate restTemplate = new RestTemplate();

        // Get game details from Steam API
        String API_KEY = "9323601BABC0C0778FBF33492AD68A05";
        String steamApiUrl = "https://store.steampowered.com/api/appdetails/?appids=" + this.appid +  "&key=" + API_KEY;
        Map<String, Object> steamApiResponse = restTemplate.getForObject(steamApiUrl, Map.class);
        Map<String, Object> gameDetails = (Map<String, Object>) steamApiResponse.get(Integer.toString(this.appid));


        if (gameDetails.get("data") != null) {
            Map<String, Object> data = (Map<String, Object>) gameDetails.get("data");

            if (data.get("movies")!=null) {
                Map<String, Object> moviedata = (Map<String, Object>) ((List) (data.get("movies"))).get(0);
                this.movie= ((Map<String,String>)moviedata.get("mp4")).get("max");
            }

            if (data.get("categories")!=null) {
                List<Map<String,Object>> categoriesdata = (List<Map<String,Object>>) (data.get("categories"));
                String cstring="";
                for (Map<String,Object> cdata: categoriesdata){
                    cstring+=cdata.get("description")+" ";
                }
                this.categories=cstring;
            }

            if ((Boolean) data.get("is_free")!=true){
                this.price=((Map<String,String>) data.get("price_overview")).get("final_formatted");
            }
            else{
                this.price="Free";
            }


            // Set properties based on game details
            this.header_image = data.get("header_image").toString();
            this.name = data.get("name").toString();
            this.description = data.get("short_description").toString();
            this.age=data.get("required_age").toString();
            this.language=data.get("supported_languages").toString();


            //this.age =  data.get("required_age");
        }
    }

    // Getters and setters omitted for brevity


    public Integer getAppid() {
        return appid;
    }

    public void setAppid(Integer appid) {
        this.appid = appid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHeader_image() {
        return header_image;
    }

    public void setHeader_image(String header_image) {
        this.header_image = header_image;
    }


    public String getCategories() {
        return categories;
    }

    public void setCategories(String categories) {
        this.categories = categories;
    }


    public String getDetailed_description() {
        return description;
    }

    public void setDetailed_description(String description) {
        this.description = description;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getPopularity() {
        return popularity;
    }

    public void setPopularity(String popularity) {
        this.popularity = popularity;
    }

    public void setMovie(){this.movie=movie;}

    public String getMovie(){return this.movie;}


    public String getPrice() { return price;}

    public void setPrice(String price) {
        this.price = price;
    }

    public String getLanguage() {return language;}

    public void setLanguage(String language) {this.language = language; }
}



