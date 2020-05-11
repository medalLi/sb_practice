package crm.controller;

import crm.entity.model.MonthIncome;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * @author medal
 * @create 2020-05-09 20:49
 **/
@Controller
public class DataAnalyseController {
    @RequestMapping("/income")
    public String index(){
        return "/dataAnalyse/income";
    }

    @RequestMapping("/monthIncomes")
    public List<MonthIncome> monthIncomes(){
        List<MonthIncome> list = null;
        return list;
    }
}
