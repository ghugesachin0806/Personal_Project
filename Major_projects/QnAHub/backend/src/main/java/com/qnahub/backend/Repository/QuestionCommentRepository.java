package com.qnahub.backend.Repository;

import com.qnahub.backend.Entity.QuestionComment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QuestionCommentRepository extends JpaRepository<QuestionComment, Long> {
    List<QuestionComment> findByQuestionId(Long questionId);
}
