package com.steam.controller;

import com.steam.module.Game;
import com.steam.service.IGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import com.steam.service.IGameService;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.sql.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.nio.file.Paths;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


@Controller
public class RecommendationController {
    @Autowired
    private IGameService gameService;

//    @GetMapping("/recommendation")
//    public String recommendation(@RequestParam(value = "string", defaultValue = "") String string, Model model) throws IOException {
//        List<String> recommendedGames = RecommendGames(string);
//        model.addAttribute("recommendedGames", recommendedGames);
//        return "recommendation";
//    }

//    @GetMapping("/recommendation")
//    public String recommendation(@RequestParam(value = "string", defaultValue = "") String string, Model model) throws IOException {
//        List<Game> recommendedGames = RecommendGames(string);
//        model.addAttribute("recommendedGames", recommendedGames);
//        return "recommendation";
//    }
//    @GetMapping("/recommendation")
//    public List<Game> recommendationge(@RequestParam String string) throws IOException {
//        List<Game> recommendedGames = RecommendGames(string);
//        return recommendedGames;
//}
//
//
//
//    private List<Game> RecommendGames(String userData) throws IOException {
//        // 指定 Python 脚本路径
//        String pythonScriptPath = "../springboot_Basic-master/src/main/RecSys/main.py";
//        // 构造 Python 命令行参数
//        List<String> commandList = new ArrayList<>();
//        commandList.add("python");  // 指定 Python 解释器路径或命令
//        commandList.add(pythonScriptPath);  // 指定 Python 脚本路径
//        commandList.add(userData);  // 将输入数据添加为命令行
//
//        // 执行 Python 脚本并捕获输出和错误输出
//        ProcessBuilder processBuilder = new ProcessBuilder(commandList);
//        Process process = processBuilder.start();
//        BufferedReader outputReader = new BufferedReader(new InputStreamReader(process.getInputStream()));
//        BufferedReader errorReader = new BufferedReader(new InputStreamReader(process.getErrorStream()));
//
//        String line;
//        List<String> outputList = new ArrayList<>();
//        while ((line = outputReader.readLine()) != null) {
//            outputList.add(line);
//        }
//        while ((line = errorReader.readLine()) != null) {
//            outputList.add(line); // 将错误输出也添加到输出列表中
//        }
//
//        // 等待 Python 脚本执行完成
//        try {
//            process.waitFor();
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }
//
//        //返回 Python 脚本输出的列表
//        List<Integer> gameids = new ArrayList<Integer>();
//        String str = outputList.get(0).substring(1, outputList.get(0).length() - 1);
//        List<String> strgameids = Arrays.asList(str.split(", "));
//        List<Game> games = new ArrayList<>();
//
//
//        for (String id: strgameids){
//            Game g= new Game(Integer.valueOf(id.trim()));
//            games.add(g);
//        }
//
//        return games;
//
//    }


}
