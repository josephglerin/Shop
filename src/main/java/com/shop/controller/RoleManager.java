package com.shop.controller;
import com.shop.helpers.UserHelper;
import com.shop.models.UserRole;
import com.shop.services.UserRoleService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import java.util.List;

/**
 * The controller class for user role management.
 */
@Controller
@RequestMapping("/role")
public class RoleManager {

    private static final Logger loger = Logger.getLogger(UserRoleService.class);
    private static final Gson gson = new GsonBuilder().create();
    private static final String JSON_FORMAT ="application/json";
    private static final String ROLE_ID ="roleId";
    private static final String RESPONSE ="Response";
    private static final String STATUS ="status";
    private static final String SUCCESS ="success";
    private static final String FAILURE ="failed";
    private static final String ERROR_404="404";

    @Autowired
    private UserRoleService userRoleService;

    @Autowired(required = true)
    private UserHelper userHelper;

    public void setUserRoleService(UserRoleService userRoleServifce) {
        this.userRoleService = userRoleService;
    }

    /**
     * Add new user role.
     *
     * @param userRole the UserRole class object.
     */
    @RequestMapping(value = "/add-role",method = RequestMethod.PUT,produces = JSON_FORMAT,consumes = JSON_FORMAT)
    public void addUserRole(@ModelAttribute UserRole userRole)
    {
        userRoleService.addUserRole(userRole);
    }

    public void setUserHelper(UserHelper userHelper) {
        this.userHelper = userHelper;
    }

    /**
     * Update user role.
     *
     * @param userRole the UserRole class object.
     */
    @RequestMapping(value = "/update-role",method = RequestMethod.POST)
    public void updateUserRole(@ModelAttribute UserRole userRole){
        userRoleService.updateUserRole(userRole);
    }

    /**
     * Gets user role.
     * The response is in JSON format.
     *
     * @param roleId the role id
     * @return the UserRole object.
     */
    @RequestMapping(value = "/get-roles/{roleid}",method = RequestMethod.GET)
    public UserRole getUserRole(@PathVariable(value = ROLE_ID)int roleId){
        return userRoleService.getRolePermissions(roleId);
    }

    /**
     * Get user role lists.
     * The response is in JSON format.
     *
     * @return ModelMap object.
     */
    @RequestMapping(value = "/list-roles",method = RequestMethod.GET)
    public ModelMap getRoles(){
        loger.info("Request for getting list of user roles");
        ModelMap modelMap=new ModelMap();
        List<UserRole> userRoles=userRoleService.userRoleList();
        if(userRoles.size()==0){
            loger.fatal("No user roles where registered!...");
            modelMap.addAttribute(STATUS, FAILURE);
            return modelMap;
        }
        userHelper.removeRolePermision(userRoles);
        loger.info(RESPONSE+gson.toJson(userRoles));
        modelMap.addAttribute(STATUS, SUCCESS);
        modelMap.addAttribute(userRoles);
        return modelMap;
    }

    /**
     * RequestMapping for fallback method.

     * @return the error page.
     */
    @RequestMapping("*")
    public String fallbackMethod(){
        return ERROR_404;
    }
}
