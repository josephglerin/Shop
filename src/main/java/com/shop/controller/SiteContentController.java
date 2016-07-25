//package com.shop.controller;
//
//import com.shop.helpers.SiteContentHelper;
//import com.google.gson.Gson;
//import com.google.gson.GsonBuilder;
//import org.apache.log4j.Logger;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.ModelMap;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.context.ServletContextAware;
//
//import javax.servlet.ServletContext;
//
///**
// * The SiteContent controller class handles request and response activites related to site contents details..
// */
//@Controller
//@RequestMapping("/sitecontent")
//public class SiteContentController implements ServletContextAware {
//
//    final static Logger loger = Logger.getLogger(UserController.class);
//    private static final String SUCCESS ="success";
//    private static final String FAILURE ="failed";
//    private static final String ERROR_404="404";
//    private Gson gson = new GsonBuilder().create();
//
//    @Autowired
//    private SiteContentService siteContentService;
//
//    private ServletContext servletContext;
//
//    @Autowired
//    private SiteContentHelper siteContentHelper;
//
//
//    public void setSiteContentService(SiteContentService siteContentService) {
//        this.siteContentService = siteContentService;
//    }
//
//    public void setSiteContentHelper(SiteContentHelper siteContentHelper) {
//        this.siteContentHelper = siteContentHelper;
//    }
//
//    public void setServletContext(ServletContext servletContext) {
//        this.servletContext=servletContext;
//    }
//
//    /**
//     * Add site content details.
//     * The request and response is in JSON format.
//     *
//     * @param siteContent the SiteContent object.
//     * @param userId      the user id
//     * @return the ModelMap object.
//     */
//    @RequestMapping(value = "/add-content",method = RequestMethod.POST)
//    public @ResponseBody ModelMap addContent(@ModelAttribute (value="FORM") SiteContent siteContent,@CookieValue(value = "userid",required = false,defaultValue = "0") Integer userId)
//    {
//        ModelMap modelMap=new ModelMap();
//        if(userId==0){
//            loger.fatal("user id is equal to 0, Cookie null");
//            modelMap.addAttribute("status", FAILURE);
//            modelMap.addAttribute("message","please login to continue");
//            return modelMap;
//        }
//        loger.info("Request for adding new site content");
//        loger.info("Input : \n"+"userid:"+userId);
//        loger.info(gson.toJson(siteContent));
//        siteContentHelper.saveSiteContent(siteContent,userId,modelMap,servletContext);
//        return modelMap;
//    }
//
//    /**
//     * Update site content details.
//     * The request and response is in JSON format.
//     *
//     * @param siteContent the SiteContent object.
//     * @param userId      the user id
//     * @return the ModelMap object.
//     */
//    @RequestMapping(value = "/update-content",method = RequestMethod.POST)
//    public @ResponseBody ModelMap updateContent(@ModelAttribute (value="FORM") SiteContent siteContent,@CookieValue(value = "userid",required = false,defaultValue = "0") Integer userId)
//    {
//        ModelMap modelMap=new ModelMap();
//        if(userId==0){
//            loger.fatal("user id is equal to 0, Cookie null");
//            modelMap.addAttribute("status", FAILURE);
//            modelMap.addAttribute("message","please login to continue");
//            return modelMap;
//        }
//        loger.info("Request for updating site content");
//        loger.info("Input : \n"+"userid:"+userId);
//        loger.info(gson.toJson(siteContent));
//        siteContentHelper.updateSiteContent(siteContent,userId,modelMap,servletContext);
//        return modelMap;
//    }
//
//    /**
//     * Gets all site contents of an organization.
//     * The response is in JSON format.
//     *
//     * @param clientId the client id
//     * @param planId   the plan id
//     * @param qaflowId   the question flow id.
//     * @param userId   the user id
//     * @return the ModelMap object.
//     */
//    @RequestMapping(value = "/get-all-contents",method = RequestMethod.GET,produces = "application/json")
//    public @ResponseBody ModelMap getAllContents(@RequestParam(value = "clientid",defaultValue = "0")String clientId,@RequestParam(value = "planid",defaultValue = "0")String planId,@RequestParam(value = "qaflowid",defaultValue = "0")Integer qaflowId,@CookieValue(value = "userid",required = false,defaultValue = "0") Integer userId) {
//
//        ModelMap modelMap;
//        loger.info("Request for getting all site contents for an organization");
//        loger.info("userid : " + userId + ";\tqaflowid;" + qaflowId);
//        modelMap= siteContentHelper.getAllSiteContents(clientId,userId,servletContext);
//        return modelMap;
//    }
//
//    /**
//     * Gets a particular site content.
//     * The request and response is in JSON format.
//     *
//     *
//     * @param siteContent the SiteContent object.
//     * @param userId      the user id
//     * @return the ModelMap object.
//     */
//    @RequestMapping(value = "/get-content",method = RequestMethod.POST,produces = "application/json")
//    public @ResponseBody ModelMap getContent(@RequestBody SiteContent siteContent,@CookieValue(value = "userid",required = false,defaultValue = "0") Integer userId) {
//        ModelMap modelMap=new ModelMap();
//        if(userId==0){
//            loger.fatal("user id is equal to 0, Cookie null");
//            modelMap.addAttribute("status",FAILURE);
//            modelMap.addAttribute("message","please login to continue");
//           return modelMap;
//        }
//        loger.info("Request for getting individual site contents of an organization");
//        loger.info("Input: \n"+"userid: "+userId);
//        loger.info("Input: \n"+"content key: "+gson.toJson(siteContent));
//        modelMap=siteContentHelper.fetchSiteContent(siteContent,userId);
//        return modelMap;
//    }
//
//    /**
//     * RequestMapping for fallback method.
//
//     * @return the error page.
//     */
//    @RequestMapping("*")
//    public String fallbackMethod(){
//        return ERROR_404;
//    }
//}
