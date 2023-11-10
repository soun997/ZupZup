package com.twoez.zupzup.member.service.dto;


import java.io.Serializable;

public record OidcPublicKey(String kid, String alg, String kty, String use, String n, String e)
        implements Serializable {}
