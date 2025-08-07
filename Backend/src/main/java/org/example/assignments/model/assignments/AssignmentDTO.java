package org.example.assignments.model.assignments;
import org.example.assignments.model.users.UserDTO;

import java.util.UUID;

public record AssignmentDTO(
        UUID id,
        String status,
        String name,
        String githubURL,
        String branch,
        String reviewVideoURL,
        UserDTO user,
        UserDTO teacher
) {}
