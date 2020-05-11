package crm.controller;

import crm.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @Author: medal
 * @Date: Created in 下午5:02 2020/5/02
 * @Description:
 */
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * 用户登录
     */
//    @PostMapping("/login")
//    public String userLogin(@RequestBody User dbSourceManager) {
//        User dataManger = dataModelingDBSourceService.findDataManger(dbSourceManager.getName());
//        return dataManger.getName();
//    }

    @RequestMapping("/demo")
    public Object user() {
        Object o = userService.showUser();
        return o;
    }

}
