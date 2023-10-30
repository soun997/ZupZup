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
        // TODO 2: Id Token 검증
        // idToken validation은 api/v1/auth 에서!

        log.info("customOidcUserService - loadUser called");
        Map<String, Object> claims = userRequest.getIdToken().getClaims();
        log.info("Claim keys : {}", claims.keySet());
        OidcUser oidcUser = super.loadUser(userRequest);
        log.info("oidcUser : {}", oidcUser);
        log.info("id token value : {}", userRequest.getIdToken().getTokenValue());

        return super.loadUser(userRequest);
    }
}
