package com.ssafy.dreamgream.domain.post.service;

import com.ssafy.dreamgream.domain.post.dto.request.PostRequestDto;
import com.ssafy.dreamgream.domain.post.dto.request.PostUpdateRequestDto;
import com.ssafy.dreamgream.domain.post.entity.Post;
import com.ssafy.dreamgream.domain.post.repository.PostRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.sql.Date;
import java.time.LocalDateTime;
import java.util.Optional;
//import java.util.Date;

@Service
public class PostService {

    private PostRepository postRepository;
    @Autowired
    public PostService(PostRepository postRepository){
        this.postRepository = postRepository;
    }

    @Transactional
    public PostUpdateRequestDto updatePostPartially(Long postId, PostUpdateRequestDto requestDto){
        Post existingPost = postRepository.findById(postId).orElse(null);

        if(existingPost == null) {
            //예외처리
            return null;
        }else{
            Optional.ofNullable(requestDto.getAchievedDate()).ifPresent(existingPost::setAchievedDate);
            Optional.ofNullable(requestDto.getAchievementContent()).ifPresent(existingPost::setAchievementContent);
            Optional.ofNullable(requestDto.getAchievementImg()).ifPresent(existingPost::setAchievementImg);
            Optional.ofNullable(requestDto.getAiImg()).ifPresent(existingPost::setAiImg);
            Optional.ofNullable(requestDto.getCheerCnt()).ifPresent(existingPost::setCheerCnt);
            Optional.ofNullable(requestDto.getContent()).ifPresent(existingPost::setContent);
            Optional.ofNullable(requestDto.getDeadline()).ifPresent(existingPost::setDeadline);
            Optional.ofNullable(requestDto.getIsAchieved()).ifPresent(existingPost::setIsAchieved);
            Optional.ofNullable(requestDto.getIsDisplay()).ifPresent(existingPost::setIsDisplay);
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
}
