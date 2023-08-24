package com.chicha.ToDoList.TaskStuff;

import com.chicha.ToDoList.Security.AuthController;
import com.chicha.ToDoList.UserStuff.UserDetailsImpl;
import jakarta.servlet.http.HttpServletRequest;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    @Autowired
    private TaskService taskService;
    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks(){
        return new ResponseEntity<List<Task>>(taskService.allTasks(), HttpStatus.OK);
    }
    @GetMapping("/get")
    public ResponseEntity<Optional<List<Task>>> getTasksByUser_Id(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl)auth.getPrincipal();
        return new ResponseEntity<Optional<List<Task>>>(taskService.tasksByUser_Id(userDetails.getId()), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addTask(@RequestBody Task task){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl)auth.getPrincipal();
        task.setUser(userDetails.getId());
        task.setCreated_at(new Date());
        task.setUpdated_at(new Date());
        taskService.addTask(task);
        return new ResponseEntity<String>("Task added!", HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateTask(@RequestBody Task task) throws Exception {
        taskService.updateTask(task);
        return new ResponseEntity<String>("Task updated!", HttpStatus.OK);
    }

    @PostMapping("/delete/{task_id}")
    public ResponseEntity<String> updateTask(@PathVariable ObjectId task_id) {
        taskService.deleteTask(task_id);
        return new ResponseEntity<String>("Task deleted", HttpStatus.OK);
    }
}
