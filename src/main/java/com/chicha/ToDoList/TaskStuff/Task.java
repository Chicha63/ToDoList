package com.chicha.ToDoList.TaskStuff;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "tasks")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Task {
    @Id
    private ObjectId id;
    private String title;
    private String description;
    private Date due_date;
    private String priority;
    private String category;
    private String status;
    private Date created_at;
    private Date updated_at;
    private ObjectId user;
}
