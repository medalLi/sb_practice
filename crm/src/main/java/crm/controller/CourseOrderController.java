package crm.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author medal
 * @create 2020-05-09 10:15
 **/
@Controller
public class CourseOrderController {
    @RequestMapping("/courseList")
    public String index(){
        return "/courseOrder/list";
    }
    @RequestMapping("/add")
    public String add(){
        return "/courseOrder/add";
    }
    @RequestMapping("/edit")
    public String edit(){
        return "/courseOrder/edit";
    }
}
