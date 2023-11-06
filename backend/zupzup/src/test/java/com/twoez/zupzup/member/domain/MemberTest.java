package com.twoez.zupzup.member.domain;

import static org.assertj.core.api.Assertions.*;

import com.twoez.zupzup.fixture.member.MemberFixture;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class MemberTest {

    @Test
    @DisplayName("사용자의 헬스 정보를 수정합니다.")
    void updateHealthInfo() {
        Member member = MemberFixture.DEFAULT.getMember();

        member.updateHealthInfo(1998, Gender.M, 181, 74);

        assertThat(member.getBirthYear()).isEqualTo(1998);
        assertThat(member.getGender()).isEqualTo(Gender.M);
        assertThat(member.getHeight()).isEqualTo(181);
        assertThat(member.getWeight()).isEqualTo(74);
    }
}
