package com.chicha.ToDoList.ReqRes;

import lombok.Data;

@Data
public class SignupRequest {
    private String email;
    private String password;
}
