package com.ssafy.dreamgream.domain.post.controller;

import com.ssafy.dreamgream.domain.post.dto.request.ImageGenerateRequestDto;
import com.ssafy.dreamgream.domain.post.dto.request.PostUpdateRequestDto;
import com.ssafy.dreamgream.domain.post.dto.response.PostListResponseDto;
import com.ssafy.dreamgream.domain.post.service.PostService;
import com.ssafy.dreamgream.global.common.dto.response.ResponseDto;
import com.ssafy.dreamgream.global.rabbitMQ.ImageService;
import com.ssafy.dreamgream.global.sse.SSEService;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/posts")
public class PostController {

    private static final String success = "SUCCESS";
    private static final String fail = "FAIL";

    private final ImageService imageService;
    private final SSEService sseService;
    private final PostService postService;

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
        return new ResponseEntity<>(HttpStatus.OK);
    }


    /**
     * 전체피드 - 달성완료 조회
     * @param categoryId, lastPostId
     * @return postList
     */
    @GetMapping("/achieved")
    public ResponseEntity<?> findAchievedPosts(@RequestParam(value = "category-id", required = false) Long categoryId,
                                                  @RequestParam(value = "last-post-id", required = false) Long lastPostId,
                                                  @PageableDefault(size = 10) Pageable pageable) {
        Slice<PostListResponseDto> postList = postService.findPublicPosts(categoryId, true, lastPostId, pageable);

        ResponseDto responseDto = new ResponseDto(success, "달성완료 피드를 조회했습니다.",
            Collections.singletonMap("postList", postList));
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }


    /**
     * 전체피드 - 달성중 조회
     * @param categoryId, lastPostId
     * @return postList 
     */
    @GetMapping
    public ResponseEntity<?> findNotAchievedPosts(@RequestParam(value = "category-id", required = false) Long categoryId,
                                                    @RequestParam(value = "last-post-id", required = false) Long lastPostId,
                                                    @PageableDefault(size = 10) Pageable pageable) {
        Slice<PostListResponseDto> postList = postService.findPublicPosts(categoryId, false, lastPostId, pageable);

        ResponseDto responseDto = new ResponseDto(success, "달성중 피드를 조회했습니다.",
            Collections.singletonMap("postList", postList));
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }


    @PatchMapping("/{postId}")
    public ResponseEntity<PostUpdateRequestDto> updatePostPartially(@PathVariable Long postId, @RequestBody PostUpdateRequestDto requestDto) {
        log.info(String.valueOf(postId));
        PostUpdateRequestDto updatedPost = postService.updatePostPartially(postId, requestDto);
        if (updatedPost == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(updatedPost);
    }


    /**
     * 개인피드 - 타인피드 조회
     */
    @GetMapping("/members/{memberId}")
    public ResponseEntity<?> findPublicPostsByMember(@PathVariable Long memberId) {
        Map<String, List<PostListResponseDto>> data = postService.findPublicPostsByMember(memberId);
        ResponseDto responseDto = new ResponseDto(success, "개인 피드를 조회했습니다.", data);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }


    /**
     * 개인피드 - 본인피드 조회
     * @return
     */
    @GetMapping("/my")
    public ResponseEntity<?> findMyPosts() {
        Map<String, List<PostListResponseDto>> data = postService.findMyPosts();
        ResponseDto responseDto = new ResponseDto(success, "본인 피드를 조회했습니다.", data);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @PatchMapping("/{postId}")
    public ResponseEntity<PostUpdateRequestDto> updatePostPartially(@PathVariable Long postId, @RequestBody PostUpdateRequestDto requestDto) {
        log.info(String.valueOf(postId));
        PostUpdateRequestDto updatedPost = postService.updatePostPartially(postId, requestDto);
        if (updatedPost == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(updatedPost);
    }

    @DeleteMapping("/{post_id}")
    public String deletePost(@PathVariable("post_id") Long postId) {
        postService.deletePost(postId);
        return "Post with ID " + postId + " has been deleted successfully.";
    }


}
