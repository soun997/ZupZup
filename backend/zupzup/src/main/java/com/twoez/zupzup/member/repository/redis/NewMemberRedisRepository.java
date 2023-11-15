package com.twoez.zupzup.member.repository.redis;


import com.twoez.zupzup.member.domain.NewMember;
import org.springframework.data.repository.CrudRepository;

public interface NewMemberRedisRepository extends CrudRepository<NewMember, String> {}
