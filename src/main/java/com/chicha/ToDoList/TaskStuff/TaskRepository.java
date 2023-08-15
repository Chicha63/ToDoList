package com.chicha.ToDoList.TaskStuff;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends MongoRepository<Task, ObjectId> {
    Optional<List<Task>> findTasksByTitle(String title);

    Optional<List<Task>> findTasksByUser(ObjectId user_id);
}
