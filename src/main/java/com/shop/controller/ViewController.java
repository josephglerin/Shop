package com.shop.controller;

import com.shop.constants.ViewConstants;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * The View controller for rendering jsp pages.
 */
@Controller
@RequestMapping("/")
public class ViewController {


    @RequestMapping
    public String indexPage()
    {
        return ViewConstants.INDEX;
    }

    /**
     * Gets error page.
     *
     * @return the error page
     */
    @RequestMapping(value = "/404")
    public String getUnAvailableErrorPage()
    {
        return ViewConstants.UN_AVAILABLE;
    }

    /**
     * Gets error page.
     *
     * @return the error page
     */
    @RequestMapping(value = "/403")
    public String getUnAuthorizedErrorPage()
    {
        return ViewConstants.UN_AUTHORIZED;
    }


    @RequestMapping(value = "/index")
    public String index()
    {
        return ViewConstants.INDEX;
    }

    @RequestMapping(value = "/home")
    public String homePage()
    {
        return ViewConstants.HOME;
    }

    @RequestMapping(value = "/user/registration")
    public String registrationPage()
    {
        return ViewConstants.USER_REGISTRATION;
    }

    @RequestMapping(value = "/user/profile-page")
    public String profilePage()
    {
        return ViewConstants.USER_PROFILE;
    }

    @RequestMapping(value = "/login-page")
    public String loginPage()
    {
        return ViewConstants.LOGIN_PAGE;
    }

    @RequestMapping(value = "/product/registration")
    public String productRegistrationPage()
    {
        return ViewConstants.PRODUCT_REGISTRATION;
    }

    @RequestMapping(value = "/products")
    public String productListPage()
    {
        return ViewConstants.PRODUCT_LIST;
    }








}
