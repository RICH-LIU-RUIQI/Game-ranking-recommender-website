package com.steam.service;

import com.steam.dao.GameRepository;
import com.steam.module.Game;

import java.io.IOException;
import java.util.List;
import java.util.Map;


public interface IGameService {


    List<Game> getTopGames(String region);

    List<Map<String,String>> getFirstGame();

    void getMapData(Game game);



}

