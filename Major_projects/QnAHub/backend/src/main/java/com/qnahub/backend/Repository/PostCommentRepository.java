package com.qnahub.backend.Repository;


import com.qnahub.backend.Entity.PostComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostCommentRepository extends JpaRepository<PostComment, Long> {
}
