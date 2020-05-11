package crm.service;

import crm.dao.CourseOrderDao;
import crm.entity.model.CourseOrder;
import crm.entity.model.MonthIncome;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @author medal
 * @create 2020-05-09 12:56
 **/
@Service
public class CourseOrderService {
    @Autowired
    CourseOrderDao courseOrderDao;

    // 展示课程信息
    public List<CourseOrder> listCourse(){

//        Sort sort = new Sort(Sort.Direction.DESC,"uuid"); //创建时间降序排序
       // Pageable pageable = PageRequest.of(1,2);
        return courseOrderDao.findAll();
    }

    // 展示收入
    public List<MonthIncome> showIncome(){
        List<String> list = courseOrderDao.getMonthIncome();
        List<MonthIncome> list1 = new ArrayList<>();
        for(String line : list){
            String[] lineSplit = line.split(",");
            list1.add(new MonthIncome(lineSplit[0],lineSplit[1],lineSplit[2]));
        }
        return list1;
    }
}
