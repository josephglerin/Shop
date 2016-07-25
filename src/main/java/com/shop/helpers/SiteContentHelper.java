//package com.shop.helpers;
//import com.google.gson.Gson;
//import com.google.gson.GsonBuilder;
//import org.apache.log4j.Logger;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//import org.springframework.ui.ModelMap;
//import org.springframework.web.multipart.MultipartFile;
//import javax.servlet.ServletContext;
//import java.io.*;
//import java.util.List;
//
///**
// * The Helper class for the class SiteContent.
// */
//@Component
//public class SiteContentHelper {
//
//    private final static Logger loger = Logger.getLogger(SiteContentHelper.class);
//    private static final String SUCCESS ="success";
//    private static final String FAILURE ="failed";
//    private static final String STATUS ="status";
//    private static final String REQUEST ="Request";
//    private static final String RESPONSE ="Response";
//    private static final String MESSAGE ="message";
//    private static final String FILE ="file";
//    private static final String LOCATION="resources/assets/sitecontents";
//    private static final Gson gson = new GsonBuilder().create();
//
//    @Autowired(required = true)
//    private SiteContentService siteContentService;
//
//    @Autowired(required = true)
//    private UserHelper userHelper;
//
//    @Autowired(required = true)
//    private OrganizationHelper organizationHelper;
//
//    public void setUserHelper(UserHelper userHelper) {
//        this.userHelper = userHelper;
//    }
//
//    public SiteContentHelper() {
//    }
//
//    public void setSiteContentService(SiteContentService siteContentService) {
//        this.siteContentService = siteContentService;
//    }
//
//    public void setOrganizationHelper(OrganizationHelper organizationHelper) {
//        this.organizationHelper = organizationHelper;
//    }
//
//    /**
//     * Save site content.
//     *
//     * @param siteContent    the object of the class SiteContent.
//     * @param userId         the user id
//     * @param modelMap       the ModelMap object
//     * @param servletContext the ServletContext object
//     */
//    public void saveSiteContent(SiteContent siteContent,int userId,ModelMap modelMap,ServletContext servletContext)
//    {
//
//        if(userId==0){
//            loger.fatal("No userid found. Please login");
//            modelMap.addAttribute(STATUS, FAILURE);
//            modelMap.addAttribute(MESSAGE, "user not found");
//            return;
//        }
//        int organizationId=userHelper.getUserOrganizationId(userId);
//        SiteContent siteContent1 = siteContentService.getContents(siteContent.getContentKey(), organizationId);
//        MultipartFile file = siteContent.getFile();
//        siteContent.setPhoneNo(organizationId);
//        if(siteContent.getContentValue()==null && file==null) {
//            loger.error("Site content insertion failed!..., Content or file is null");
//            modelMap.addAttribute(STATUS, FAILURE);
//        }
//        else if(file!=null) {
//            loger.info("Uploading site content with file");
//            String path=servletContext.getRealPath("/");
//            String uploadPath=path+LOCATION;
//            loger.info("File upload path="+uploadPath);
//            String fileName = file.getOriginalFilename();
//            String filePath;
//            siteContent.setContentValue(fileName);
//            if(siteContent1!=null){
//                loger.fatal("Content already found in the database. Then going to update the item");
//                filePath=uploadPath+"/"+siteContent1.getContentValue();
//                try{
//                    loger.info("deleting file : "+filePath);
//                    deleteFile(filePath);
//                }
//                catch (Exception e)
//                {
//                    loger.error(e);
//                }
//                siteContent.setContentId(siteContent1.getContentId());
//            }
//            else {
//                siteContentService.addSiteContent(siteContent);
//            }
//            int index=fileName.lastIndexOf(".");
//            String domainName =fileName.substring(index);
//            fileName=siteContent.getContentId()+""+ domainName;
//            filePath=uploadPath+"/"+fileName;
//            uploadFile(file, filePath);
//            siteContent.setContentValue(fileName);
//            siteContentService.updateContent(siteContent);
//        }
//        else{
//            siteContentService.addSiteContent(siteContent);
//        }
//        if(siteContent.getContentType().equals(FILE)) {
//            String contentValue = siteContent.getContentValue();
//            siteContent.setContentValue("resources/assets/sitecontents/" + contentValue);
//        }
//        siteContent.setFile(null);
//        loger.info("Insertion of site content successfully completed");
//        loger.info("Response : " + gson.toJson(siteContent));
//        modelMap.addAttribute(STATUS, SUCCESS);
//        modelMap.addAttribute(siteContent);
//    }
//
//    /**
//     * Update site content.
//     *
//     * @param siteContent    the object of the class SiteContent.
//     * @param userId         the user id
//     * @param modelMap       the ModelMap object
//     * @param servletContext the ServletContext object
//     */
//    public void updateSiteContent(SiteContent siteContent,int userId,ModelMap modelMap,ServletContext servletContext)
//    {
//        if(userId==0){
//            loger.fatal("No userid found. Please login");
//            modelMap.addAttribute(STATUS, FAILURE);
//            modelMap.addAttribute(MESSAGE,"user not found");
//            loger.error("Site content updation failed");
//            return;
//        }
//        int organizationId=userHelper.getUserOrganizationId(userId);
//        siteContent.setPhoneNo(organizationId);
//        MultipartFile file = siteContent.getFile();
//        if(siteContent.getContentValue()==null && file==null) {
//            loger.fatal("Content value or file is missing");
//            modelMap.addAttribute(STATUS, FAILURE);
//            modelMap.addAttribute(MESSAGE,"Content value or file is empty");
//        } else if(file!=null) {
//            loger.info("Uploading site content with file");
//            loger.fatal("Deleting the old file");
//            String path=servletContext.getRealPath("/");
//            String uploadPath=path+LOCATION;
//            loger.info("File upload path="+uploadPath);
//            String filePath;
//            filePath=uploadPath+"/"+siteContent.getContentValue();
//            try{
//                loger.info("deleting file : "+filePath);
//                deleteFile(filePath);}
//            catch (Exception e)
//            {
//                loger.error(e);
//            }
//            String fileName = file.getOriginalFilename();
//            int index=fileName.lastIndexOf(".");
//            String domainName =fileName.substring(index);
//            fileName=siteContent.getContentId()+""+ domainName;
//            filePath=uploadPath+"/"+fileName;
//            uploadFile(file,filePath);
//            siteContent.setContentValue(fileName);
//            siteContentService.updateContent(siteContent);
//        }
//        else{
//            siteContentService.updateContent(siteContent);
//        }
//        if(siteContent.getContentType().equals(FILE)) {
//            String contentValue = siteContent.getContentValue();
//            siteContent.setContentValue("resources/assets/sitecontents/" + contentValue);
//        }
//        siteContent.setFile(null);
//        loger.info("Updation of content successfully completed");
//        modelMap.addAttribute(STATUS, SUCCESS);
//        loger.info("Response : " + gson.toJson(siteContent));
//        modelMap.addAttribute(siteContent);
//    }
//
//    /**
//     * uploading and saving the file
//     *
//     * @param file     the uploaded file.
//     * @param filePath the location in which the files are stored.
//     */
//    public void uploadFile(MultipartFile file,String filePath)
//    {
//        loger.info("Starting file upload on the location: "+filePath);
//        try{
//            InputStream inputStream = null;
//            OutputStream outputStream = null;
//            inputStream = file.getInputStream();
//            File newFile = new File(filePath);
//            if (!newFile.exists()) {
//                newFile.createNewFile();
//            }
//            outputStream = new FileOutputStream(newFile);
//            int read = 0;
//            byte[] bytes = new byte[1024];
//            while ((read = inputStream.read(bytes)) != -1) {
//                outputStream.write(bytes, 0, read);
//            }
//            loger.info("File upload success");
//        }
//        catch (IOException e)
//        {
//            loger.error("file upload error",e);
//        }
//    }
//
//    /**
//     * Delete the file.
//     *
//     * @param filePath the file path in which the file need to be delete.
//     * @return the boolean
//     */
//    public boolean deleteFile(String filePath)
//    {
//        File file=new File(filePath);
//        return file.delete();
//    }
//
//    /**
//     * Append url path with file names.
//     *
//     * @param siteContents the site contents
//     */
//    public void appendURLPath(List<SiteContent> siteContents)
//    {
//        for (SiteContent siteContent:siteContents)
//        {
//            if(siteContent.getContentType().equals(FILE)) {
//                String contentValue = siteContent.getContentValue();
//                siteContent.setContentValue("resources/assets/sitecontents/" + contentValue);
//            }
//        }
//    }
//
//    /**
//     * Gets all site content details using organization id.
//     * Fetch organization id from client id or user id.
//     *
//     * @param clientId       the client id
//     * @param userid         the userid
//     * @param servletContext the ServletContext object
//     * @return  ModelMap object containing all the site contents of the give organization
//     */
//    public ModelMap getAllSiteContents(String clientId,int userid,ServletContext servletContext)
//    {
//        ModelMap modelMap=new ModelMap();
//        int organizationId=0;
//        if(userid==0 && clientId.equals("0"))
//        {
//            modelMap.addAttribute(STATUS,FAILURE);
//            modelMap.addAttribute(MESSAGE,"UnAuthorized:404");
//            loger.fatal("userid or clientid is empty!.. 404");
//            return modelMap;
//        }
//        else if(!clientId.equals("0"))
//        {
//            organizationId=organizationHelper.fetchOrganizationIdFromClientId(clientId);
//            if(organizationId==0){
//                modelMap.addAttribute(STATUS,FAILURE);
//                modelMap.addAttribute(MESSAGE,"invalid clientid : 404");
//                loger.fatal("invalid clientid : 404");
//                return modelMap;
//            }
//        }
//        else if(userid!=0)
//        {
//            organizationId = userHelper.getUserOrganizationId(userid);
//        }
//        try {
//            List<SiteContent> siteContents = siteContentService.getContentsOfOrg(organizationId);
//            appendURLPath(siteContents);
//            if(siteContents.size()>0) {
//                modelMap.addAttribute(STATUS,SUCCESS);
//                modelMap.addAttribute(siteContents);
//                loger.info("Response :\n"+gson.toJson(siteContents));
//            }
//            else {
//                loger.fatal("No site contents found for the organizationid : "+organizationId);
//                throw  new Exception();
//            }
//        }
//        catch (Exception e)
//        {
//            modelMap.addAttribute(STATUS,SUCCESS);
//            modelMap.addAttribute(MESSAGE,"No items found!..");
//        }
//        return modelMap;
//    }
//
//    /**
//     * Fetch a SiteContent given by the content key and the user id.
//     *
//     * @param siteContent the site content
//     * @param userid      the userid
//     * @return the ModelMap object
//     */
//    public ModelMap fetchSiteContent(SiteContent siteContent,int userid)
//    {
//        ModelMap modelMap=new ModelMap();
//        if(userid ==0)
//        {
//            loger.fatal("userid is equal to 0.");
//            modelMap.addAttribute(STATUS,FAILURE);
//            modelMap.addAttribute(MESSAGE,"userid found");
//            return modelMap;
//        }
//        int organizationId=userHelper.getUserOrganizationId(userid);
//        try {
//            siteContent = siteContentService.getContents(siteContent.getContentKey(),organizationId);
//            if(siteContent!=null) {
//                modelMap.addAttribute(STATUS,SUCCESS);
//                modelMap.addAttribute(siteContent);
//                loger.info("Response :\n"+gson.toJson(siteContent));
//            }
//            else {
//                throw  new Exception();
//            }
//        }
//        catch (Exception e)
//        {
//            loger.fatal("The given site content ("+siteContent.getContentKey()+") not found for the organizationid : "+organizationId);
//            modelMap.addAttribute(STATUS,FAILURE);
//            modelMap.addAttribute(MESSAGE,"No items found!..");
//        }
//        return modelMap;
//    }
//}