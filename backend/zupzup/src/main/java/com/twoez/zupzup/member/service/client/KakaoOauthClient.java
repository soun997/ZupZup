package com.twoez.zupzup.member.service.client;


import com.twoez.zupzup.member.service.dto.OidcPublicKeyList;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "KakaoOauthClient", url = "https://kauth.kakao.com")
@Component
public interface KakaoOauthClient {

    @Cacheable(value = "kakaoPublicKeys")
    @GetMapping("/.well-known/jwks.json")
    OidcPublicKeyList getKakaoOidcPublicKeys();
}
