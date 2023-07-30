package com.ssafy.dreamgream.domain.member.controller;

import static org.springframework.http.ResponseEntity.badRequest;

import com.ssafy.dreamgream.domain.member.dto.request.UpdateInfoRequestDto;
import com.ssafy.dreamgream.domain.member.entity.Member;
import com.ssafy.dreamgream.domain.member.enums.Gender;
import com.ssafy.dreamgream.domain.member.service.MemberService;
import java.util.List;
import javax.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.connector.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/testUser")
    public ResponseEntity<?> testUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info(String.valueOf(SecurityContextHolder.getContext()));
        return ResponseEntity.ok(authentication);
    }

    @GetMapping("/testGuest")
    public ResponseEntity<?> testGuest() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info(String.valueOf(SecurityContextHolder.getContext()));
        return ResponseEntity.ok(authentication);
    }

    @GetMapping("/info")
    public ResponseEntity<?> getInfo() {
        Member member = memberService.getCurrentMember();
        return ResponseEntity.ok(member);
    }

    @PutMapping("/info")
    public ResponseEntity<?> updateInfo(@RequestBody @Validated UpdateInfoRequestDto requestDto, Errors errors) {
        String nickname = requestDto.getNickname();
        Gender gender = requestDto.getGender();
        Integer birthyear = requestDto.getBirthyear();
        log.info("nickname: {}, gender: {}, birthyear: {}", nickname, gender, birthyear);
        if(errors.hasErrors()) {
            // TODO 예외처리 필요
            return new ResponseEntity<>("회원정보를 변경할 수 없습니다.", HttpStatus.BAD_REQUEST);

        }
        Member member = memberService.updateInfo(nickname, gender, birthyear);

        return ResponseEntity.ok(member);
    }

    @GetMapping
    public ResponseEntity<?> findByNickname(@RequestParam @NotBlank String nickname) {
        List<Member> members = memberService.findByNickname(nickname);
        return ResponseEntity.ok(members);
    }
}
