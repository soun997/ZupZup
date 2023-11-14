package com.twoez.zupzup.plogging.repository.redis;


import com.twoez.zupzup.plogging.domain.Plogging;
import org.springframework.data.repository.CrudRepository;

public interface PloggingRedisRepository extends CrudRepository<Plogging, String> {}
