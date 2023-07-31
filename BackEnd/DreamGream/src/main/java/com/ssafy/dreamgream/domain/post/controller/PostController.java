package com.ssafy.dreamgream.domain.post.controller;

import com.ssafy.dreamgream.domain.post.dto.request.ImageGenerateRequestDto;
import com.ssafy.dreamgream.domain.post.dto.request.ImageGenerateResponseDto;
import com.ssafy.dreamgream.domain.post.dto.response.PostListResponseDto;
import com.ssafy.dreamgream.domain.post.service.PostServiceImpl;
import com.ssafy.dreamgream.global.common.dto.response.ResponseDto;
import com.ssafy.dreamgream.global.rabbitMQ.ImageService;
import com.ssafy.dreamgream.global.sse.SSEService;
import java.util.Collections;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/posts")
public class PostController {

    private static final String success = "SUCCESS";
    private static final String fail = "FAIL";

    private final PostServiceImpl postServiceImpl;
    private final ImageService imageService;
    private final SSEService sseService;

    @GetMapping("/test")
    public String Test() {
        log.info("test request!");
        return "test request";
    }

    @PostMapping("/image")
    public ResponseEntity<String> generateImage(@RequestBody ImageGenerateRequestDto dto) throws InterruptedException {
        Long userId = 123L;

        log.info("title : {}", dto.getTitle());
        log.info("category : {}", dto.getCategoryName());

        // 이미지 생성 프로세스 시작
        //imageService.processImageCreation(userId, dto);

        ImageGenerateResponseDto testDto = ImageGenerateResponseDto.builder()
                .url("test.com")
                .build();
        log.info("sleep start");
        Thread.sleep(5000);
        log.info("sleep end");

        sseService.sendImageResponse(userId, testDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * 달성완료 피드 조회
     * TODO: 캐싱, 페이징
     * @param categoryName
     * @return postList
     */
    @GetMapping("/achieved")
    public ResponseEntity<?> findAchievedPostList(@RequestParam(value = "category-name", required = false) String categoryName) {
        List<PostListResponseDto> postList = postServiceImpl.findAchievedPostList(categoryName, true);

        ResponseDto responseDto = new ResponseDto(success, "달성중 피드를 조회했습니다.",
            Collections.singletonMap("postList", postList));
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    /**
     * 달성중 피드 조회
     * TODO: 캐싱, 페이징
     * @param categoryName
     * @return postList 
     */
    @GetMapping
    public ResponseEntity<?> findNotAchievedPostList(@RequestParam(value = "category-name", required = false) String categoryName) {
        List<PostListResponseDto> postList = postServiceImpl.findAchievedPostList(categoryName, false);

        ResponseDto responseDto = new ResponseDto(success, "달성중 피드를 조회했습니다.",
            Collections.singletonMap("postList", postList));
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }



}
