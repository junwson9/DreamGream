package com.ssafy.dreamgream.domain.post.repository;

import com.ssafy.dreamgream.domain.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long>, PostQueryDslRepository {

}
