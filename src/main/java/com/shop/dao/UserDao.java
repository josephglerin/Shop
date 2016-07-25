package com.shop.dao;
import com.shop.models.User;

import java.util.List;

/**
 * The interface UserDao.
 */
public interface UserDao {

    /**
     * Add new user details.
     *
     * @param user the instance of the class User.
     */
    public void addUser(User user);

    /**
     * Update user details.
     *
     * @param user the instance of the class User.
     */
    public void updateUser(User user);

    /**
     * Delete user details.
     *
     * @param user the instance of the class User.
     */
    public void deleteUser(User user);

    /**
     * Find a user by given user id.
     *
     * @param userId the user id
     * @return the instance of the class User.
     */
    public User findUser(int userId);

    /**
     * Find a user by username.
     *
     * @param username the username
     * @return the instance of the class User.
     */
    public User findUser(String username);

    /**
     * Find user by username and password.
     *
     * @param username the username
     * @param password the password
     * @return the instance of the class User.
     */
    public User findUser(String username,String password);

    /**
     * Search a user by mail id.
     *
     * @param emailId the email id
     * @return the instance of the class User.
     */
    public User searchUserByMail(String emailId);

    /**
     * Gets complete list all users.
     *
     * @return the list objects of class User.
     */
    public List<User> listAllUsers();

    /**
     * Gets all users.
     *
     * @return the list objects of class User.
     */
    public List<Object> getAllUsers();

    /**
     * Find other super admin user other than the given user id.
     * @param roleId the role id
     * @param userId the user id
     * @return the instance of the class User.
     */
    public User findOtherUsers(int roleId,int userId);

}