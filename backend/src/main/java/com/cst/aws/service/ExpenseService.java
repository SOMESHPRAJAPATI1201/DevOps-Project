package com.cst.aws.service;

import com.cst.aws.dto.Expense;
import com.cst.aws.repository.ExpenseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.logging.Logger;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepo expenseRepo;

    @Autowired
    private StudentService studentService;

    Logger logger = Logger.getLogger(ExpenseService.class.getName());

    public Expense insertExpense(Expense expense) {
        expense.getStudent().setUserId(studentService.getStudentByEmail(expense.getStudent().getUsername()).getUserId());
        expense = expenseRepo.save(expense);
        expense.setStudent(studentService.getStudentByEmail(expense.getStudent().getUsername()));
        return expense;
    }

    public List<Expense> filterExpense(String StartDate, String EndDate ) {
        return expenseRepo.findByDate(LocalDate.parse(StartDate), LocalDate.parse(EndDate));
    }

    public List<Expense> getExpenses() {
        return expenseRepo.findAll();
    }

    public Object getSummaryData(String username) {
        studentService.getStudentByEmail(username);
        return expenseRepo.findAll();
    }


}
