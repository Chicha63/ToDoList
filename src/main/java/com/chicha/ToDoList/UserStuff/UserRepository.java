package com.chicha.ToDoList.UserStuff;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, ObjectId> {
    Boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
}
