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
        log.info("customOidcUserService - loadUser called");
        log.info("userRequest : {}", userRequest);
        log.info("idToken : {}", userRequest.getIdToken());
        Map<String, Object> claims = userRequest.getIdToken().getClaims();
        log.info("Claim keys : {}", claims.keySet());
        return super.loadUser(userRequest);
    }
}
