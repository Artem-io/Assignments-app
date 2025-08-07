package org.example.assignments.service;
import lombok.RequiredArgsConstructor;
import org.example.assignments.model.assignments.Assignment;
import org.example.assignments.model.assignments.AssignmentDTO;
import org.example.assignments.model.assignments.AssignmentDTOMapper;
import org.example.assignments.model.assignments.AssignmentStatus;
import org.example.assignments.model.users.User;
import org.example.assignments.repository.AssignmentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AssignmentService
{
    private final AssignmentRepository assignmentRepo;
    private final AssignmentDTOMapper assignmentDTOMapper;

    public AssignmentDTO createAssignment(User user, Assignment assignment) {
        assignment.setUser(user);
        return assignmentDTOMapper.apply(assignmentRepo.save(assignment));
    }

    public AssignmentDTO getAssignment(UUID id) {
        return assignmentRepo.findById(id).map(assignmentDTOMapper).orElse(null);
    }
    public Page<AssignmentDTO> getAllAssignments(User user, Pageable pageable) {
        if (user.getAuthorities().toString().equals("[TEACHER]"))
            return assignmentRepo.findByTeacher(user, pageable).map(assignmentDTOMapper);

        return assignmentRepo.findByUser(user, pageable).map(assignmentDTOMapper);
    }

    public AssignmentDTO updateAssignment(User user, Assignment assignment) {
        assert assignment != null;

        if(user.getAuthorities().toString().equals("[TEACHER]") && assignment.getTeacher()==null)
            assignment.setTeacher(user);

        return assignmentDTOMapper.apply(assignmentRepo.save(assignment));
    }

    public void deleteAssignment(UUID id) {
        Assignment assignment = assignmentRepo.findById(id).orElseThrow();
        if (assignment.getStatus() != AssignmentStatus.SUBMITTED)
            throw new IllegalStateException("Cannot delete submitted or in review assignment");
        assignmentRepo.deleteById(id);
    }
}
