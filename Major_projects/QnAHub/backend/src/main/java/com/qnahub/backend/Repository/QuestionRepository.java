package com.qnahub.backend.Repository;

import com.qnahub.backend.Entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByAuthorId(Long authorId);
}

