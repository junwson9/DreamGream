package com.ssafy.dreamgream.domain.post.service;

import com.ssafy.dreamgream.domain.member.service.MemberService;
import com.ssafy.dreamgream.domain.member.service.MemberServiceImpl;
import com.ssafy.dreamgream.domain.post.dto.request.PostUpdateRequestDto;
import com.ssafy.dreamgream.domain.post.dto.response.PostListResponseDto;
import com.ssafy.dreamgream.domain.post.dto.response.PostResponseDto;
import com.ssafy.dreamgream.domain.post.entity.Post;
import com.ssafy.dreamgream.domain.post.repository.PostRepository;
import com.ssafy.dreamgream.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final MemberService memberService;

    @Transactional
    public PostUpdateRequestDto updatePostPartially(Long postId, PostUpdateRequestDto postUpdateRequestDto){
        Post existingPost = postRepository.findById(postId).orElse(null);

        if(existingPost == null) {
            //예외처리
            return null;
        }else{
            Optional.ofNullable(postUpdateRequestDto.getAchievedDate()).ifPresent(existingPost::setAchievedDate);
            Optional.ofNullable(postUpdateRequestDto.getAchievementContent()).ifPresent(existingPost::setAchievementContent);
            Optional.ofNullable(postUpdateRequestDto.getAchievementImg()).ifPresent(existingPost::setAchievementImg);
            Optional.ofNullable(postUpdateRequestDto.getAiImg()).ifPresent(existingPost::setAiImg);
            Optional.ofNullable(postUpdateRequestDto.getCheerCnt()).ifPresent(existingPost::setCheerCnt);
            Optional.ofNullable(postUpdateRequestDto.getContent()).ifPresent(existingPost::setContent);
            Optional.ofNullable(postUpdateRequestDto.getDeadline()).ifPresent(existingPost::setDeadline);
            Optional.ofNullable(postUpdateRequestDto.getIsAchieved()).ifPresent(existingPost::setIsAchieved);
            Optional.ofNullable(postUpdateRequestDto.getIsDisplay()).ifPresent(existingPost::setIsDisplay);
            existingPost.setModifiedDate(LocalDateTime.now());
        }
        existingPost = postRepository.save(existingPost);
        return convertToDto(existingPost);
    }
    private PostUpdateRequestDto convertToDto(Post post){
        PostUpdateRequestDto postUpdateRequestDto = new PostUpdateRequestDto();
        BeanUtils.copyProperties(post,postUpdateRequestDto);
        return postUpdateRequestDto;
    }


    public Slice<PostListResponseDto> findPublicPosts(Long categoryId, Boolean isAchieved, Long lastPostId, Pageable pageable) {
        return postRepository.findPublicPostsByAchievedStatus(categoryId, isAchieved, lastPostId, pageable);
    }


    public Map<String, List<PostListResponseDto>> findPublicPostsByMember(Long memberId) {
        //TODO 존재하지 않는 memberId 예외 처리

        Map<String, List<PostListResponseDto>> resultMap = postRepository.findPublicPostsByMember(memberId);
        return resultMap;
    }


    public Map<String, List<PostListResponseDto>> findMyPosts() {
        Long memberId = memberService.getCurrentMemberId();
        log.info("currentMemberId: {}", memberId);

        Map<String, List<PostListResponseDto>> resultMap = postRepository.findPostsByMember(memberId);
        return resultMap;
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

        return new PostResponseDto(post);
    }


    public void deletePost(Long postId) {
        postRepository.deleteById(postId);
    }

    @Transactional
    public void saveScrappedPost(Long post_id) {
        Member currentMember = memberService.getCurrentMember();

        log.info(String.valueOf(currentMember.getMemberId()));
        log.info(String.valueOf(post_id));
        if (currentMember != null) {
            // 현재 사용자가 로그인 상태인 경우에만 스크랩을 진행합니다.

            // postId를 이용하여 데이터베이스에서 해당 Post를 찾아옵니다.
            Post existingPost = postRepository.findById(post_id).orElse(null);
            if (existingPost != null) {
                Post newPost = new Post();
                newPost.setTitle(existingPost.getTitle());
                newPost.setContent(existingPost.getContent());
                newPost.updateMember(currentMember);
                postRepository.save(newPost);
            } else {
                // TODO: 예외처리 - 해당 Post가 존재하지 않는 경우
            }
        } else {
            // TODO: 예외처리 - 인증되지 않은 사용자인 경우
        }
    }

}