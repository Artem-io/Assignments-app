package org.example.assignments.repository;
import org.example.assignments.model.comments.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface CommentRepository extends JpaRepository<Comment, UUID> {

    @Query("SELECT c FROM Comment c WHERE c.assignment.id = :assignmentId")
    Page<Comment> findByAssignmentId(UUID assignmentId, Pageable pageable);
}
