package com.chicha.ToDoList.Logout;
import com.chicha.ToDoList.Jwt.AuthTokenFilter;
import com.chicha.ToDoList.Jwt.JwtUtil;
import com.chicha.ToDoList.UserStuff.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Enumeration;

@RestController
@RequestMapping("/api")
public class LogoutController {
    @Autowired
    private JwtUtil jwtUtils;
    @Autowired
    private UserService userService;

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, @RequestHeader(HttpHeaders.AUTHORIZATION) String auth) throws ServletException {
        String jwt = null;
        String headerAuth = request.getHeader("Authorization");
        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            jwt = headerAuth.substring(7, headerAuth.length());
        }
        if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
            SecurityContextHolder.getContext().setAuthentication(null);
            System.out.println("Logged out");
            return ResponseEntity.ok("Logged out successfully");
        }
        return ResponseEntity.ok("Failed to log out");
    }


}