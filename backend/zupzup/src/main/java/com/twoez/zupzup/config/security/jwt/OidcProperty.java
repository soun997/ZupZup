package com.twoez.zupzup.config.security.jwt;

import lombok.Getter;

@Getter
public record OidcProperty(String issuer, String audience) {

}
