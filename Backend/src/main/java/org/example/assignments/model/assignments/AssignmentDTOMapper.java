package org.example.assignments.model.assignments;
import org.example.assignments.model.users.UserDTOMapper;
import org.springframework.stereotype.Service;
import java.util.function.Function;

@Service
public class AssignmentDTOMapper implements Function<Assignment, AssignmentDTO> {
    @Override
    public AssignmentDTO apply(Assignment assignment) {
        return new AssignmentDTO(
                assignment.getId(),
                assignment.getStatus().getStatus(),
                assignment.getName(),
                assignment.getGithubURL(),
                assignment.getBranch(),
                assignment.getReviewVideoURL(),
                new UserDTOMapper().apply(assignment.getUser()),
                new UserDTOMapper().apply(assignment.getTeacher())
                );
    }
}
