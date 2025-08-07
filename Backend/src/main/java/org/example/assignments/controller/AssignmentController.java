package org.example.assignments.controller;
import lombok.RequiredArgsConstructor;
import org.example.assignments.model.assignments.Assignment;
import org.example.assignments.model.assignments.AssignmentDTO;
import org.example.assignments.model.users.User;
import org.example.assignments.service.AssignmentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/assignments")
public class AssignmentController
{
    private final AssignmentService assignmentService;

    @PostMapping
    public ResponseEntity<AssignmentDTO> createAssignment(@RequestBody Assignment assignment, @AuthenticationPrincipal User user) {
        AssignmentDTO newAssignment = assignmentService.createAssignment(user, assignment);
        return ResponseEntity.ok(newAssignment);
    }

    @PutMapping("{id}")
    public ResponseEntity<AssignmentDTO> updateAssignment(@RequestBody Assignment assignment, @AuthenticationPrincipal User user) {
        AssignmentDTO updatedAssignment = assignmentService.updateAssignment(user, assignment);
        return ResponseEntity.ok(updatedAssignment);
    }

    @GetMapping
    public ResponseEntity<Page<AssignmentDTO>> getAllAssignments(@AuthenticationPrincipal User user,
                                                                  @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(assignmentService.getAllAssignments(user, pageable));
    }

    @GetMapping("{id}")
    public ResponseEntity<AssignmentDTO> getAssignment(@PathVariable("id") UUID id) {
        AssignmentDTO assignment = assignmentService.getAssignment(id);
        if(assignment == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(assignment);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteAssignment(@PathVariable("id") UUID id) {
        assignmentService.deleteAssignment(id);
        return ResponseEntity.ok().build();
    }
}
