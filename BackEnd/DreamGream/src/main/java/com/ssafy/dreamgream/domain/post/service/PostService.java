package com.ssafy.dreamgream.domain.post.service;

import com.ssafy.dreamgream.domain.member.entity.Member;
import com.ssafy.dreamgream.domain.member.service.MemberService;
import com.ssafy.dreamgream.domain.post.dto.request.AchievedPostUpdateRequestDto;
import com.ssafy.dreamgream.domain.post.dto.request.UnAchievedPostUpdateRequestDto;
import com.ssafy.dreamgream.domain.post.dto.response.PostListResponseDto;
import com.ssafy.dreamgream.domain.post.dto.response.PostResponseDto;
import com.ssafy.dreamgream.domain.post.entity.Post;
import com.ssafy.dreamgream.domain.post.repository.PostRepository;
import com.ssafy.dreamgream.domain.member.entity.Member;
import com.ssafy.dreamgream.global.s3.S3Uploader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
@Slf4j
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final MemberService memberService;
    private final ModelMapper modelMapper;
    private final S3Uploader s3Uploader;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;


    public Post UnAchievedPostUpdateRequestDto(Long postId, UnAchievedPostUpdateRequestDto unAchievedPostUpdateDto) {
        Post updatedpost = postRepository.findById(postId).orElse(null);
        if (updatedpost == null) {
            return null;
        } else {
            modelMapper.map(unAchievedPostUpdateDto, updatedpost);
            postRepository.save(updatedpost);
            return updatedpost;
        }
    }

    public Post AchievedPostUpdate(Long postId, AchievedPostUpdateRequestDto achievedPostUpdateRequestDto, MultipartFile file){
        Post toupdatepost = postRepository.findById(postId).orElse(null);
        if(toupdatepost == null){
            return null;
        }else{
            modelMapper.map(achievedPostUpdateRequestDto,toupdatepost);
            if (achievedPostUpdateRequestDto.getImgUpdateFlag() && file.isEmpty()) {
                toupdatepost.setAchievementImg(null);
            } else if (achievedPostUpdateRequestDto.getImgUpdateFlag() == Boolean.TRUE && !file.isEmpty()) {
                Member currentMember = memberService.getCurrentMember();
                //여기에 받은 이미지 multipartfile => url 바꾸는 로직 들어가야할듯
                String imageUrl = s3Uploader.getImageUrl("post", file, currentMember.getMemberId());
                toupdatepost.setAchievementImg(imageUrl);
            } else {
                return null;
            }
            postRepository.save(toupdatepost);
            return toupdatepost;
        }
    }

    private PostUpdateRequestDto convertToDto(Post post){
        PostUpdateRequestDto postUpdateRequestDto = new PostUpdateRequestDto();
        BeanUtils.copyProperties(post,postUpdateRequestDto);
        return postUpdateRequestDto;
    }


    //== 리스트 조회, 게시글 조회 ==//

    public Slice<PostListResponseDto> findPublicPosts(Long categoryId, Boolean isAchieved, Long lastPostId, Pageable pageable) {
        Slice<PostListResponseDto> results = postRepository.findPublicPostsByAchievedStatus(categoryId, isAchieved, lastPostId, pageable);

        // Slice<PostListResponseDto>에서 postId 값 추출
        List<PostListResponseDto> postList = results.getContent();

        // redis에서 좋아요 개수 받아와 업데이트
        for (PostListResponseDto post : postList) {
            Long cheerCnt = getRedisSetCount("cheer_post_" + post.getPostId());
            Long celebrateCnt= getRedisSetCount("congrat_post_" + post.getPostId());
            post.updateCheerAndCelebrateCnt(cheerCnt, celebrateCnt);
        }

        return results;
    }

    public Map<String, List<PostListResponseDto>> findPublicPostsByMember(Long memberId) {
        //TODO 존재하지 않는 memberId 예외 처리

        Map<String, List<PostListResponseDto>> resultMap = postRepository.findPublicPostsByMember(memberId);
        return getRedisCntMap(resultMap);
    }

    public Map<String, List<PostListResponseDto>> findMyPosts() {
        Long memberId = memberService.getCurrentMemberId();
        log.info("currentMemberId: {}", memberId);

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
            Long celebrateCnt= getRedisSetCount("congrat_post_" + post.getPostId());
            post.updateCheerAndCelebrateCnt(cheerCnt, celebrateCnt);
        }
    }

    private Long getRedisSetCount(String key) {
        Set<String> values = redisTemplate.opsForSet().members(key);
        return values != null ? values.size() : 0L;
    }


    public PostResponseDto findPostById(Long postId) {
        // TODO 예외처리: postId 존재하지 않는 경우
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        if(!post.getIsDisplay()) {
            if(!memberService.getCurrentMemberId().equals(post.getMember().getMemberId())) {
                // TODO 예외처리 : isDisplay = false 인데 작성자 본인이 아닌 경우
                return null;
            }
        }

        Long cheerCnt = getRedisSetCount("cheer_post_" + postId);
        Long celebrateCnt = getRedisSetCount("congrat_post_" + postId);
        post.updateCheerAndCelebrateCnt(cheerCnt, celebrateCnt);

        return new PostResponseDto(post);
    }


    public List<PostListResponseDto> findBestPostsByAchievedStatus(Long categoryId, boolean isAchieved) {
        List<PostListResponseDto> postList = postRepository.findBestPostsByAchievedStatus(categoryId, isAchieved);
        return postList;
    }
    //== 리스트 조회, 게시글 조회 끝 ==//

    public void deletePost(Long postId) {
        Member currentMember = memberService.getCurrentMember();
        String memberId = String.valueOf(currentMember.getMemberId());
        String postMemberId = String.valueOf(postRepository.findById(postId).get().getMember());
        if(memberId != postMemberId){
            // TODO: 수정 권한이 없을 경우 예외 처리
        } else{
            String cheer_key = "cheer_post_" + String.valueOf(postId);
            Set<String> cheer_members = redisTemplate.opsForSet().members(cheer_key);
            for(String member : cheer_members){
                String keyMember = "member_"+member;
                redisTemplate.opsForSet().remove(cheer_key,member);
                redisTemplate.opsForSet().remove(keyMember,String.valueOf(postId));
            }
            String congrat_key = "congrat_post_" + String.valueOf(postId);
            Set<String> congrat_members = redisTemplate.opsForSet().members(congrat_key);
            for(String member : congrat_members){
                String keyMember = "member_"+member;
                redisTemplate.opsForSet().remove(congrat_key,member);
                redisTemplate.opsForSet().remove(keyMember,String.valueOf(postId));
            }
            postRepository.deleteById(postId);
        }

    }

    @Transactional
    public void saveScrappedPost(Long postId) {
        Member currentMember = memberService.getCurrentMember();
        if (currentMember != null) {
            Post existingPost = postRepository.findById(postId).orElse(null);
            if (existingPost != null) {
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
                        .modifiedDate(existingPost.getModifiedDate())
                        .category(existingPost.getCategory())
                        .member(currentMember)
                        .build();
                postRepository.save(scrapPost);
            } else {
                // TODO: 예외처리 - 해당 Post가 존재하지 않는 경우
            }
        } else {
            // TODO: 예외처리 - 인증되지 않은 사용자인 경우
        }
    }



}