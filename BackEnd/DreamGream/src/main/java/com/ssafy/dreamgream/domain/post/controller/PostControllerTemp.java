package com.ssafy.dreamgream.domain.post.controller;

import com.ssafy.dreamgream.domain.post.dto.request.ImageGenerateRequestDto;
import com.ssafy.dreamgream.domain.post.dto.response.PostListResponseDto;
import com.ssafy.dreamgream.domain.post.service.PostServiceImpl;
import com.ssafy.dreamgream.global.common.dto.response.ResponseDto;
import com.ssafy.dreamgream.global.sse.SSEService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/posts-temp")
public class PostControllerTemp {

    private static final String success = "SUCCESS";
    private static final String fail = "FAIL";

    private final PostServiceImpl postServiceImpl;


    /**
     * 개인 피드 조회
     * isDisplay = true여야함
     * 카테고리 분리X
     *
     * @param
     * @return postList
     */
    @GetMapping("/members/{memberId}")
    public ResponseEntity<?> findPostListByMember(@PathVariable(required = true) Long memberId,
                                                 @RequestParam(value = "last-post-id", required = false) Long lastPostId,
                                                 @PageableDefault(size = 10) Pageable pageable) {

        Slice<PostListResponseDto> postList = postServiceImpl.findPostListByMember(memberId, lastPostId, pageable, true);
        ResponseDto responseDto = new ResponseDto(success, "개인 피드를 조회했습니다.", Collections.singletonMap("postList", postList));
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }



}
