package com.steam.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.steam.dao.GameRepository;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.*;

import org.springframework.stereotype.Service;
import com.steam.module.Game;
import com.steam.service.IGameService;
import org.springframework.web.client.RestTemplate;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;


@Service
public class GameService implements IGameService {
    @Autowired
    private GameRepository gameRepository;


    @Override
    public void getMapData(Game game){
        Integer appid=game.getAppid();
        String ppl="";

        List<Map<String, Object>> data=gameRepository.getMapData(appid);
        for (Map<String, Object> e : data){
            ppl+=e.get("region")+":"+e.get("ranks").toString()+" ";
        }
        game.setPopularity(ppl);
    }


    @Override
    public List<Game> getTopGames(String region){
        List<Integer> gameIds = gameRepository.getTopGames(region);
        List<Game> games= new ArrayList<Game>();
        for (int id : gameIds){
            Game g = new Game(id);
            games.add(g);
        }
        return games;
    }

    @Override
    public List<Map<String,String>> getFirstGame(){
        List<Map<String,String>> result = new ArrayList<>();
        for (Map<String,Object> data : gameRepository.getFirstGame())
        {
            Map<String,String> map = new HashMap< String,String>();
            map.put("region",data.get("region").toString());
            Game temp= new Game((Integer)data.get("id"));
            map.put("name",temp.getName().toString());
            result.add(map);
        }
        return result;
    }

}
