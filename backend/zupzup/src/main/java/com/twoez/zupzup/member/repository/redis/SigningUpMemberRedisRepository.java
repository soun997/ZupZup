package com.twoez.zupzup.member.repository.redis;


import com.twoez.zupzup.member.domain.SigningUpMember;
import org.springframework.data.repository.CrudRepository;

public interface SigningUpMemberRedisRepository extends CrudRepository<SigningUpMember, String> {}
