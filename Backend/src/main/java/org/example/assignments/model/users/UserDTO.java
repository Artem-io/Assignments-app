package org.example.assignments.model.users;

import java.time.LocalDate;
import java.util.Set;
import java.util.UUID;

public record UserDTO(
        UUID id,
        String username,
        LocalDate cohortStartDate,
        Set<Role> roles
) {}
