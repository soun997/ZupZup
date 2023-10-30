package com.twoez.zupzup.config.security.filter;

import com.twoez.zupzup.config.security.jwt.JwtProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.Iterator;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final String AUTHORIZATION_HEADER = "Authorization";
    private final JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
        log.info("[Filter - START] JwtAuthFilter - {}", request.getRequestURI());
        getTokenFromHeader(request).ifPresent(System.out::println);
        log.info("query String : {}", request.getQueryString());
        Iterator<String> paramIterator = request.getParameterNames().asIterator();
        log.info("param is Empty ? {}", !paramIterator.hasNext());
        while (paramIterator.hasNext()) {
            log.info(paramIterator.next());
        }
        log.info("state : {}", (Object) request.getParameterValues("state"));
        log.info("code : {}", (Object) request.getParameterValues("code"));


        doFilter(request, response, filterChain);
        log.info("[Filter - END] JwtAuthFilter");

    }

    private Optional<String> getTokenFromHeader(HttpServletRequest request) {
        return Optional.ofNullable(request.getHeader(AUTHORIZATION_HEADER));
    }

    private Optional<String> getTokenFromHeader(HttpServletRequest request, String header) {
        return Optional.ofNullable(request.getHeader(header));
    }
}
