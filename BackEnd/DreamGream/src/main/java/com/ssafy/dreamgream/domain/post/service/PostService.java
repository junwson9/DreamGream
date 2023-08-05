package com.ssafy.dreamgream.domain.post.service;

import com.ssafy.dreamgream.domain.member.service.MemberService;
import com.ssafy.dreamgream.domain.member.service.MemberServiceImpl;
import com.ssafy.dreamgream.domain.post.dto.request.AchievedPostUpdateRequestDto;
import com.ssafy.dreamgream.domain.post.dto.request.PostUpdateRequestDto;
import com.ssafy.dreamgream.domain.post.dto.request.UnAchievedPostUpdateRequestDto;
import com.ssafy.dreamgream.domain.post.dto.response.PostListResponseDto;
import com.ssafy.dreamgream.domain.post.dto.response.PostResponseDto;
import com.ssafy.dreamgream.domain.post.entity.Post;
import com.ssafy.dreamgream.domain.post.repository.PostRepository;
import com.ssafy.dreamgream.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;
import org.springframework.web.multipart.MultipartFile;

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
    private final ModelMapper modelMapper;

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
            if (achievedPostUpdateRequestDto.getImgUpdateFlag()==Boolean.TRUE && file.isEmpty()){
                toupdatepost.setAchievementImg(null);
            } else if (achievedPostUpdateRequestDto.getImgUpdateFlag()==Boolean.TRUE && !file.isEmpty()) {
                //여기에 받은 이미지 multipartfile => url 바꾸는 로직 들어가야할듯
                toupdatepost.setAchievementImg("수정되라");
            } else {
                return null;
            }
            postRepository.save(toupdatepost);
            return toupdatepost;
        }
    }

    public PostUpdateRequestDto updatePostPartially(Long postId, PostUpdateRequestDto postUpdateRequestDto){
        Post existingPost = postRepository.findById(postId).orElse(null);

        if(existingPost == null) {
            //예외처리
            return null;
        }else{
            Optional.ofNullable(postUpdateRequestDto.getAchievedDate()).ifPresent(existingPost::setAchievedDate);
            Optional.ofNullable(postUpdateRequestDto.getAchievementcontent()).ifPresent(existingPost::setAchievementContent);
            Optional.ofNullable(postUpdateRequestDto.getAchievementimg()).ifPresent(existingPost::setAchievementImg);
            Optional.ofNullable(postUpdateRequestDto.getAiimg()).ifPresent(existingPost::setAiImg);
            Optional.ofNullable(postUpdateRequestDto.getCheercnt()).ifPresent(existingPost::setCheerCnt);
            Optional.ofNullable(postUpdateRequestDto.getContent()).ifPresent(existingPost::setContent);
            Optional.ofNullable(postUpdateRequestDto.getDeadline()).ifPresent(existingPost::setDeadline);
            Optional.ofNullable(postUpdateRequestDto.getIsachieved()).ifPresent(existingPost::setIsAchieved);
            Optional.ofNullable(postUpdateRequestDto.getIsdisplay()).ifPresent(existingPost::setIsDisplay);
            existingPost.setModifiedDate(LocalDateTime.now());
        }

        PostUpdateRequestDto sadf = PostUpdateRequestDto.builder()
                .aiimg("sadf")
                .cheercnt(1L)
                .build();
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