package org.example.assignments.service;
import lombok.RequiredArgsConstructor;
import org.example.assignments.model.assignments.Assignment;
import org.example.assignments.model.comments.Comment;
import org.example.assignments.model.comments.CommentDTO;
import org.example.assignments.model.users.User;
import org.example.assignments.repository.AssignmentRepository;
import org.example.assignments.repository.CommentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepo;
    private final AssignmentRepository assignmentRepo;

    public Page<Comment> getAllComments(UUID assignmentId, Pageable pageable) {
        return commentRepo.findByAssignmentId(assignmentId, pageable);
    }

    public Comment createComment(CommentDTO commentDTO, User user) {
        Comment comment = new Comment(commentDTO.id(),
                LocalDateTime.now(),
                commentDTO.text(), user,
                assignmentRepo.findById(commentDTO.assignmentId()).orElseThrow());

        return commentRepo.save(comment);
    }

    public void deleteComment(UUID id) {
        commentRepo.deleteById(id);
    }
}
