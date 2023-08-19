package com.chicha.ToDoList.Logout;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Enumeration;

@RestController
@RequestMapping("/api")
public class LogoutController {
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, @RequestHeader(HttpHeaders.AUTHORIZATION) String auth) throws ServletException {
        SecurityContextHolder.getContext().setAuthentication(null);
        SecurityContextHolder.clearContext();
        HttpSession hs = request.getSession();
        Enumeration e = hs.getAttributeNames();
        while (e.hasMoreElements()) {
            String attr = (String) e.nextElement();
            hs.setAttribute(attr, null);
        }
        removeCookies(request);
        hs.invalidate();
        return ResponseEntity.ok("Logged out successfully");
    }
    public static void removeCookies(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null && cookies.length > 0) {
            for (int i = 0; i < cookies.length; i++) {
                cookies[i].setMaxAge(0);
            }
        }
    }

}