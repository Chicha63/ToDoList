package com.chicha.ToDoList.TaskStuff;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @GetMapping("/{user_id}")
    public ResponseEntity<Optional<List<Task>>> getTasksByUser_Id(@PathVariable ObjectId user_id){
        return new ResponseEntity<Optional<List<Task>>>(taskService.tasksByUser_Id(user_id), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addTask(Task task){
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
