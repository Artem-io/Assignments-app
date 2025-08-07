package org.example.assignments.controller;
import lombok.RequiredArgsConstructor;
import org.example.assignments.model.comments.Comment;
import org.example.assignments.model.comments.CommentDTO;
import org.example.assignments.model.users.User;
import org.example.assignments.service.CommentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comments")
public class CommentController {
    private final CommentService commentService;

    @GetMapping
    public ResponseEntity<Page<Comment>> getAllComments(@RequestParam UUID assignmentId) {
        Sort sort = Sort.by("creationTime").descending();
        Pageable pageable = PageRequest.of(0, 20, sort);
        return ResponseEntity.ok(commentService.getAllComments(assignmentId, pageable));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteComment(@PathVariable("id") UUID id) {
        try {
            commentService.deleteComment(id);
            return ResponseEntity.ok().build();
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody CommentDTO comment, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(commentService.createComment(comment, user));
    }
}
