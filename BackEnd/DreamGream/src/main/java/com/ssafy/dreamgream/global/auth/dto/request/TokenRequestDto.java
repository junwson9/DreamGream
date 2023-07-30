package com.ssafy.dreamgream.global.auth.dto.request;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class TokenRequestDto {

	@NotEmpty(message = "access token은 필수 값입니다.")
	String accessToken;

	@NotEmpty(message = "refresh token은 필수 값입니다.")
	String refreshToken;
}
