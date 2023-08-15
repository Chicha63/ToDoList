package com.chicha.ToDoList.UserStuff;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    public void updatePassword(ObjectId user_id, String password) throws Exception {
        User user = userRepository.findById(user_id)
                .orElseThrow(()-> new Exception("User not found!"));
        user.setPassword(PasswordEncoderFactories.createDelegatingPasswordEncoder().encode(password));
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(()->new UsernameNotFoundException("User not found with this email "+username));
        return UserDetailsImpl.build(user);
    }
}
