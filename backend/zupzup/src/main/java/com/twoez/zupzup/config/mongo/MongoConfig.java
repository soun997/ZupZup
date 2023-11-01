package com.twoez.zupzup.config.mongo;


import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackages = "com.twoez.zupzup.plogginglog.repository.mongo")
public class MongoConfig {}
