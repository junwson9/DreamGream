package com.ssafy.dreamgream.domain.member.controller;

import com.ssafy.dreamgream.domain.member.dto.request.UpdateInfoRequestDto;
import com.ssafy.dreamgream.domain.member.dto.response.FollowListResponseDto;
import com.ssafy.dreamgream.domain.member.dto.response.MemberResponseDto;
import com.ssafy.dreamgream.domain.member.dto.response.MyInfoResponseDto;
import com.ssafy.dreamgream.domain.member.entity.Member;
import com.ssafy.dreamgream.domain.member.enums.Gender;
import com.ssafy.dreamgream.domain.member.service.FollowService;
import com.ssafy.dreamgream.domain.member.service.MemberService;
import com.ssafy.dreamgream.global.common.dto.response.ResponseDto;
import com.ssafy.dreamgream.global.exception.ErrorCode;
import com.ssafy.dreamgream.global.exception.customException.InvalidInputValueException;
import java.util.Collections;
import java.util.List;
import javax.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@Slf4j
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private static final String success = "SUCCESS";

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

    /**
     * 로그인한 회원의 세부 정보 조회
     */
    @GetMapping("/info")
    public ResponseEntity<?> getMyInfo() {
        Member member = memberService.getCurrentMember();
        ResponseDto responseDto = new ResponseDto(success, "회원 정보를 조회합니다.", Collections.singletonMap("member", member));
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    /**
     * 회원정보 수정
     */
    @PutMapping("/info")
    public ResponseEntity<?> updateInfo(@RequestBody @Validated UpdateInfoRequestDto requestDto, Errors errors) {

        if(errors.hasErrors()) {
            throw new InvalidInputValueException("InvalidInputValueException", ErrorCode.INVALID_INPUT_VALUE);
        }

        String nickname = requestDto.getNickname();
        Gender gender = requestDto.getGender();
        Integer birthyear = requestDto.getBirthyear();
        log.info("nickname: {}, gender: {}, birthyear: {}", nickname, gender, birthyear);

        MyInfoResponseDto myInfoResponseDto = memberService.updateInfo(nickname, gender, birthyear);
        ResponseDto responseDto = new ResponseDto(success, "회원 정보를 수정했습니다.",
            Collections.singletonMap("member", myInfoResponseDto));
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }


    /**
     * 회원 프로필 이미지 수정
     */
    @PostMapping(value = "/info/image", consumes = "multipart/form-data")
    public ResponseEntity<?> updateProfileImg(@RequestParam("file") MultipartFile file) {

        MyInfoResponseDto myInfoResponseDto = memberService.updateProfileImg(file);
        ResponseDto responseDto = new ResponseDto(success, "프로필 이미지를 변경했습니다.",
                Collections.singletonMap("member", myInfoResponseDto));
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }


    /**
     * 개인피드 회원정보 조회 (id, 닉네임, 프로필, 팔로잉/팔로워 수)
     */
    @GetMapping("/{memberId}")
    public ResponseEntity<?> getMemberInfo(@PathVariable Long memberId) {
        MemberResponseDto memberResponseDto = memberService.getMemberInfo(memberId);
        ResponseDto responseDto = new ResponseDto(success, "회원 프로필을 조회합니다.",
            Collections.singletonMap("member", memberResponseDto));
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }


    /**
     * 키워드가 포함된 닉네임 검색
     */
    @GetMapping
    public ResponseEntity<?> findByNickname(@RequestParam @NotBlank String nickname,
                                            @PageableDefault(size = 10, sort = "nickname") Pageable pageable) {
        List<FollowListResponseDto> members = memberService.findByNickname(nickname, pageable);

        ResponseDto responseDto = new ResponseDto(
                success,
                "닉네임으로 회원 목록을 조회합니다.",
                Collections.singletonMap("member_list", members));

        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }


    /**
     * 특정 회원의 팔로워 목록 조회
     */
    @GetMapping("/{memberId}/followers")
    public ResponseEntity<?> getFollowers(@PathVariable Long memberId,
                                            @PageableDefault(size = 10) Pageable pageable) {
        List<FollowListResponseDto> followers = followService.getFollowers(memberId, pageable);

        ResponseDto responseDto = new ResponseDto(success, "팔로워 목록을 조회했습니다.",
            Collections.singletonMap("follower_list", followers));
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    /**
     * 특정 회원이 팔로우한 회원 목록 조회
     */
    @GetMapping("/{memberId}/followings")
    public ResponseEntity<?> getFollowings(@PathVariable Long memberId,
                                            @PageableDefault(size = 10) Pageable pageable) {
        List<FollowListResponseDto> followings = followService.getFollowings(memberId, pageable);

        ResponseDto responseDto = new ResponseDto(success, "팔로잉 목록을 조회했습니다.",
            Collections.singletonMap("following_list", followings));
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }


    /**
     * 팔로우 하기
     */
    @PostMapping("/follow/{toMemberId}")
    public ResponseEntity<?> follow(@PathVariable Long toMemberId) {
        followService.follow(toMemberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * 팔로우 취소
     */
    @DeleteMapping("/follow/{toMemberId}")
    public ResponseEntity<?> unFollow(@PathVariable Long toMemberId) {
        followService.unFollow(toMemberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
