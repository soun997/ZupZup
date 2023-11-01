package com.twoez.zupzup.plogginglog.service;


import com.twoez.zupzup.global.exception.flogginglog.RouteNotFoundException;
import com.twoez.zupzup.plogginglog.domain.Route;
import com.twoez.zupzup.plogginglog.repository.RouteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RouteService {

    private final RouteRepository routeRepository;

    @Transactional
    public void addRoute(Route route) {

        routeRepository.save(route);
    }

    public Route searchRoute(Long id) {

        return routeRepository.findById(id).orElseThrow(RouteNotFoundException::new);
    }
}
