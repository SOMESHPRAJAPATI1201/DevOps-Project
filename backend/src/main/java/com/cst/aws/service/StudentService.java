package com.cst.aws.service;

import com.cst.aws.dto.Student;
import com.cst.aws.repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepo studentRepo;

    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }

    public Student getStudentByEmailAndPassword(String email, String password) {
        return studentRepo.findStudentByUsernameAndPassword(email, password);
    }

    public Student saveStudent(Student student) {
        return studentRepo.save(student);
    }

    public Student getStudentByEmail(String username) {
        return studentRepo.findByUsername(username);
    }

}
