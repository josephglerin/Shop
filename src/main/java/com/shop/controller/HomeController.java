package com.shop.controller;
import com.shop.constants.ViewConstants;
import com.shop.helpers.UserHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * The Home controller for rendering ftl pages.
 */
@Controller
@RequestMapping("/")
public class HomeController {

    private static final String LOGIN_PAGE="login";
    private static final String KBYG="shop";
    private static final String USER_ID ="userid";
    private static final String USER_ROLE ="role";
    private static final String DEFAULT_VALUE ="0";
    private static final String USER_PAGE="users";
    private static final String ORGANIZATION_PAGE="organizations";
    private static final String ADMIN="admin";
    private static final String QAF="qaf";
    private static final String UN_AVAILABLE="404";
    private static final String UN_AUTHORIZED="403";
    private static final String SITE_CONTENTS="site-contents";

    @Autowired(required = true)
    private UserHelper userHelper;

    public void setUserHelper(UserHelper userHelper) {
        this.userHelper = userHelper;
    }



    /**
     * Request for getting login page.
     *
     * @param userId   the user id
     * @param userRole the user role
     * @return the string
     */
    @RequestMapping(value = "/admin")
    public String showLoginPage(@CookieValue (value = USER_ID,defaultValue = DEFAULT_VALUE)Integer userId,
                                @CookieValue(value = USER_ROLE,required = false,defaultValue = DEFAULT_VALUE) String userRole)
    {
        if(userId==0)
        {
            return LOGIN_PAGE;
        }
        else
        {
            if (userRole.equals(ADMIN))
            {
                return ViewConstants.ADMIN_PAGE;
            }
            else{
                return USER_PAGE;
            }
        }
    }




    /**
     * Request for getting all organizations listing page.
     *
     *  @param userId   the user id
     * @return the organizations view
     */
    @RequestMapping(value = "/admin/organizations")
    public String getOrganizationsView(@CookieValue (value = USER_ID,defaultValue = DEFAULT_VALUE)Integer userId)
    {
        if(userId==0)
            return LOGIN_PAGE;
        return ORGANIZATION_PAGE;
    }

    /**
     * Request for getting users list
     *
     * @param userRole the user role
     * @return the users view
     */
    @RequestMapping(value = "/admin/users")
    public String getUsersView(@CookieValue (value = USER_ROLE,required = false,defaultValue = DEFAULT_VALUE) String userRole)
    {
        boolean status=userHelper.checkPermission(userRole);
        if (status){
            return USER_PAGE;
        }
        else{
            return UN_AVAILABLE;
        }
    }

    //login request
    //Spring Security see this :
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public ModelAndView login(
            @RequestParam(value = "error", required = false) String error,
            @RequestParam(value = "logout", required = false) String logout) {

        ModelAndView model = new ModelAndView();
        if (error != null) {
            model.addObject("error", "Invalid username and password!");
        }

        if (logout != null) {
            model.addObject("msg", "You've been logged out successfully.");
        }
        model.setViewName("login");

        return model;

    }

    @RequestMapping(value="admin/logout", method = RequestMethod.GET)
    public String logoutPage (HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null){
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        Cookie[] cookies=request.getCookies();
        if (cookies != null)
            for (int i = 0; i < cookies.length; i++) {
                cookies[i].setValue("");
                cookies[i].setPath("/shop/");
                cookies[i].setMaxAge(0);
                response.addCookie(cookies[i]);
            }
        return "redirect:/login?logout";
    }



    /**
     * RequestMapping for fallback method.

     * @return the error page.
     */
    @RequestMapping("*")
    public String fallbackMethod(){
        return UN_AVAILABLE;
    }
}
