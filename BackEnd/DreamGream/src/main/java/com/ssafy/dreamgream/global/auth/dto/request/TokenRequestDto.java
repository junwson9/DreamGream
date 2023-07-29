package com.ssafy.dreamgream.global.auth.dto.request;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class TokenRequestDto {
	String accessToken;
	String refreshToken;
}
