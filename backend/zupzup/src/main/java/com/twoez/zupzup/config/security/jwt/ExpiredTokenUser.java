package com.twoez.zupzup.config.security.jwt;

import com.twoez.zupzup.config.security.user.RequestUser;

public record ExpiredTokenUser(Long memberId) implements RequestUser {

}
