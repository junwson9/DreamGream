package com.ssafy.dreamgream.global.jwt;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TokenDto {

	private String grantType;
	private String accessToken;
	private String refreshToken;
	private Long accessTokenExpireIn;
	private Long refreshTokenExpireIn;

}
