package com.twoez.zupzup.member.service;

import com.twoez.zupzup.config.security.jwt.AuthorizationToken;
import com.twoez.zupzup.config.security.jwt.JwtProvider;
import com.twoez.zupzup.member.domain.AuthUser;
import com.twoez.zupzup.member.domain.Member;
import com.twoez.zupzup.member.repository.MemberQueryRepository;
import com.twoez.zupzup.member.repository.MemberSpringDataRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final JwtProvider jwtProvider;
    private final MemberQueryRepository memberQueryRepository;
    private final MemberSpringDataRepository memberSpringDataRepository;

    public Member save(AuthUser authUser) {
        return memberSpringDataRepository.save(authUser.toNewMember());
    }

    public Optional<Member> findMemberByOauth(AuthUser authUser) {
        return memberQueryRepository.findByOauth(authUser.getOauth());
    }

    public AuthorizationToken issueAuthorizationToken(Member member) {
        return jwtProvider.createAuthorizationToken(member.getId());
    }

}
