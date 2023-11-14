package com.twoez.zupzup.plogging.domain;


import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@RedisHash(value = "plogging", timeToLive = 1209600)
public class Plogging {

    @Id private String memberId;
    private LocalDateTime startTime;

    public static Plogging from(Long memberId) {
        return new Plogging(String.valueOf(memberId), LocalDateTime.now());
    }
}
