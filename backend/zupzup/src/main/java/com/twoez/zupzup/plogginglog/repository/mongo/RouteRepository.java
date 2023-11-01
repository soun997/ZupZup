package com.twoez.zupzup.plogginglog.repository.mongo;


import com.twoez.zupzup.plogginglog.domain.Route;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RouteRepository extends MongoRepository<Route, Long> {}
