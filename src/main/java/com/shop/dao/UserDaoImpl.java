package com.shop.dao;
import com.shop.models.User;
import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * The implementation class for the interface UserDao.
 */
@Transactional
@Repository
public class UserDaoImpl implements UserDao {

    private static final Logger loger = Logger.getLogger(UserDaoImpl.class);
    private static final String EMAIL_ID="emailId";
    private static final String PASSWORD="password";
    private static final String USER_ID="userId";

    @Autowired(required = true)
    private SessionFactory sessionFactory;

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    public void addUser(User user) {
        Session session=sessionFactory.openSession();
        session.save(user);
    }

    public void updateUser(User user) {
        Session session=sessionFactory.getCurrentSession();
        session.update(user);
    }

    public void deleteUser(User user) {
        Session session=sessionFactory.getCurrentSession();
        session.delete(user);
    }

    public User findUser(int userId) {
        Session session=sessionFactory.getCurrentSession();
        Criteria criteria = session.createCriteria(User.class);
        criteria.add(Restrictions.eq(USER_ID, userId));
        List result = criteria.list();
        if(result.size()!=0)
        {
            return (User)result.get(0);
        }
        return null;
    }

    public User searchUserByMail(String emailId)
    {
        try {
            Session session = sessionFactory.getCurrentSession();
            Criteria criteria = session.createCriteria(User.class);
            criteria.add(Restrictions.eq(EMAIL_ID, emailId));
            criteria.setMaxResults(1);
            List result = criteria.list();
            if (result.size() != 0) {
                return (User) result.get(0);
            }
        }
        catch (Exception e)
        {
            loger.error(e.getMessage());
        }
        return null;
    }

    public User findUser(String username,String password)
    {
        try {
            Session session = sessionFactory.getCurrentSession();
            Criteria criteria = session.createCriteria(User.class);
            criteria.add(Restrictions.eq(EMAIL_ID, username));
            criteria.add(Restrictions.eq(PASSWORD, password));
            criteria.setMaxResults(1);
            List result = criteria.list();
            if (result.size() != 0) {
                return (User) result.get(0);
            }
        }
        catch (Exception e)
        {
           loger.error(e.getMessage());
        }
        return null;
    }

    public User findUser(String username)
    {
        Session session = null;
        try {
            session=sessionFactory.getCurrentSession();
        }
        catch (Exception e){
            session = sessionFactory.openSession();
        }
        session.beginTransaction();
        Criteria criteria = session.createCriteria(User.class);
        criteria.add(Restrictions.eq(EMAIL_ID, username));
        criteria.setMaxResults(1);
        List result = criteria.list();
        if(result.size()!=0)
        {
            return (User)result.get(0);
        }
        return null;
    }

    public List<User> listAllUsers()
    {
        Session session=sessionFactory.getCurrentSession();
        Query query=session.createQuery("from com.shop.models.User");
        List<User> userList =query.list();
        return userList;
    }

    public List<Object> getAllUsers()
    {
        Session session=sessionFactory.getCurrentSession();
        Query query=session.createQuery("select u.userId, u.name, u.emailId, u.organizationId, u.roleId " +
                "from com.shop.models.User u");
        List<Object> userList =query.list();
        return userList;
    }

    public User findOtherUsers(int roleId,int userId)
    {
        Session session=sessionFactory.getCurrentSession();
        Query query=session.createQuery("FROM  com.shop.models.User u where u.userId!="+userId + "AND u.roleId="+roleId);
        List<Object> userList =query.list();
        if(userList.size() > 0)
        {
            return (User) userList.get(0);
        }
        return null;
    }

}