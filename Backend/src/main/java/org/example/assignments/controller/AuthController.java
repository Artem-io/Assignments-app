package org.example.assignments.controller;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.example.assignments.model.users.User;
import org.example.assignments.service.JwtService;
import org.example.assignments.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController
{
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @PostMapping("register")
    public User register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("login")
    public String login(@RequestBody User user) {
        Authentication authentication = authenticationManager.authenticate
                (new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

        user = (User) authentication.getPrincipal();

        if(!authentication.isAuthenticated()) return "Failed";
        return jwtService.generateToken(user);
    }

    @GetMapping("validate")
    public ResponseEntity<Boolean> validateToken(@RequestParam String token, @AuthenticationPrincipal User user) {
        try {
            Boolean isValid = jwtService.validateToken(token, user);
            return ResponseEntity.ok(isValid);
        }
        catch (ExpiredJwtException e) {
            return ResponseEntity.ok(false);
        }
    }
}
