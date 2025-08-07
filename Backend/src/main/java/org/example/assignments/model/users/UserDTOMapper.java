package org.example.assignments.model.users;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class UserDTOMapper implements Function<User, UserDTO> {
    @Override
    public UserDTO apply(User user) {
        if (user == null) return null;
        return new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getCohortStartDate(),
                user.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .map(Role::valueOf)
                        .collect(Collectors.toSet())
        );
    }
}
