package com.twoez.zupzup;


import jakarta.annotation.PostConstruct;
import java.time.ZoneId;
import java.util.TimeZone;
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
