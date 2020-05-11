package crm.service;


import crm.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class UserService {

    @Autowired
    UserDao userDao;

    // 展示数据源
    public Object showUser(){

        return userDao.findAll();
    }

//    public User findDataManger(String name) {
//        return dbSourceManagerDao.findByDbSourcename(dname);
//    }
}
