package com.shop.config;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.accept.ContentNegotiationManager;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.ContentNegotiatingViewResolver;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;
import org.springframework.web.servlet.view.freemarker.FreeMarkerViewResolver;
import java.util.ArrayList;
import java.util.List;

/**
 * The  shop configuration class for spring MVC.
 */
@Configuration
@EnableWebMvc
@ComponentScan(basePackages = "com.shop")
@EnableTransactionManagement
public class AppConfiguration extends WebMvcConfigurerAdapter {

    private static final String RESOURCE_HANDLER_1 ="/resources/**";
    private static final String RESOURCE_HANDLER_2 ="/assets/**";
    private static final String RESOURCE_HANDLER_3 ="/admin/assets/**";
    private static final String RESOURCE_LOCATION_2 ="/resources/assets/";
    private static final String RESOURCE_LOCATION_1 ="/resources/";
    private static final String TEMPLATE_LOADER_PATH ="/WEB-INF/view/ftl";
    private static final String BASE_NAME ="messages";
    private static final String FTL_PREFIX ="";
    private static final String FTL_SUFFIX =".ftl";
    private static final String JSP_PREFIX ="/WEB-INF/view/ftl/";
    private static final String JSP_SUFFIX =".jsp";

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler(RESOURCE_HANDLER_1)
                .addResourceLocations(RESOURCE_LOCATION_1);

        registry.addResourceHandler(RESOURCE_HANDLER_2)
                .addResourceLocations(RESOURCE_LOCATION_2);

        registry.addResourceHandler(RESOURCE_HANDLER_3)
                .addResourceLocations(RESOURCE_LOCATION_2);
    }

    /**
     * Creating FreeMarkerViewResolver object that is used by the spring framework for rendering ftl pages
     * <p> Note: The prefix and suffix are automatically added at the time of view name mapping</p>
     * @return FreeMarkerViewResolver object
     */
    @Bean
    public ViewResolver FreeMarkerViewResolver() {
        FreeMarkerViewResolver freeMarkerViewResolver = new FreeMarkerViewResolver();
        freeMarkerViewResolver.setCache(true);
        freeMarkerViewResolver.setPrefix(FTL_PREFIX);
        freeMarkerViewResolver.setSuffix(FTL_SUFFIX);
        return freeMarkerViewResolver;
    }


    @Bean
    public ViewResolver getJSPViewResolver(){
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
        resolver.setCache(true);
        resolver.setPrefix(JSP_PREFIX);
        resolver.setSuffix(JSP_SUFFIX);
        return resolver;
    }


    /**
     * Adding resource bundle message source.
     *
     * @return the ResourceBundleMessageSource object.
     */
    @Bean
    public MessageSource messageSource() {
        ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
        messageSource.setBasename(BASE_NAME);
        return messageSource;
    }

    /**
     * Configuring the location in which the ftl pages are loaded.
     *
     * @return the FreeMarkerConfigurer object
     */
    @Bean
    public FreeMarkerConfigurer freeMarkerConfigurer()
    {
        FreeMarkerConfigurer freeMarkerConfigurer=new FreeMarkerConfigurer();
        freeMarkerConfigurer.setTemplateLoaderPath(TEMPLATE_LOADER_PATH);
        return freeMarkerConfigurer;
    }

    /**
     * Registering JsonViewResolver and FreeMarkerViewResolver to ContentNegotiatingViewResolver in which it helps resolving a view based on the actual content.
     * *
     * @param contentNegotiationManager object
     * @return ContentNegotiatingViewResolver object
     */
    @Bean
    public ViewResolver contentNegotiatingViewResolver(ContentNegotiationManager contentNegotiationManager) {
        ContentNegotiatingViewResolver resolver = new ContentNegotiatingViewResolver();
        resolver.setContentNegotiationManager(contentNegotiationManager);
        List<ViewResolver> resolvers = new ArrayList<ViewResolver>();
        resolvers.add(jsonViewResolver());
        resolvers.add(FreeMarkerViewResolver());
        resolvers.add(getJSPViewResolver());
        resolver.setViewResolvers(resolvers);
        return resolver;
    }

    /**
     * Json view resolver for rendering Json output.
     *
     * @return the ViewResolver object
     */
    @Bean
    public ViewResolver jsonViewResolver() {
        return new JsonViewResolver();
    }
}