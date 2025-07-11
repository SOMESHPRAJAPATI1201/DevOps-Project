package com.cst.aws.repository;

import com.cst.aws.dto.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepo extends JpaRepository<Student, Integer> {

    Student findStudentByUsernameAndPassword(String username, String password);

    Student findByUsername(String username);
}
