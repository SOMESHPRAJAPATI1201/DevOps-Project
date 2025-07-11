package com.cst.aws.repository;

import com.cst.aws.dto.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface ExpenseRepo extends JpaRepository<Expense, Integer> {

    @NativeQuery("SELECT * FROM expense WHERE date BETWEEN :startDate AND :endDate;")
    List<Expense>  findByDate(LocalDate startDate, LocalDate endDate);
}
