package com.steam.dao;

import com.steam.module.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;


@Repository
public interface GameRepository extends JpaRepository<Game,Integer> {

    @Query(value = "SELECT r.id FROM rankings r WHERE r.region = :region LIMIT 3" , nativeQuery = true)
    List<Integer> getTopGames(@Param("region") String region);

    @Query(value = "SELECT r.region region, r.rank ranks FROM rankings r WHERE r.id = :id " , nativeQuery = true)
    List<Map<String,Object>> getMapData(@Param("id") Integer id);


    @Query(value = "SELECT r.region region, r.id id FROM rankings r WHERE r.rank = 1 " , nativeQuery = true)
    List<Map<String,Object>> getFirstGame();

}


























