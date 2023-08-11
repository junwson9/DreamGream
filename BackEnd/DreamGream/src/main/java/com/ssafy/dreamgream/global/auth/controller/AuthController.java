package com.ssafy.dreamgream.global.auth.controller;

import com.ssafy.dreamgream.domain.member.enums.Gender;
import com.ssafy.dreamgream.global.auth.dto.request.UpdateRoleToUserRequestDto;
import com.ssafy.dreamgream.global.auth.dto.response.TokenResponseDto;
import com.ssafy.dreamgream.global.auth.service.AuthService;
import com.ssafy.dreamgream.global.common.dto.response.ResponseDto;
import com.ssafy.dreamgream.global.config.jwt.JwtTokenProvider;
import java.util.Collections;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

	private static final String success = "SUCCESS";

	private final AuthService authService;
	private final JwtTokenProvider jwtTokenProvider;

	@PostMapping("/token")
	public ResponseEntity<?> reissue(HttpServletRequest request) {
		log.info("토큰 재발급 요청 컨트롤러 도착");
		String refreshToken = jwtTokenProvider.resolveRefreshToken(request);
		TokenResponseDto tokenResponseDto = authService.reissue(refreshToken);
		ResponseDto responseDto = new ResponseDto(success, "토큰을 재발급했습니다.", Collections.singletonMap("token", tokenResponseDto));
		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

	@PutMapping("/role")
	public ResponseEntity<?> updateRoleToUser(@RequestBody @Validated UpdateRoleToUserRequestDto requestDto) {
		Gender gender = requestDto.getGender();
		Integer birthyear = requestDto.getBirthyear();
		TokenResponseDto tokenResponseDto = authService.updateRoleToUser(gender, birthyear);
		ResponseDto responseDto = new ResponseDto(success, "추가 정보 입력을 완료했습니다.", Collections.singletonMap("token", tokenResponseDto));
		return new ResponseEntity<>(responseDto, HttpStatus.OK);
	}

	@PostMapping("/logout")
	public ResponseEntity<?> logout(HttpServletRequest request) {
		String accessToken = jwtTokenProvider.resolveAccessToken(request);
		log.info("로그아웃 accessToken: {}", accessToken);
		authService.logout(accessToken);
		return new ResponseEntity<>(new ResponseDto(success, "로그아웃했습니다."), HttpStatus.OK);
	}

}
