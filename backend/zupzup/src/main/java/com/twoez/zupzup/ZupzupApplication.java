package com.twoez.zupzup;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class ZupzupApplication {

    public static void main(String[] args) {
        SpringApplication.run(ZupzupApplication.class, args);
    }

}
