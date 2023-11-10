package com.twoez.zupzup.member.service.dto;


import java.io.Serializable;
import java.util.List;

public record OidcPublicKeyList(List<OidcPublicKey> keys) implements Serializable {}
