package com.twoez.zupzup.member.service;

import static org.assertj.core.api.Assertions.assertThatNoException;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.*;

import com.twoez.zupzup.member.controller.dto.MemberHealthModifyRequest;
import com.twoez.zupzup.member.domain.Gender;
import com.twoez.zupzup.member.domain.Member;
import com.twoez.zupzup.member.exception.MemberQueryException;
import com.twoez.zupzup.member.repository.MemberSpringDataRepository;
import java.util.Optional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class MemberServiceTest {
    @InjectMocks MemberService memberService;
    @Mock MemberSpringDataRepository memberSpringDataRepository;
    @Mock Member member;

    @Test
    @DisplayName("사용자의 헬스 정보를 수정합니다.")
    void modifyMemberHealth() {
        MemberHealthModifyRequest request = new MemberHealthModifyRequest(1998, Gender.M, 181, 74);

        given(memberSpringDataRepository.findMemberByIsDeletedIsFalseAndIdEquals(any(Long.class)))
                .willReturn(Optional.of(member));

        memberService.modifyMemberHealth(member.getId(), request);

        then(member).should(times(1)).updateHealthInfo(1998, Gender.M, 181, 74);

        assertThatNoException()
                .isThrownBy(() -> memberService.modifyMemberHealth(member.getId(), request));
    }

    @Test
    @DisplayName("멤버 ID가 없을 때 예외가 발생한다.")
    void doNotModifyMemberHealthIfNotExistsMemberId() {
        given(memberSpringDataRepository.findMemberByIsDeletedIsFalseAndIdEquals(any()))
                .willReturn(Optional.empty());

        MemberHealthModifyRequest request = new MemberHealthModifyRequest(1998, Gender.M, 181, 74);

        assertThatThrownBy(() -> memberService.modifyMemberHealth(null, request))
                .isInstanceOf(MemberQueryException.class);
    }
}
