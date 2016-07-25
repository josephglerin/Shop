package com.shop.services;
import com.shop.dao.UserDao;
import com.shop.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

/**
 * The implementation class for the interface UserService
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    @Transactional
    public void addUser(User user) {
        userDao.addUser(user);
    }

    @Transactional
    public void updateUser(User user) {
        userDao.updateUser(user);
    }

    @Transactional
    public void deleteUser(User user) {
        userDao.deleteUser(user);
    }

    @Transactional
    public User findUser(int userId) {
        return userDao.findUser(userId);
    }

    @Transactional
    public User findUser(String username)
    {
        return userDao.findUser(username);
    }

    @Transactional
    public User findUser(String username,String password)
    {
        return userDao.findUser(username,password);
    }

    @Transactional
    public List<User> listAllUsers()
    {
        return userDao.listAllUsers();
    }

    @Transactional
    public List<Object> getAllUsers()
    {
        return userDao.getAllUsers();
    }

    @Transactional
    public User searchUserByMail(String emailId)
    {
        return userDao.searchUserByMail(emailId);
    }

    @Transactional
    public User findOtherUsers(int roleId,int userId)
    {
        return userDao.findOtherUsers(roleId, userId);
    }

}