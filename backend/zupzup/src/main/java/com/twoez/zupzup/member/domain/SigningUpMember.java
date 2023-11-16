package com.twoez.zupzup.member.domain;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@RedisHash(value = "signingUpMember")
public class SigningUpMember {
    @Id private String memberId;

    public static SigningUpMember from(Long memberId) {
        return new SigningUpMember(String.valueOf(memberId));
    }
}
