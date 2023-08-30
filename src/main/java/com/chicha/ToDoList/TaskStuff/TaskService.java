package com.chicha.ToDoList.TaskStuff;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;
    public List<Task> allTasks(){
        return taskRepository.findAll();
    }
    public Optional<List<Task>> tasksByTitle(String title){
        return taskRepository.findTasksByTitle(title);
    }
    public Optional<List<TaskDTO>> tasksByUser_Id(ObjectId user_id){
        Optional<List<Task>> optionalTasks = taskRepository.findTasksByUser(user_id);

        if (optionalTasks.isPresent()) {
            List<Task> tasks = optionalTasks.get();
            List<TaskDTO> taskDTOs = tasks.stream()
                    .map(TaskDTO::new) // Assuming you have a constructor in TaskDTO that takes a Task object
                    .collect(Collectors.toList());
            return Optional.of(taskDTOs);
        } else {
            return Optional.empty();
        }
    }

    public void addTask(Task task){
        taskRepository.save(task);
    }

    public void updateTask(Task updatedTask) throws Exception {
        Task task = taskRepository.findById(updatedTask.getId())
                .orElseThrow(() -> new Exception("Task with this id not found: "+ updatedTask.getId()));
        task.setPriority(updatedTask.getPriority());
        task.setCategory(updatedTask.getCategory());
        task.setDescription(updatedTask.getDescription());
        task.setTitle(updatedTask.getTitle());
        task.setDue_date(updatedTask.getDue_date());
        task.setStatus(updatedTask.getStatus());
        task.setUpdated_at(new Date());
        taskRepository.save(task);
    }

    public void deleteTask(ObjectId task_id){
        taskRepository.deleteById(task_id);
    }
}
