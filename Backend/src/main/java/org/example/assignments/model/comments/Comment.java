package org.example.assignments.model.comments;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.assignments.model.assignments.Assignment;
import org.example.assignments.model.users.User;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "comments")
public class Comment
{
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private LocalDateTime creationTime;

    @Column(columnDefinition = "TEXT")
    private String text;

    @ManyToOne @JoinColumn(name = "user_id")
    private User createdBy;

    @ManyToOne @JoinColumn(name = "assignment_id")
    private Assignment assignment;
}
