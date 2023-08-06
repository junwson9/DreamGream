package com.ssafy.dreamgream.domain.member.dto.response;

import com.ssafy.dreamgream.domain.member.enums.Gender;
import com.ssafy.dreamgream.domain.member.enums.Provider;
import com.ssafy.dreamgream.domain.member.enums.Role;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Getter
@Builder
@ToString
public class MyInfoResponseDto {

    private Long memberId;

    private String email;

    private String nickname;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private Integer birthyear;

    @Enumerated(EnumType.STRING)
    private Provider provider;

    @Enumerated(EnumType.STRING)
    private Role role;

    private String profileImg;

}
