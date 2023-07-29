package com.ssafy.dreamgream.global.auth.controller;

import com.ssafy.dreamgream.domain.member.entity.Member;
import com.ssafy.dreamgream.domain.member.enums.Gender;
import com.ssafy.dreamgream.domain.member.service.MemberService;
import com.ssafy.dreamgream.global.auth.dto.request.UpdateRoleToUserRequestDto;
import com.ssafy.dreamgream.global.jwt.TokenDto;
import java.time.Year;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

	private final MemberService memberService;

	@PutMapping
	public ResponseEntity<?> updateRoleToUser() {

		Long id = 1L;
		Gender gender = Gender.FEMALE;
		Year birthyear = Year.of(1994);
//		Gender gender = updateRoleToUserRequestDto.getGender();
//		Year birthyear = updateRoleToUserRequestDto.getBirthyear();
		TokenDto tokenDto = memberService.updateRoleToUser(id, gender, birthyear);
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("token", tokenDto);
		resultMap.put("authentication", authentication);
		return ResponseEntity.ok(resultMap);
	}

}
