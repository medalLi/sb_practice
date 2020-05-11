package crm.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author medal
 * @create 2020-05-09 10:17
 **/
@Controller
public class StuInfoController {
    @RequestMapping("/stuInfoList")
    public String index(){
        return "/stuInfo/list";
    }
}
