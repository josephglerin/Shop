package com.shop.helpers;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.shop.models.User;
import com.shop.models.UserRole;
import com.shop.services.UserService;
import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;

import java.util.List;

@Repository
public class UserHelper {

    private static final Logger loger = Logger.getLogger(UserHelper.class);
    private static final Gson gson = new GsonBuilder().create();
    private static final String USER_ID ="userid";
    private static final String STATUS ="status";
    private static final String SUCCESS ="success";
    private static final String FAILURE ="failed";
    private static final String SUPER_ADMIN ="super admin";
    private static final String MESSAGE ="message";
    private static final String RESPONSE ="Response: \n";
    private static  String RESPONSE_MESSAGE ="";

    @Autowired
    private SessionFactory sessionFactory;

    @Autowired(required = true)
    private UserService userService;

    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }


    @Transactional
    public int getUserOrganizationId(int userId)
    {
        Session session=sessionFactory.getCurrentSession();
        String hql = "SELECT u.organizationId FROM com.shop.models.User u WHERE u.userId = "+userId;
        Query query=session.createQuery(hql);
        List result=query.list();
        if (result.get(0)!=null) {
            return (Integer) result.get(0);
        }
        else return 0;
    }


    public void removeRolePermision(List<UserRole> userRoles)
    {
        for (UserRole userRole:userRoles)
        {
            userRole.setUserPermissionList(null);
        }
    }

    public void modifyUserList(List<User> users)
    {
        int size = users.size();
        for(int j = 0; j < size ; j++)
        {
            User user=users.get(j);
            user.setPassword(null);
        }
    }

    /**
     * Check the user role wheather it is admin or super admin.
     *
     * @param role the user role
     * @return the boolean
     */
    public boolean checkPermission(String role)
    {
        if (role.equals("super admin")) {
            return true;
        }
        else
        {
            return false;
        }
    }



    public ModelMap newUserRegistration(User user)
    {
        ModelMap modelMap=new ModelMap();
        try {
            User user1 = userService.searchUserByMail(user.getEmailId());
            if(user1!=null)
            {
                RESPONSE_MESSAGE = "Registration failed. User with given Emailid already registered!..";
                loger.fatal(RESPONSE_MESSAGE);
                modelMap.addAttribute(STATUS, FAILURE);
                modelMap.addAttribute(MESSAGE,RESPONSE_MESSAGE);
                return modelMap;
            }
            else {
                userService.addUser(user);
                loger.info("User registration success");
                loger.info(RESPONSE + gson.toJson(user));
                modelMap.addAttribute(STATUS, SUCCESS);
                modelMap.addAttribute(user);
            }
        }
        catch (DataIntegrityViolationException e)
        {
            loger.error("New user registration failed:  " + e.getMessage());
            modelMap.addAttribute(STATUS, FAILURE);
        }
        return modelMap;
    }

    public ModelMap updateUser(User user)
    {
        ModelMap modelMap=new ModelMap();
        try {
            //checking emailid
            User user1 = userService.searchUserByMail(user.getEmailId());
            if(user1!=null)
            {
                if(user.getUserId() != user1.getUserId())
                {
                    RESPONSE_MESSAGE = "Updation failed. User with given Emailid already registered!..";
                    loger.fatal(RESPONSE_MESSAGE);
                    modelMap.addAttribute(STATUS, FAILURE);
                    modelMap.addAttribute(MESSAGE, RESPONSE_MESSAGE);
                    return modelMap;
                }
            }
            userService.updateUser(user);
            modelMap.addAttribute(STATUS, SUCCESS);
            modelMap.addAttribute(user);
            loger.info(RESPONSE+ gson.toJson(user));
        }
        catch (DataIntegrityViolationException e)
        {
            modelMap.addAttribute(STATUS, FAILURE);
            RESPONSE_MESSAGE = "User profile updation failed";
            modelMap.addAttribute(MESSAGE,RESPONSE_MESSAGE);
            loger.error(e.getMessage());
            loger.error(RESPONSE_MESSAGE);
        }
        return modelMap;
    }

    public boolean checkSuperUser(User user,String action)
    {
        User user1 = userService.findUser(user.getUserId());
        loger.info("Checking for other super users exist");
        try{
            UserRole userRole = user1.getUserRole();
            if((user.getRoleId() == user1.getRoleId()) && (action.equals("update")))
            {
                return true;
            }
            if(userRole.getRoleName().equals(SUPER_ADMIN))
            {
                int roleId = userRole.getId();
                int userId = user.getUserId();
                User superAdmin = userService.findOtherUsers(roleId,userId);
                if(superAdmin != null){
                    return true;
                }
                else{
                    return false;
                }
            }
            else{
                return true;
            }
        }
        catch (Exception e)
        {
            loger.error(e);
        }
        return false;
    }


}