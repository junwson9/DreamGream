package com.ssafy.dreamgream.domain.post.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class LoginMemberRequestDto {

	@JsonProperty("member_id")
	private Long memberId;

}
