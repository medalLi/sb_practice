package crm.service;

import crm.dao.CourseOrderDao;
import crm.entity.model.CourseOrder;
import crm.entity.model.MonthIncome;
import crm.entity.model.PageResult;
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
    public List<CourseOrder> listCourse(String page,String size){

//        Sort sort = new Sort(Sort.Direction.DESC,"uuid"); //创建时间降序排序
//
//        Pageable pageable = PageRequest.of(Integer.parseInt(page),Integer.parseInt(size),sort);
//
//        int pageSize = pageable.getPageSize();
//        int pageNumber = pageable.getPageNumber();
//        System.out.println(pageSize);
//        System.out.println(pageNumber);
//        return courseOrderDao.findAll(pageable);
         return courseOrderDao.findAll();
    }

    // 展示课程信息
    public List<CourseOrder> listCourse1(){

//        Sort sort = new Sort(Sort.Direction.DESC,"uuid"); //创建时间降序排序
//
//        Pageable pageable = PageRequest.of(Integer.parseInt(page),Integer.parseInt(size),sort);
//       // Pageable pageable1 =
//        int pageSize = pageable.getPageSize();
//        int pageNumber = pageable.getPageNumber();
//        System.out.println(pageSize);
//        System.out.println(pageNumber);
//        return courseOrderDao.findAll(pageable);
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
