package com.twoez.zupzup.member.service;

import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOidcUserService extends OidcUserService {

    @Override
    public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {
        // TODO 1: 사용자 정보를 OidcUser로 가져온다.
        // TODO 2: 사용자 정보에 idToken을 추가해서 return
        // TODO 3: Id Token 검증
        // idToken validation은 api/v1/auth 에서!

        log.info("customOidcUserService - loadUser called");
        log.info("userRequest : {}", userRequest);
        log.info("idToken : {}", userRequest.getIdToken());
        log.info("idTokenStr : {}", userRequest.getIdToken().toString());
        Map<String, Object> claims = userRequest.getIdToken().getClaims();
        log.info("Claim keys : {}", claims.keySet());
        OidcUser oidcUser = super.loadUser(userRequest);
        oidcUser.getIdToken().getTokenValue();
//        oidcUser.getClaims().put("idToken", userRequest.getIdToken());
        log.info("oidcUser : {}", oidcUser);
        log.info("id token value : {}", userRequest.getIdToken().getTokenValue());

        return super.loadUser(userRequest);
    }
}
