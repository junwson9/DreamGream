package com.ssafy.dreamgream.domain.post.controller;

import com.ssafy.dreamgream.domain.member.entity.Member;
import com.ssafy.dreamgream.domain.member.enums.Gender;
import com.ssafy.dreamgream.domain.member.service.MemberService;
import com.ssafy.dreamgream.domain.member.service.TestMemberService;
import com.ssafy.dreamgream.domain.post.dto.request.*;
import com.ssafy.dreamgream.domain.post.dto.response.PostListResponseDto;
import com.ssafy.dreamgream.domain.post.dto.response.PostResponseDto;
import com.ssafy.dreamgream.domain.post.entity.Post;
import com.ssafy.dreamgream.domain.post.repository.PostRepository;
import com.ssafy.dreamgream.domain.post.service.PostService;
import com.ssafy.dreamgream.global.common.dto.response.ResponseDto;
import com.ssafy.dreamgream.global.rabbitMQ.ImageService;
import com.ssafy.dreamgream.global.rabbitMQ.dto.PromptCreationProduceDto;
import com.ssafy.dreamgream.global.sse.SSEService;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    private final MemberService memberService;
    private final TestMemberService testMemberService;
    private final PostRepository postRepository;

    private final ModelMapper modelMapper;

    @GetMapping("/test")
    public String Test() {
        log.info("test start");
        PromptCreationProduceDto produceDto = PromptCreationProduceDto.builder()
                .gender(Gender.MALE.toString())
                .birthyear("1997")
                .title("유럽으로 배낭여행 가기")
                .categoryName("Travel")
                .build();

        String prompt = imageService.callPromptServer(produceDto);
        return prompt;
    }

    /**
     * AI 이미지 생성 요청
     * @param dto
     */
    @PostMapping("/image")
    public void generateImage(@RequestBody ImageGenerateRequestDto dto){
        log.info("title : {}", dto.getTitle());
        log.info("category : {}", dto.getCategoryName());

        // 이미지 생성 프로세스 시작
        Member currentMember = memberService.getCurrentMember();
        PromptCreationProduceDto produceDto = PromptCreationProduceDto.builder()
                .gender(currentMember.getGender().toString())
                .birthyear(currentMember.getBirthyear().toString())
                .title(dto.getTitle())
                .categoryName(dto.getCategoryName())
                .build();

        try {
            imageService.processImageCreation(currentMember.getMemberId(), produceDto);
        } catch (Exception e) {
            log.error("이미지 생성 취소");
        }
    }

    @PostMapping()
    public ResponseEntity<?> createPost(@RequestBody PostRequestDto dto) {

        log.info("dto : {} ",dto.toString());
        ResponseDto responseDto = null;
        try {
            postService.savePost(dto);
            log.info("게시글 등록 성공");
            responseDto = new ResponseDto(success, "게시물 등록 성공");
        } catch (Exception e) {
            log.error("게시글 등록 실패");
            log.error(e.getMessage());
        }

        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    /**
     * 전체피드 - 달성완료 조회
     * @param categoryId, lastPostId
     * @return postList
     */
    @GetMapping("/achieved")
    public ResponseEntity<?> findAchievedPosts(@RequestBody(required = false) LoginMemberRequestDto memberDto,
                                                @RequestParam(value = "category-id", required = false) Long categoryId,
                                                @RequestParam(value = "last-post-id", required = false) Long lastPostId,
                                                @PageableDefault(size = 10) Pageable pageable) {
        Long memberId = null;
        if(memberDto != null) {
            memberId = memberDto.getMemberId();
        }

        Slice<PostListResponseDto> postList = postService.findAchievedPosts(memberId, categoryId, true, lastPostId, pageable);

        ResponseDto responseDto = new ResponseDto(success, "달성완료 피드를 조회했습니다.",
            Collections.singletonMap("post_list", postList));
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }


    /**
     * 전체피드 - 달성중 조회
     * @param categoryId, lastPostId
     * @return postList 
     */
    @GetMapping
    public ResponseEntity<?> findNotAchievedPosts(@RequestBody(required = false) LoginMemberRequestDto memberDto,
                                                    @RequestParam(value = "category-id", required = false) Long categoryId,
                                                    @RequestParam(value = "last-post-id", required = false) Long lastPostId,
                                                    @PageableDefault(size = 10) Pageable pageable) {
        Long memberId = null;
        if(memberDto != null) {
            memberId = memberDto.getMemberId();
        }

        Slice<PostListResponseDto> postList = postService.findNotAchievedPosts(memberId, categoryId, false, lastPostId, pageable);

        ResponseDto responseDto = new ResponseDto(success, "달성중 피드를 조회했습니다.",
            Collections.singletonMap("post_list", postList));
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    /**
     * 카테고리별 Best - 달성완료 조회
     */
    @GetMapping("/best/achieved")
    public ResponseEntity<?> findBestAchievedPosts(@RequestParam(value = "category-id", required = false) Long categoryId) {
        List<PostListResponseDto> postList = postService.findBestPostsByAchievedStatus(categoryId, true);
        ResponseDto responseDto = new ResponseDto(success, "베스트를 조회했습니다.",
            Collections.singletonMap("post_list", postList));
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    /**
     * 카테고리별 Best - 달성중 조회
     */
    @GetMapping("/best")
    public ResponseEntity<?> findBestNotAchievedPosts(@RequestParam(value = "category-id", required = false) Long categoryId) {
        List<PostListResponseDto> postList = postService.findBestPostsByAchievedStatus(categoryId, false);
        ResponseDto responseDto = new ResponseDto(success, "베스트를 조회했습니다.",
            Collections.singletonMap("post_list", postList));
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
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
    @GetMapping("/myPosts")
    public ResponseEntity<?> findMyPosts() {
        Map<String, List<PostListResponseDto>> data = postService.findMyPosts();
        ResponseDto responseDto = new ResponseDto(success, "본인 피드를 조회했습니다.", data);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    /**
     * 달성전 게시물 수정
     */
    @PostMapping("/{postId}/unachieved")
    public ResponseEntity<PostResponseDto> unAchievedPostUpdate(@PathVariable("postId") Long postId,
                                                                                @Validated @RequestBody UnAchievedPostUpdateRequestDto unAchievedPostUpdateRequestDto, Errors errors) {

        if(errors.hasErrors()){
            // TODO 예외처리 필요
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else{
            Post updatedPost = postService.unAchievedPostUpdate(postId, unAchievedPostUpdateRequestDto);
            log.info(updatedPost.toString());
            PostResponseDto responseDto = modelMapper.map(updatedPost,PostResponseDto.class);
            return new ResponseEntity<>(responseDto, HttpStatus.OK);
        }
    }

    /**
     * 달성후 게시물 및 달성전=>달성후 수정
     */
    @PostMapping(value = "/{postId}/achieved", consumes = "multipart/form-data")
    public ResponseEntity<PostResponseDto> achievedPostUpdate (@PathVariable("postId") Long postId,
                                                                             @Validated @RequestPart AchievedPostUpdateRequestDto achievedPostUpdateRequestDto,
                                                                             @RequestParam("file") MultipartFile file, Errors errors) {
        if(errors.hasErrors()){
            // TODO 예외처리 필요
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            Post updatedPost = postService.achievedPostUpdate(postId, achievedPostUpdateRequestDto, file);
            PostResponseDto responseDto = modelMapper.map(updatedPost,PostResponseDto.class);
            return new ResponseEntity<>(responseDto, HttpStatus.OK);
        }
    }

    /**
     * 게시물 삭제
     */
    @DeleteMapping("/{postId}")
    public String deletePost(@PathVariable("postId") Long postId) {
        postService.deletePost(postId);
        return "Post with ID " + postId + " has been deleted successfully.";
    }

    /**
     * 게시물 스크랩
     */
    @PostMapping("/{postId}/scrap")
    public ResponseEntity<Long> scrapPost(@PathVariable("postId") Long postId) {
        // postId를 이용하여 해당 Post를 스크랩하고 저장합니다.
        postService.saveScrappedPost(postId);
        return ResponseEntity.ok(postId);
    }


    /**
     * 게시글 상세 조회
     */
    @GetMapping("/{postId}")
    public ResponseEntity<?> findPostById(@RequestBody(required = false) LoginMemberRequestDto memberDto,
                                            @PathVariable Long postId) {
        Long memberId = null;
        if(memberDto != null) {
            memberId = memberDto.getMemberId();
        }

        PostResponseDto postResponseDto = postService.findPostById(memberId, postId);
        ResponseDto responseDto = new ResponseDto(success, "게시글을 조회했습니다.", Collections.singletonMap("post", postResponseDto));
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }
}
