package com.twoez.zupzup.config.web;

import com.twoez.zupzup.config.security.jwt.RequestUserArgumentResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Bean
    HandlerMethodArgumentResolver requestUserArgumentResolver() {
        return new RequestUserArgumentResolver();
    }
}
