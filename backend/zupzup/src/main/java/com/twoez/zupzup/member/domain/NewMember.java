package com.twoez.zupzup.member.domain;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@RedisHash(value = "newMember")
public class NewMember {
    @Id private String memberId;

    public static NewMember from(Long memberId) {
        return new NewMember(String.valueOf(memberId));
    }
}
