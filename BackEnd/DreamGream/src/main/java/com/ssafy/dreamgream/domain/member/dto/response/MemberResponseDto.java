package com.ssafy.dreamgream.domain.member.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class MemberResponseDto {

    private Long memberId;

    private String nickname;

    private String profileImg;

    private Long cntFollowers;

    private Long cntFollowings;

}
