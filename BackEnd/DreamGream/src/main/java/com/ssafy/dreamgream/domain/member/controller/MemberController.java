package com.ssafy.dreamgream.domain.member.controller;

import com.ssafy.dreamgream.domain.member.dto.request.UpdateInfoRequestDto;
import com.ssafy.dreamgream.domain.member.dto.response.MemberResponseDto;
import com.ssafy.dreamgream.domain.member.entity.Member;
import com.ssafy.dreamgream.domain.member.enums.Gender;
import com.ssafy.dreamgream.domain.member.service.FollowService;
import com.ssafy.dreamgream.domain.member.service.MemberService;
import com.ssafy.dreamgream.global.common.dto.response.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotBlank;
import java.util.Collections;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private static final String success = "SUCCESS";
    private static final String fail = "FAIL";

    private final MemberService memberService;

    private final FollowService followService;

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
        ResponseDto responseDto = new ResponseDto(success, "회원 정보를 조회합니다.", Collections.singletonMap("member", member));
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
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

        MemberResponseDto memberResponseDto = memberService.updateInfo(nickname, gender, birthyear);
        ResponseDto responseDto = new ResponseDto(success, "회원 정보를 수정했습니다.", Collections.singletonMap("member", memberResponseDto));
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> findByNickname(@RequestParam @NotBlank String nickname,
                                            @PageableDefault(size = 10, sort = "nickname") Pageable pageable) {
        Page<Member> members = memberService.findByNickname(nickname, pageable);

        ResponseDto responseDto = new ResponseDto(
                success,
                "닉네임으로 회원 목록을 조회합니다.",
                Collections.singletonMap("member_list", members.getContent()));

        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }


    /**
     * 특정 회원의 팔로워 목록 조회
     */
    @GetMapping("/{memberId}/followers")
    public ResponseEntity<?> getFollowers(@PathVariable Long memberId) {
        List<Member> followers = followService.getFollowers(memberId);
        return null;
    }


    /**
     * 특정 회원이 팔로우하는 목록 조회
     */
    @GetMapping("/{memberId}/followings")
    public ResponseEntity<?> getFollowings(@PathVariable Long memberId) {
        List<Member> follwings = followService.getFollowings(memberId);
        return null;
    }

}
