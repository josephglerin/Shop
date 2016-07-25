package com.shop.controller;
import com.shop.helpers.UserHelper;
import com.shop.models.User;
import com.shop.services.UserService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;

/**
 * The User controller class.
 */
@Controller
@RequestMapping("/user")
public class UserController {

    private static final Logger loger = Logger.getLogger(UserController.class);
    private static final Gson gson = new GsonBuilder().create();
    private static final String JSON_FORMAT ="application/json";
	private static final String USER_REGISTRATION_VIEW ="user-registration";
    private static final String USER_ID ="userid";
    private static final String EMAIL_ID ="emailid";
    private static final String DEFAULT_VALUE ="0";
    private static final String REQUEST ="Request: \n";
    private static final String INPUT ="Input:\n";
    private static final String RESPONSE ="Response: \n";
    private static final String STATUS ="status";
    private static final String SUCCESS ="success";
    private static final String FAILURE ="failed";
    private static final String MESSAGE ="message";
    private final String INDEX_PAGE="index";
    private static  String RESPONSE_MESSAGE ="";
    private static final String ERROR_404="404";

	@Autowired(required = true)
	private UserService userService;

	@Autowired(required = true)
	private UserHelper userHelper;

	public void setUserService(UserService userService) {
		this.userService = userService;
	}

	public void setUserHelper(UserHelper userHelper) {
		this.userHelper = userHelper;
	}

    /**
     * Logon welcome page request.
     *
     * @return the model and view page
     */
	@RequestMapping()
	@ResponseBody
	public ModelAndView logonWelcome(){
		ModelAndView modelAndView=new ModelAndView(INDEX_PAGE);
		return modelAndView;
	}

	@RequestMapping(value = {"/registration"},method = RequestMethod.GET)
	public String reg(){
		return USER_REGISTRATION_VIEW;
	}


	/**
	 * Add new user.
	 * The request and response is in JSON format.
	 *
	 * @param user the User class object
	 * @return the ModelMap object.
	 */
	@RequestMapping(value = {"/registration"},method = RequestMethod.PUT,produces = JSON_FORMAT,consumes = JSON_FORMAT)
	public ModelMap registerNewUser(@RequestBody User user)
	{
		loger.info("Reuest for new user registration");
		loger.info(INPUT+ gson.toJson(user));
		ModelMap modelMap=userHelper.newUserRegistration(user);
		return modelMap;
	}



    /**
     * Gets users list.
     * The response is in JSON format.
     *
     * @return the ModelMap object.
     */
	@RequestMapping(value = {"/list"},method = RequestMethod.GET,produces = JSON_FORMAT)
	public ModelMap getUserList() {
		ModelMap modelMap=new ModelMap();
		loger.info("Reuest for list all users");
		List<User> userList=userService.listAllUsers();
		userHelper.modifyUserList(userList);
		loger.info(RESPONSE+gson.toJson(userList));
		modelMap.addAttribute(STATUS, SUCCESS);
		modelMap.addAttribute(userList);
		return modelMap;
	}

    /**
     * Update user information
     * The request and response is in JSON format.
     *
     * @param user the User class object
     * @return theModelMap object.
     */
	@RequestMapping(value = {"/profile"},method = RequestMethod.POST,produces = JSON_FORMAT,consumes = JSON_FORMAT)
	public ModelMap updateUser(@RequestBody User user)
	{
        loger.info("Reuest for updating a user detail");
        loger.info(INPUT + gson.toJson(user));
        ModelMap modelMap = userHelper.updateUser(user);
        return modelMap;
	}

    /**
     * Gets a user information from user id.
     * The response is in JSON format.
     *
     * @param userId the user id
     * @return the ModelMap object.
     */
	@RequestMapping(value = {"/profile"},method = RequestMethod.GET,produces = JSON_FORMAT)
	public ModelMap getUser(@CookieValue(value = "userid",required = false,defaultValue = "0") Integer userId)
	{
		ModelMap modelMap=new ModelMap();
		loger.info("Reuest for fetching a user");
		try {
			User user=userService.findUser(userId);
			if(user!=null) {
				user.setPassword(null);
				modelMap.addAttribute(STATUS, SUCCESS);
				modelMap.addAttribute(user);
				loger.info(RESPONSE+ gson.toJson(user));
			}
			else{
				loger.fatal("user not found for the user id: "+userId);
				modelMap.addAttribute(STATUS,FAILURE);
			}
		}
		catch (DataIntegrityViolationException e)
		{
			modelMap.addAttribute(STATUS, FAILURE);
			modelMap.addAttribute(MESSAGE,e.getMessage());
			loger.error(e.getMessage());
		}
		return modelMap;
	}

    /**
     * Delete user information
     * The request and response is in JSON format.
     *
     * @param user the User class object.
     * @return the ModelMap object.
     */
	@RequestMapping(value = {"/delete-user"},method = RequestMethod.DELETE,produces = JSON_FORMAT,consumes = JSON_FORMAT)
	public ModelMap deleteUser(@RequestBody User user)
	{
		ModelMap modelMap=new ModelMap();
		loger.info("Reuest for deleting a user");
        boolean status = userHelper.checkSuperUser(user,"delete");
        try{
            if(status) {
                userService.deleteUser(user);
                modelMap.addAttribute(STATUS, SUCCESS);
                RESPONSE_MESSAGE = "User information Deleted.";
                modelMap.addAttribute(MESSAGE, RESPONSE_MESSAGE);
                loger.info(RESPONSE + gson.toJson(SUCCESS));
            }
            else{
                modelMap.addAttribute(STATUS, FAILURE);
                RESPONSE_MESSAGE = "Deletion failed. Cannot delete super admin";
                modelMap.addAttribute(MESSAGE, RESPONSE_MESSAGE);
                loger.info(RESPONSE_MESSAGE);
            }
        }
        catch (Exception e)
        {
            modelMap.addAttribute(STATUS, FAILURE);
            RESPONSE_MESSAGE = "Deletion failed";
            modelMap.addAttribute(MESSAGE, RESPONSE_MESSAGE);
            loger.info(e);
        }
		return modelMap;
	}

    /**
     * Verify email id already exist.
     * The response is in JSON format.
     *
     * @param emailId the email id
     * @return the ModelMap object.
     */
	@RequestMapping(value = {"/verify-emailid"},method = RequestMethod.GET,produces = JSON_FORMAT)
	public ModelMap verifyEmailId(@RequestParam (value = EMAIL_ID)String emailId)
	{
		ModelMap modelMap=new ModelMap();
		loger.info("Reuest for verifying user email id available or not");
		loger.info(REQUEST+"emailid: "+emailId);
		User user=userService.findUser(emailId);
		if(user!=null)
		{
			loger.fatal("emailid found. already a user registered with the emailid: "+emailId);
			modelMap.addAttribute(STATUS, FAILURE);
			modelMap.addAttribute(MESSAGE,"emailid not available");
		}
		else{
			modelMap.addAttribute(STATUS,SUCCESS);
			loger.fatal("No user found for the emailid: "+emailId);
			modelMap.addAttribute(MESSAGE,"emailid  available");
		}
		return modelMap;
	}

    /**
     * Reset user password.
     * The response is in JSON format.
     *
     * @param passwordList the password list
     * @param userId       the userid
     * @return the ModelMap object.
     */
	@RequestMapping(value = {"/reset-user-password"},method = RequestMethod.POST,produces = JSON_FORMAT)
	public ModelMap resetUserPassword(@RequestBody ArrayList<String> passwordList,
                                      @CookieValue (value = USER_ID,defaultValue = DEFAULT_VALUE)Integer userId)
	{
		loger.info("Request for reseting user password");
		ModelMap modelMap=new ModelMap();
		if(userId==0){
			loger.fatal("user id is equal to 0, Cookie null");
			modelMap.addAttribute(STATUS, FAILURE);
			modelMap.addAttribute(MESSAGE,"please login to continue");
			return modelMap;
		}
		String currentPassword=passwordList.get(0);
		String newPassword=passwordList.get(1);
		User user=userService.findUser(userId);
		if(user.getPassword().equals(currentPassword))
		{
			user.setPassword(newPassword);
			try {
				userService.updateUser(user);
				loger.info("Password changed successfully");
				modelMap.addAttribute(STATUS, SUCCESS);
				modelMap.addAttribute(MESSAGE,"Password changed successfully");
			}
			catch (Exception e)
			{
				loger.error("Password resetting failed!.."+e.getMessage());
				modelMap.addAttribute(STATUS,FAILURE);
			}
		}
		else{
			loger.fatal("Password resetting failed!.. current password not found");
			modelMap.addAttribute(STATUS, FAILURE);
			modelMap.addAttribute(MESSAGE,"current password not found");
		}
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