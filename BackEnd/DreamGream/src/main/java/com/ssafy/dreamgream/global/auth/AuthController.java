package com.ssafy.dreamgream.global.auth;

import com.ssafy.dreamgream.global.auth.dto.request.TokenRequestDto;
import com.ssafy.dreamgream.global.jwt.TokenDto;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

	private final AuthService authService;

	/**
	 * accessToken이 만료된 경우,
	 *
	 */
	@PostMapping("/token")
	public ResponseEntity<?> reissue(@RequestBody @Valid TokenRequestDto tokenRequestDto) {
		TokenDto tokenDto = authService.reissue(tokenRequestDto);
		return ResponseEntity.ok(tokenDto);
	}

}
