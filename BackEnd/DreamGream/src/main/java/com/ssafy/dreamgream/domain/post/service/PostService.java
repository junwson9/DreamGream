package com.ssafy.dreamgream.domain.post.service;

import com.ssafy.dreamgream.domain.member.entity.Member;
import com.ssafy.dreamgream.domain.member.repository.MemberRepository;
import com.ssafy.dreamgream.domain.member.service.MemberService;
import com.ssafy.dreamgream.domain.post.dto.request.AchievedPostUpdateRequestDto;
import com.ssafy.dreamgream.domain.post.dto.request.PostRequestDto;
import com.ssafy.dreamgream.domain.post.dto.request.UnAchievedPostUpdateRequestDto;
import com.ssafy.dreamgream.domain.post.dto.response.PostListResponseDto;
import com.ssafy.dreamgream.domain.post.dto.response.PostResponseDto;
import com.ssafy.dreamgream.domain.post.entity.Category;
import com.ssafy.dreamgream.domain.post.entity.Post;
import com.ssafy.dreamgream.domain.post.repository.CategoryRepository;
import com.ssafy.dreamgream.domain.post.repository.PostRepository;
import com.ssafy.dreamgream.global.common.exception.ErrorCode;
import com.ssafy.dreamgream.global.common.exception.customException.MemberNotFoundException;
import com.ssafy.dreamgream.global.common.exception.customException.NotAuthorizedToPostException;
import com.ssafy.dreamgream.global.common.exception.customException.PostNotFoundException;
import com.ssafy.dreamgream.global.s3.S3Uploader;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;
    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final CategoryService categoryService;
    private final ModelMapper modelMapper;
    private final S3Uploader s3Uploader;
    private final RedisTemplate<String, String> redisTemplate;

    @Transactional
    public void savePost(PostRequestDto postRequestDto) {
        Member currentMember = memberService.getCurrentMember();

        Post post = Post.builder()
                .member(currentMember)
                .category(categoryService.getCategory(postRequestDto.getCategoryId()))
                .title(postRequestDto.getTitle())
                .content(postRequestDto.getContent())
                .aiImg(postRequestDto.getAiImg())
                .isAchieved(false)
                .build();

        postRepository.save(post);
    }

    @Transactional
    public Post unAchievedPostUpdate(Long postId, UnAchievedPostUpdateRequestDto unAchievedPostUpdateDto) {
        Long memberId = memberService.getCurrentMemberId();

        // post가 존재하는 지 확인.
        Post post = postRepository.findById(postId)
            .orElseThrow(() -> new PostNotFoundException("PostNotFoundException", ErrorCode.POST_NOT_FOUND));
        Long postMemberId = post.getMember().getMemberId();

        if (memberId != postMemberId) {
            throw new NotAuthorizedToPostException("본인이 작성한 게시글이 아님", ErrorCode.NOT_AUTHORIZED_TO_POST);
        } else {
            modelMapper.map(unAchievedPostUpdateDto, post);
            Category category = categoryRepository.findById(unAchievedPostUpdateDto.getCategoryId())
                    .orElseThrow();
            post.setCategory(category);
            postRepository.save(post);
            log.info(post.toString());
            return post;
        }
    }

    @Transactional
    public Post achievedPostUpdate(Long postId, AchievedPostUpdateRequestDto achievedPostUpdateRequestDto, MultipartFile file) {
        Long memberId = memberService.getCurrentMemberId();

        // post가 존재하는 지 확인.
        Post post = postRepository.findById(postId)
            .orElseThrow(() -> new PostNotFoundException("PostNotFoundException", ErrorCode.POST_NOT_FOUND));
        Long postMemberId = post.getMember().getMemberId();

        if (memberId != postMemberId) {
            throw new NotAuthorizedToPostException("본인이 작성한 게시글이 아님", ErrorCode.NOT_AUTHORIZED_TO_POST);
        } else {
            modelMapper.map(achievedPostUpdateRequestDto, post);
            Category category = categoryRepository.findById(achievedPostUpdateRequestDto.getCategoryId())
                    .orElseThrow();
            post.setCategory(category);
            if (achievedPostUpdateRequestDto.getImgUpdateFlag() && file.isEmpty()) {
                // 기존의 사진 파일 지우고 새로운 사진을 올리지 않았을 경우
                post.setAchievementImg(null);
            } else if (achievedPostUpdateRequestDto.getImgUpdateFlag() == true && !file.isEmpty()) {
                // 기존의 사진 파일 지우고 새로운 사진을 올릴 경우, S3 거쳐서 이미지 url 저장
                String imageUrl = s3Uploader.getImageUrl("post", file, memberId);
                post.setAchievementImg(imageUrl);
            } else {
                // 사진관련 변경사항 없을 경우
            }
            postRepository.save(post);
            return post;
        }
    }


    //== 리스트 조회, 게시글 조회 ==//

    public Slice<PostListResponseDto> findAchievedPosts(Boolean loginFlag, Long categoryId, Boolean isAchieved, Long lastPostId, Pageable pageable) {
        log.info("달성완료 피드 조회 시작");

        Post lastPost = null;

        if(lastPostId != null) {
            log.info("lasPostId가 있음");
            lastPost = postRepository.findById(lastPostId)
                .orElseThrow(() -> new PostNotFoundException("PostNotFoundException", ErrorCode.POST_NOT_FOUND));
        }

        Slice<PostListResponseDto> results = postRepository.findPublicPostsByAchievedStatus(categoryId, isAchieved, lastPost, pageable);

        // Slice<PostListResponseDto>에서 postId 값 추출
        List<PostListResponseDto> postList = results.getContent();

        // postId에 대해 Redis에서 바로 조회
        for (PostListResponseDto post : postList) {
            String postId = "celebrate_post_" + post.getPostId();
            Long celebrateCnt = redisTemplate.opsForSet().size(postId);
            post.updateCelebrateCnt(celebrateCnt);

            // 로그인 상태면 축하 여부 업데이트
            if(loginFlag) {
                Long memberId = memberService.getCurrentMemberId();
                Boolean isCelebrated = redisTemplate.opsForSet().isMember(postId, memberId.toString());
                post.updateIsCelebrated(isCelebrated);
            }
        }
        return results;
    }


    public Slice<PostListResponseDto> findNotAchievedPosts(Boolean loginFlag, Long categoryId, Boolean isAchieved, Long lastPostId, Pageable pageable) {
        log.info("달성중 피드 조회 시작");

        Post lastPost = null;

        if(lastPostId != null) {
            log.info("lasPostId가 있음");
            lastPost = postRepository.findById(lastPostId)
                .orElseThrow(() -> new PostNotFoundException("PostNotFoundException", ErrorCode.POST_NOT_FOUND));
        }

        Slice<PostListResponseDto> results = postRepository.findPublicPostsByAchievedStatus(categoryId, isAchieved, lastPost, pageable);

        // Slice<PostListResponseDto>에서 postId 값 추출
        List<PostListResponseDto> postList = results.getContent();

        // postId에 대해 Redis에서 바로 조회
        for (PostListResponseDto post : postList) {
            String postId = "cheer_post_" + post.getPostId();
            Long cheerCnt = redisTemplate.opsForSet().size(postId);
            post.updateCheerCnt(cheerCnt);

            // 로그인 상태면 응원 여부 업데이트
            if(loginFlag) {
                Long memberId = memberService.getCurrentMemberId();
                Boolean isCelebrated = redisTemplate.opsForSet().isMember(postId, memberId.toString());
                post.updateIsCelebrated(isCelebrated);
            }
        }
        return results;
    }


    public Map<String, List<PostListResponseDto>> findPublicPostsByMember(Long memberId) {
        // 존재하지 않는 memberId 예외 처리
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberNotFoundException("존재하지 않는 회원", ErrorCode.MEMBER_NOT_FOUND));

        Map<String, List<PostListResponseDto>> resultMap = postRepository.findPublicPostsByMember(memberId);
        return getRedisCntMap(resultMap);
    }


    public Map<String, List<PostListResponseDto>> findMyPosts() {
        Long memberId = memberService.getCurrentMemberId();
        Map<String, List<PostListResponseDto>> resultMap = postRepository.findPostsByMember(memberId);
        return getRedisCntMap(resultMap);
    }


    // redis에서 좋아요 개수 받아와 resultMap 업데이트
    private Map<String, List<PostListResponseDto>> getRedisCntMap(Map<String, List<PostListResponseDto>> resultMap) {
        List<PostListResponseDto> postList = resultMap.get("post_list");
        List<PostListResponseDto> achievedPostList = resultMap.get("achieved_post_list");
        getRedisCheerAndCelebrateCount(postList);
        getRedisCheerAndCelebrateCount(achievedPostList);
        return resultMap;
    }


    private void getRedisCheerAndCelebrateCount(List<PostListResponseDto> postList) {
        for (PostListResponseDto post : postList) {
            Long cheerCnt = getRedisSetCount("cheer_post_" + post.getPostId());
            Long celebrateCnt = getRedisSetCount("celebrate_post_" + post.getPostId());
            post.updateCheerAndCelebrateCnt(cheerCnt, celebrateCnt);
        }
    }


    private Long getRedisSetCount(String key) {
        Set<String> values = redisTemplate.opsForSet().members(key);
        return values != null ? values.size() : 0L;
    }


    public PostResponseDto findPostById(Boolean loginFlag, Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new PostNotFoundException("PostNotFoundException", ErrorCode.POST_NOT_FOUND));

        // 로그인 상태인 경우 memberId 가져오기
        Long memberId = null;
        if(loginFlag) {
            memberId = memberService.getCurrentMemberId();
        }

        // isDisplay = false 인데 작성자 본인이 아닌 경우
        if (!post.getIsDisplay()) {
            if (memberId == null || !memberId.equals(post.getMember().getMemberId())) {
                throw new NotAuthorizedToPostException("본인이 작성한 게시글이 아님", ErrorCode.NOT_AUTHORIZED_TO_POST);
            }
        }

        // 좋아요 개수 업데이트 
        String cheerPostId = "cheer_post_" + post.getPostId();
        String celebratePostId = "celebrate_post_" + post.getPostId();
        Long cheerCnt = getRedisSetCount(cheerPostId);
        Long celebrateCnt = getRedisSetCount(celebratePostId);
        post.updateCheerAndCelebrateCnt(cheerCnt, celebrateCnt);

        PostResponseDto postDto = new PostResponseDto(post);

        // 로그인 상태면 좋아요 여부 업데이트
        if (memberId != null) {
            Boolean isCheered = redisTemplate.opsForSet().isMember(cheerPostId, memberId.toString());
            Boolean isCelebrated = redisTemplate.opsForSet().isMember(celebratePostId, memberId.toString());
            postDto.updateIsCheeredAndIsCelebrated(isCheered, isCelebrated);
        }

        return postDto;
    }


    public List<PostListResponseDto> findBestPostsByAchievedStatus(Long categoryId, boolean isAchieved) {
        List<PostListResponseDto> postList = postRepository.findBestPostsByAchievedStatus(categoryId, isAchieved);
        return postList;
    }
    //== 리스트 조회, 게시글 조회 끝 ==//


    //게시글 삭제 기능
    @Transactional
    public void deletePost(Long postId) {
        Long memberId = memberService.getCurrentMemberId();

        // post가 존재하는 지 확인.
        Post post = postRepository.findById(postId)
            .orElseThrow(() -> new PostNotFoundException("PostNotFoundException", ErrorCode.POST_NOT_FOUND));
        Long postMemberId = post.getMember().getMemberId();

        if (memberId != postMemberId) {
            throw new NotAuthorizedToPostException("본인이 작성한 게시글이 아님", ErrorCode.NOT_AUTHORIZED_TO_POST);
        }

        String keyCheer = "cheer_post_" + String.valueOf(postId);
        Set<String> cheer_members = redisTemplate.opsForSet().members(keyCheer);
        for (String member : cheer_members) {
            String keyMember = "cheer_member_" + member;
            redisTemplate.opsForSet().remove(keyCheer, member);
            redisTemplate.opsForSet().remove(keyMember, String.valueOf(postId));
        }
        String keyCelebrate = "celebrate_post_" + String.valueOf(postId);
        Set<String> celebrate_members = redisTemplate.opsForSet().members(keyCelebrate);
        for (String member : celebrate_members) {
            String keyMember = "celebrate_member_" + member;
            redisTemplate.opsForSet().remove(keyCelebrate, member);
            redisTemplate.opsForSet().remove(keyMember, String.valueOf(postId));
        }
        postRepository.deleteById(postId);
    }

    @Transactional
    public void saveScrappedPost(Long postId) {
        Member currentMember = memberService.getCurrentMember();

        Post existingPost = postRepository.findById(postId)
            .orElseThrow(() -> new PostNotFoundException("PostNotFoundException", ErrorCode.POST_NOT_FOUND));

        Post scrapPost = Post.builder()
                .title(existingPost.getTitle())
                .content(existingPost.getContent())
                .deadLine(existingPost.getDeadLine())
                .isDisplay(existingPost.getIsDisplay())
                .isAchieved(existingPost.getIsAchieved())
                .achievementContent(existingPost.getAchievementContent())
                .achievedDate(existingPost.getAchievedDate())
                .aiImg(existingPost.getAiImg())
                .achievementImg(existingPost.getAchievementImg())
                .modifiedDate(LocalDateTime.now())
                .category(existingPost.getCategory())
                .member(currentMember)
                .build();
        postRepository.save(scrapPost);
    }
}