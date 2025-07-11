package com.cst.aws.controller;

import com.cst.aws.dto.Expense;
import com.cst.aws.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.logging.Logger;

@CrossOrigin("*")
@RestController
@RequestMapping("/expense")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;
    Logger logger = Logger.getLogger(ExpenseController.class.getName());

    @PostMapping("/save")
    public ResponseEntity insertExpense(@RequestBody Expense expense) {
        expense.setDate(LocalDate.now());
        return ResponseEntity.ok(expenseService.insertExpense(expense));
    }

    @GetMapping("/filter")
    public ResponseEntity filterExpense(@RequestParam String startDate,@RequestParam String endDate) {
        return ResponseEntity.ok(expenseService.filterExpense(startDate, endDate));
    }

    @GetMapping("/getall")
    public ResponseEntity getAllExpense() {
        return ResponseEntity.ok(expenseService.getExpenses());
    }

}
