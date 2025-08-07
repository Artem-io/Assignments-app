package org.example.assignments.service;
import lombok.RequiredArgsConstructor;
import org.example.assignments.model.assignments.AssignmentName;
import org.example.assignments.repository.AssignmentNamesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AssignmentNamesService {
    private final AssignmentNamesRepository assignmentNamesRepo;

    public List<AssignmentName> getAllAssignmentNames() {
        return assignmentNamesRepo.findAll();
    }

    public List<AssignmentName> createAssignmentName(List<AssignmentName> assignmentNames) {
        return assignmentNamesRepo.saveAll(assignmentNames);
    }
}
