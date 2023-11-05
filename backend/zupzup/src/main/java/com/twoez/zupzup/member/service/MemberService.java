package com.twoez.zupzup.member.service;


import com.twoez.zupzup.config.security.exception.InvalidAuthorizationTokenException;
import com.twoez.zupzup.config.security.jwt.AuthorizationToken;
import com.twoez.zupzup.config.security.jwt.JwtProvider;
import com.twoez.zupzup.config.security.jwt.RefreshToken;
import com.twoez.zupzup.global.exception.HttpExceptionCode;
import com.twoez.zupzup.member.controller.dto.RegisterMemberRequest;
import com.twoez.zupzup.member.domain.AuthUser;
import com.twoez.zupzup.member.domain.Member;
import com.twoez.zupzup.member.exception.MemberQueryException;
import com.twoez.zupzup.member.repository.MemberQueryRepository;
import com.twoez.zupzup.member.repository.MemberSpringDataRepository;
import com.twoez.zupzup.member.repository.redis.RefreshTokenRedisRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

    private final JwtProvider jwtProvider;
    private final MemberQueryRepository memberQueryRepository;
    private final MemberSpringDataRepository memberSpringDataRepository;
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;

    public Member save(AuthUser authUser) {
        return memberSpringDataRepository.save(authUser.toNewMember());
    }

    public Optional<Member> findMemberByOauth(AuthUser authUser) {
        return memberQueryRepository.findByOauth(authUser.getOauth());
    }

    public AuthorizationToken issueAuthorizationToken(Long memberId) {
        AuthorizationToken authorizationToken = jwtProvider.createAuthorizationToken(
                memberId);
        saveRefreshToken(memberId, authorizationToken);
        return authorizationToken;
    }

    private void saveRefreshToken(Long memberId, AuthorizationToken authorizationToken) {
        refreshTokenRedisRepository.save(RefreshToken.from(memberId, authorizationToken));
    }

    public void logout(Long memberId) {
        RefreshToken refreshToken = refreshTokenRedisRepository
                .findRefreshTokenByMemberId(String.valueOf(memberId))
                .orElseThrow(() -> new InvalidAuthorizationTokenException(
                        HttpExceptionCode.REFRESH_TOKEN_NOT_FOUND));

        refreshTokenRedisRepository.delete(refreshToken);
    }

    public boolean hasValidRefreshToken(Long memberId) {
        return refreshTokenRedisRepository.findRefreshTokenByMemberId(String.valueOf(memberId))
                .isPresent();
    }

    @Transactional
    public void modifyMemberHealth(RegisterMemberRequest registerMemberRequest) {
        Long memberId = registerMemberRequest.memberId();
        Member member = findById(memberId);
        member.updateHealthInfo(
                registerMemberRequest.birthYear(),
                registerMemberRequest.gender(),
                registerMemberRequest.height(),
                registerMemberRequest.weight());
    }

    public Member findById(Long memberId) {
        log.info("findById Service - memberId : {}", memberId);
        return memberSpringDataRepository
                .findMemberByIsDeletedIsFalseAndIdEquals(memberId)
                .orElseThrow(() -> new MemberQueryException(HttpExceptionCode.MEMBER_NOT_FOUND));
    }

    public Member validateMember(Long memberId) {
        return findById(memberId);
    }

}
