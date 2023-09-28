package com.chicha.ToDoList.Security;


import com.chicha.ToDoList.Jwt.JwtUtil;
import com.chicha.ToDoList.ReqRes.JwtResponse;
import com.chicha.ToDoList.ReqRes.LoginRequest;
import com.chicha.ToDoList.ReqRes.MessageResponse;
import com.chicha.ToDoList.ReqRes.SignupRequest;
import com.chicha.ToDoList.UserStuff.User;
import com.chicha.ToDoList.UserStuff.UserDetailsImpl;
import com.chicha.ToDoList.UserStuff.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.signIn(loginRequest));
    }
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {
       return authService.signUp(signUpRequest);
    }

}
