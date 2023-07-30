package com.ssafy.dreamgream.global.auth.controller;

import com.ssafy.dreamgream.domain.member.enums.Gender;
import com.ssafy.dreamgream.global.auth.dto.request.TokenRequestDto;
import com.ssafy.dreamgream.global.auth.dto.request.UpdateRoleToUserRequestDto;
import com.ssafy.dreamgream.global.auth.service.AuthService;
import com.ssafy.dreamgream.global.jwt.TokenDto;
import java.time.Year;
import java.util.HashMap;
import java.util.Map;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
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
	public ResponseEntity<?> updateRoleToUser(@RequestBody @Valid UpdateRoleToUserRequestDto requestDto) {
		Gender gender = requestDto.getGender();
		Year birthyear = requestDto.getBirthyear();
		TokenDto tokenDto = authService.updateRoleToUser(gender, birthyear);
		return ResponseEntity.ok(tokenDto);
	}

	@PostMapping("/token")
	public ResponseEntity<?> reissue(@RequestBody TokenRequestDto tokenRequestDto) {
		TokenDto tokenDto = authService.reissue(tokenRequestDto);
		return ResponseEntity.ok(tokenDto);
	}

}
