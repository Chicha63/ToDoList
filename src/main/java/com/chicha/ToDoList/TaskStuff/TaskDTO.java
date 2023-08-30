package com.chicha.ToDoList.TaskStuff;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskDTO {
    private String id;
    private String title;
    private String description;
    private Date due_date;
    private String priority;
    private String category;
    private String status;
    private Date created_at;
    private Date updated_at;
    private String user;

    public TaskDTO(Task task) {
        this.id = task.getId().toString();
        this.title = task.getTitle();
        this.description = task.getDescription();
        this.due_date = task.getDue_date();
        this.priority = task.getPriority();
        this.category = task.getCategory();
        this.status = task.getStatus();
        this.created_at = task.getCreated_at();
        this.updated_at = task.getUpdated_at();
        this.user = task.getUser().toString();
    }
}
