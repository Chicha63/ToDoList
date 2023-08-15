package com.chicha.ToDoList.ReqRes;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class JwtResponse {
    private String token;
    private String type;
    private String email;
}
