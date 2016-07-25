package com.shop.helpers;
import com.shop.services.UserService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * The class for user login operations.
 */
@Component
public class LoginHelper {

    private static final Logger loger = Logger.getLogger(LoginHelper.class);
    private static final String SUCCESS ="success";
    private static final String FAILURE ="failed";
    private static final String STATUS ="status";
    private static final String MESSAGE ="message";
    private static final String USER_ID ="userid";
    private static final String ROLE ="role";
    private static final String ADMIM ="admin";
    private static final String SUPER_ADMIN ="super admin";

    @Autowired
    private UserService userService;

    public void setUserService(UserService userService) {
        this.userService = userService;
    }



}