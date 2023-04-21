package com.steam.controller;

import com.steam.service.IGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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




@Controller
public class RecommendationController {

//    @GetMapping("/recommendation")
//    public String recommendation(@RequestParam(value = "string", defaultValue = "") String string, Model model) throws IOException {
//        List<String> recommendedGames = RecommendGames(string);
//        model.addAttribute("recommendedGames", recommendedGames);
//        return "recommendation";
//    }

    @GetMapping("/recommendation")
    public String recommendation(@RequestParam(value = "string", defaultValue = "") String string, Model model) throws IOException {
        String[] arr = string.split(",");
        List<String> game_list = Arrays.asList(arr);
        List<String> recommendedGames = RecommendGames(game_list);
        model.addAttribute("recommendedGames", recommendedGames);
        return "recommendation";
    }


    private List<String> RecommendGames(List<String> userData) throws IOException {
        // 指定 Python 脚本路径
        String pythonScriptPath = "../springboot_Basic-master/src/main/RecSys/main.py";
        // 构造 Python 命令行参数
        List<String> commandList = new ArrayList<>();
        commandList.add("python");  // 指定 Python 解释器路径或命令
        commandList.add(pythonScriptPath);  // 指定 Python 脚本路径
        for (String game_name: userData){
            commandList.add(game_name);  // 将输入数据添加为命令行参数
        }

        // 执行 Python 脚本并捕获输出和错误输出
        ProcessBuilder processBuilder = new ProcessBuilder(commandList);
        Process process = processBuilder.start();
        BufferedReader outputReader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        BufferedReader errorReader = new BufferedReader(new InputStreamReader(process.getErrorStream()));

        String line;
        List<String> outputList = new ArrayList<>();
        while ((line = outputReader.readLine()) != null) {
            outputList.add(line);
        }
        while ((line = errorReader.readLine()) != null) {
            outputList.add(line); // 将错误输出也添加到输出列表中
        }

        // 等待 Python 脚本执行完成
        try {
            process.waitFor();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // 返回 Python 脚本输出的列表
        return outputList;

    }


}
