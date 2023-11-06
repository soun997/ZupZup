package com.twoez.zupzup.config.web;

import com.twoez.zupzup.config.security.jwt.AuthReqeustUserArgumentResolver;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final AuthReqeustUserArgumentResolver authReqeustUserArgumentResolver;

    @Bean
    HandlerMethodArgumentResolver requestUserArgumentResolver() {
        return new AuthReqeustUserArgumentResolver();
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        WebMvcConfigurer.super.addArgumentResolvers(resolvers);
        resolvers.add(authReqeustUserArgumentResolver);
    }
}
