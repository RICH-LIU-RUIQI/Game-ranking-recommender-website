package com.steam.controller;

import com.steam.dao.GameRepository;
import com.steam.service.impl.GameService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.steam.module.Game;
import com.steam.service.IGameService;
import org.springframework.ui.Model;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/")
public class GameController {
    @Autowired
    private IGameService gameService;

//    @GetMapping("/games")
//    public @ResponseBody List<Game> getTopGames(@RequestParam String region) {
//        List<Game> gs=gameService.getTopGames(region);
//        for (Game g : gs){
//            gameService.getMapData(g);
//        }
//        return gs;
//    }

//    @GetMapping("/games")
//    public @ResponseBody List<Object> getTopGames(@RequestParam String region) {
//        List<Object> result = new ArrayList<>();
//        List<Game> gs=gameService.getTopGames(region);
//        for (Game g : gs){
//            gameService.getMapData(g);
//        }
//
//        List<Map<String,String>> fg =gameService.getFirstGame();
//
//        result.add(gs);
//        result.add(fg);
//
//        return result;
//    }

    @GetMapping("/games")
    public @ResponseBody List<Game> getTopGames(@RequestParam String region) {
        List<Game> topGames = gameService.getTopGames(region);
        for (Game game : topGames) {
            gameService.getMapData(game);
        }
        return topGames;
    }

    @GetMapping("/firstgame")
    public @ResponseBody List<Map<String,String>> getFirstGame() {
        return gameService.getFirstGame();
    }


}

