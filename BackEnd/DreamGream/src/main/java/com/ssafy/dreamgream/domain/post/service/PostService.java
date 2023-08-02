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

    public void deletePost(Long postId) {
        postRepository.deleteById(postId);
    }

}