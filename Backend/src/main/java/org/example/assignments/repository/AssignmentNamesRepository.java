package org.example.assignments.repository;
import org.example.assignments.model.assignments.AssignmentName;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface AssignmentNamesRepository extends JpaRepository<AssignmentName, String> {
}
