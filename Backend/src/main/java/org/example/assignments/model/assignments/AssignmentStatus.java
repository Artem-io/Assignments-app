package org.example.assignments.model.assignments;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AssignmentStatus {
    PENDING("Pending"),
    SUBMITTED("Submitted"),
    IN_REVIEW("In Review"),
    NEEDS_UPDATE("Needs Update"),
    COMPLETED("Completed");

    private final String status;
}
