package com.ssafy.dreamgream.global.auth.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TokenResponseDto {

	private String grantType;
	private String accessToken;
	private String refreshToken;
	private Long accessTokenExpireIn;
	private Long refreshTokenExpireIn;

}
