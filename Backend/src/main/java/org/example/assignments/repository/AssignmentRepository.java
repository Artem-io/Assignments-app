package org.example.assignments.repository;
import org.example.assignments.model.assignments.Assignment;
import org.example.assignments.model.users.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;
import java.util.UUID;

public interface AssignmentRepository extends JpaRepository<Assignment, UUID> {
    Page<Assignment> findByUser(User user, Pageable pageable);

    @Query("SELECT a FROM Assignment a WHERE (a.status = 'SUBMITTED' OR a.status = 'IN_REVIEW') " +
            "OR a.teacher = :teacher")
    Page<Assignment> findByTeacher(User teacher, Pageable pageable);
}
