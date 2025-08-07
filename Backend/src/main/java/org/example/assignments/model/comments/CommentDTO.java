package org.example.assignments.model.comments;
import org.example.assignments.model.assignments.Assignment;

import java.util.UUID;

public record CommentDTO (
        UUID id,
        UUID assignmentId,
        String text
){}