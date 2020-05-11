package crm.dao;


import crm.entity.model.CourseOrder;
import crm.entity.model.MonthIncome;
import crm.entity.model.User;
import org.hibernate.sql.Select;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface CourseOrderDao extends JpaRepository<CourseOrder,String>
        , JpaSpecificationExecutor<CourseOrder> {

    @Override
    List<CourseOrder> findAll();

    @Override
    Page<CourseOrder> findAll(Pageable pageable);

    @Query(value = "select left(order_date,7),count(*),course_price from t_course_order group by left(order_date,7);",nativeQuery = true)
    List<String> getMonthIncome();
}
