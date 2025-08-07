package org.example.assignments.model.assignments;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "assignmentNames")
public class AssignmentName {
    @Id
    private String name;

    @Column(name = "`order`")
    private int order;
}
