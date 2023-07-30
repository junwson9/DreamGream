package com.ssafy.dreamgream.global.auth.controller;

import com.ssafy.dreamgream.domain.member.enums.Gender;
import com.ssafy.dreamgream.global.auth.dto.request.TokenRequestDto;
import com.ssafy.dreamgream.global.auth.dto.request.UpdateRoleToUserRequestDto;
import com.ssafy.dreamgream.global.auth.service.AuthService;
import com.ssafy.dreamgream.global.auth.dto.response.TokenResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

	private final AuthService authService;

	@PutMapping("/role")
	public ResponseEntity<?> updateRoleToUser(@RequestBody @Validated UpdateRoleToUserRequestDto requestDto) {
		Gender gender = requestDto.getGender();
		Integer birthyear = requestDto.getBirthyear();
		TokenResponseDto tokenResponseDto = authService.updateRoleToUser(gender, birthyear);
		return ResponseEntity.ok(tokenResponseDto);
	}

	@PostMapping("/token")
	public ResponseEntity<?> reissue(@RequestBody TokenRequestDto tokenRequestDto) {
		TokenResponseDto tokenResponseDto = authService.reissue(tokenRequestDto);
		return ResponseEntity.ok(tokenResponseDto);
	}

}
