package com.twoez.zupzup.config.security.handler;

import com.twoez.zupzup.config.security.jwt.JwtProvider;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class Oauth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler{

    private final JwtProvider jwtProvider;

    @Value("${client.url}")
    private String clientUrl;

    @Value("${client.redirect.login-success}")
    private String redirectUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {
        // TODO 1: authToken 발급
        // TODO 2: /login-success 로 Redirect

        log.info("onAuthenticationSuccess called");
        OidcUser oidcUser = (OidcUser) authentication.getPrincipal();
//        log.info("idToken : {}", oidcUser.getIdToken().getTokenValue());
        String authToken = jwtProvider.createAuthToken(oidcUser);
        String loginSuccessRedirectUrl = clientUrl + redirectUrl + "?token=" + authToken;
        getRedirectStrategy().sendRedirect(request, response, loginSuccessRedirectUrl);
        super.onAuthenticationSuccess(request, response, authentication);
    }
}
