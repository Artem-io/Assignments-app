package org.example.assignments.controller;
import lombok.RequiredArgsConstructor;
import org.example.assignments.model.assignments.AssignmentName;
import org.example.assignments.service.AssignmentNamesService;
import org.example.assignments.service.AssignmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/assignmentNames")
public class AssignmentNameController {
    private final AssignmentNamesService assignmentNamesService;

    @GetMapping
    public ResponseEntity<List<AssignmentName>> getAllAssignmentNames() {
        return ResponseEntity.ok(assignmentNamesService.getAllAssignmentNames());
    }

    @PostMapping
    public ResponseEntity<List<AssignmentName>> createAssignmentName(@RequestBody List<AssignmentName> assignmentNames) {
        return ResponseEntity.ok(assignmentNamesService.createAssignmentName(assignmentNames));
    }
}
