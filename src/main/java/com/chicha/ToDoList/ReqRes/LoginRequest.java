package com.chicha.ToDoList.ReqRes;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
