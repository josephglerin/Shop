package com.shop.config;

import org.apache.commons.dbcp2.BasicDataSource;
import org.apache.log4j.Logger;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.jndi.JndiTemplate;
import org.springframework.orm.hibernate3.HibernateTransactionManager;
import org.springframework.orm.hibernate3.annotation.AnnotationSessionFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;;
import javax.naming.NamingException;
import javax.sql.DataSource;
import java.util.Properties;


/**
 * The  Hibernate configuration class for database connectivity, session management and transaction management with hibernate.
 */
@Configuration
@EnableTransactionManagement
@ComponentScan({"com.shop"})
@PropertySource(value = {"classpath:hibernate.properties","classpath:database.properties"})
public class HibernateConfiguration {

    private static final String PACKAGES_TO_SCAN="com.shop";

    @Autowired
    private Environment environment;
    private final static Logger loger = Logger.getLogger(HibernateConfiguration.class);

    /**
     * Creating hibernate session
     *
     * @return the AnnotationSessionFactoryBean object
     */
    @Bean
    public AnnotationSessionFactoryBean sessionFactory() {
        AnnotationSessionFactoryBean sessionFactory = new AnnotationSessionFactoryBean();
        try {
            sessionFactory.setDataSource(dataSource());
            sessionFactory.setHibernateProperties(hibernateProperties());
            sessionFactory.setPackagesToScan(new String[]{PACKAGES_TO_SCAN});
        }
        catch (Exception e)
        {
            loger.error("Cannot find resource!.. " + e);
            loger.fatal("Application going to exit!..");
        }
        return sessionFactory;
    }

    /**
     * Gets commons multipart resolver for file uploading.
     *
     * @return the CommonsMultipartResolver object.
     */
    @Bean(name = "multipartResolver")
    public CommonsMultipartResolver getCommonsMultipartResolver() {
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
        multipartResolver.setMaxUploadSize(20971520);   // 20MB
        multipartResolver.setMaxInMemorySize(1048576);  // 1MB
        return multipartResolver;
    }

    /**
     * Getting DataSource for creating hibernate session
     * <p>Note:The DataSource is registered in the JNDI.</p>
     * @return the DataSource object
     * @throws NamingException the JNDI name cannot be found if the DataSource is not registered.
     */

    @Bean(name = "dataSource")
    public BasicDataSource dataSource() {
        BasicDataSource dataSource = new BasicDataSource();
        dataSource.setDriverClassName(environment.getRequiredProperty("jdbc.driverClassName"));
        dataSource.setUrl(environment.getRequiredProperty("jdbc.url"));
        dataSource.setUsername(environment.getRequiredProperty("jdbc.username"));
        dataSource.setPassword(environment.getRequiredProperty("jdbc.password"));
        return dataSource;
    }

    /**
     * Getting different properties for hibernate other than datasource.
     *
     * @return the Properties object
     */
    private Properties hibernateProperties() {
        Properties properties = new Properties();
        properties.put("hibernate.dialect", environment.getRequiredProperty("hibernate.dialect"));
        properties.put("hibernate.show_sql", environment.getRequiredProperty("hibernate.show_sql"));
        properties.put("hibernate.format_sql", environment.getRequiredProperty("hibernate.format_sql"));
//        properties.put("hibernate.current_session_context_class", environment.getRequiredProperty("hibernate.current_session_context_class"));
        properties.put("hibernate.hbm2ddl.auto", environment.getRequiredProperty("hibernate.hbm2ddl.auto"));
        return properties;
    }

    /**
     * setting up hibernates Transaction manager.
     *
     * @param sessionFactory the hibernate SessionFactory object
     * @return the HibernateTransactionManager object
     */
    @Bean
//    @Autowired
    public HibernateTransactionManager transactionManager(SessionFactory sessionFactory) {
        HibernateTransactionManager txManager = new HibernateTransactionManager();
        txManager.setSessionFactory(sessionFactory);
        return txManager;
    }

}