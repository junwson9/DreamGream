package com.ssafy.dreamgream.domain.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
public class FollowListResponseDto {

	private Long memberId;

	private String nickname;

	private String profileImg;

	private Boolean isFollowed;

	public FollowListResponseDto(Long memberId, String nickname, String profileImg) {
		this.memberId = memberId;
		this.nickname = nickname;
		this.profileImg = profileImg;
	}


}
