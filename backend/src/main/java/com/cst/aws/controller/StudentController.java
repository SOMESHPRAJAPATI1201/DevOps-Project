package com.cst.aws.controller;

import com.cst.aws.dto.Student;
import com.cst.aws.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/findAll")
    public ResponseEntity getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    @PostMapping("/auth/login")
    public ResponseEntity getLogin(@RequestBody Student student) {
            return ResponseEntity.ok(studentService.getStudentByEmailAndPassword(student.getUsername(),student.getPassword()));
    }

    @PostMapping("/auth/register")
    public ResponseEntity saveStudent(@RequestBody Student student) {
        return ResponseEntity.ok(studentService.saveStudent(student));
    }

}
