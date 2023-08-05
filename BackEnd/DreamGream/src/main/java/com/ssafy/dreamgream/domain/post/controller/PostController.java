package com.ssafy.dreamgream.domain.post.controller;

import com.ssafy.dreamgream.domain.member.entity.Member;
import com.ssafy.dreamgream.domain.member.service.MemberService;
import com.ssafy.dreamgream.domain.member.service.TestMemberService;
import com.ssafy.dreamgream.domain.post.dto.request.*;
import com.ssafy.dreamgream.domain.post.dto.response.AchievedPostUpdateResponseDto;
import com.ssafy.dreamgream.domain.post.dto.response.PostListResponseDto;
import com.ssafy.dreamgream.domain.post.dto.response.PostResponseDto;
import com.ssafy.dreamgream.domain.post.dto.response.UnAchievedPostUpdateResponseDto;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
        log.info("test request!");
        return "test request";
    }

    @PostMapping("/image")
    public void generateImage(@RequestBody ImageGenerateRequestDto dto){
        log.info("title : {}", dto.getTitle());
        log.info("category : {}", dto.getCategoryName());

        // 이미지 생성 프로세스 시작
//        Member currentMember = memberService.getCurrentMember();
        Member currentMember = testMemberService.getTestMember();
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

    @PatchMapping("/{postId}")
    public ResponseEntity<PostUpdateRequestDto> updatePostPartially(@PathVariable Long postId, @RequestBody PostUpdateRequestDto requestDto) {
        log.info(String.valueOf(postId));
        PostUpdateRequestDto updatedPost = postService.updatePostPartially(postId, requestDto);
        if (updatedPost == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(updatedPost);
    }

    @PostMapping("/{postId}/unachieved")
    public ResponseEntity<UnAchievedPostUpdateResponseDto> unAchievedPostUpdate(@PathVariable Long postId, @RequestBody UnAchievedPostUpdateRequestDto unAchievedPostUpdateRequestDto) {
        Post updatedPost = postService.UnAchievedPostUpdateRequestDto(postId, unAchievedPostUpdateRequestDto);

        if (updatedPost == null) {
            // postId에 해당하는 포스트가 없는 경우 404 Not Found 응답
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        UnAchievedPostUpdateResponseDto responseDto = new UnAchievedPostUpdateResponseDto();
        // 포스트 업데이트 성공 시 200 OK 응답과 업데이트된 포스트 객체를 ResponseDto로 변환하여 반환
        modelMapper.map(updatedPost, responseDto);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @PostMapping(value = "/{postId}/achieved", consumes = "multipart/form-data")
    public ResponseEntity<AchievedPostUpdateResponseDto> achievedPostUpdate (@PathVariable Long postId,
                                                                             @RequestPart AchievedPostUpdateRequestDto achievedPostUpdateRequestDto,
                                                                             @RequestParam("file") MultipartFile file) {
        Post updatedPost = postService.AchievedPostUpdate(postId, achievedPostUpdateRequestDto, file);

        if (updatedPost == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        AchievedPostUpdateResponseDto responseDto = modelMapper.map(updatedPost, AchievedPostUpdateResponseDto.class);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }



    @DeleteMapping("/{post_id}")
    public String deletePost(@PathVariable("post_id") Long postId) {
        postService.deletePost(postId);
        return "Post with ID " + postId + " has been deleted successfully.";
    }

    @PostMapping("/{postId}/scrap")
    public ResponseEntity<String> scrapPost(@PathVariable("postId") Long postId) {
        // postId를 이용하여 해당 Post를 스크랩하고 저장합니다.
        postService.saveScrappedPost(postId);
        return ResponseEntity.status(HttpStatus.CREATED).body("Post 스크랩이 완료되었습니다.");
    }

    @GetMapping("/{postId}")
    public ResponseEntity<?> findPostById(@PathVariable Long postId) {
        PostResponseDto postResponseDto = postService.findPostById(postId);
        ResponseDto responseDto = new ResponseDto(success, "게시글을 조회했습니다.", Collections.singletonMap("post", postResponseDto));
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }
}
