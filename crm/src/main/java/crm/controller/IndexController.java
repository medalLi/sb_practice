package crm.controller;

import crm.entity.model.CourseOrder;
import crm.entity.model.MonthIncome;
import crm.entity.model.PageResult;
import crm.service.CourseOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @author medal
 * @create 2020-05-03 15:34
 **/
@Controller
public class IndexController {

    @Autowired
    CourseOrderService courseOrderService;

    @RequestMapping("/index")
    public String index() {
        return "index";
    }

    @RequestMapping("/listJson")
    @ResponseBody
    public PageResult<CourseOrder> listJson(HttpServletRequest request) {
        String limit = request.getParameter("limit");
        String page = request.getParameter("page");
        System.out.println(limit);
        PageResult<CourseOrder> pr = new PageResult<CourseOrder>();
        pr.setCode(0);
//        pr.setCount(courseOrderService.listCourse(page,limit).getContent().size());
//        pr.setData(courseOrderService.listCourse(page,limit).getContent());
        pr.setCount(courseOrderService.listCourse1().size());
        pr.setData(courseOrderService.listCourse1());


        return pr;
    }

    @RequestMapping("/courseIncome")
    @ResponseBody
    public List<MonthIncome> courseIncome() {
        List<MonthIncome> list = courseOrderService.showIncome();
        return list;
    }

//    @RequestMapping("bootstrapIndex")
//    public String bootstrapIndex(){
//        return "bootstrapDemo/index";
//    }
}
