package com.shop.dao;
import com.shop.models.UserRole;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * The implementation class for the interface UserRoleDao.
 */
@Repository
public class UserRoleDaoImpl implements UserRoleDao  {

    @Autowired
    private SessionFactory sessionFactory;

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    public void addUserRole(UserRole userRole) {
        Session session=sessionFactory.getCurrentSession();
        session.save(userRole);
    }

    public List<UserRole> userRoleList() {
        Session session=sessionFactory.getCurrentSession();
        session.beginTransaction();
        Query query=session.createQuery("from com.shop.models.UserRole");
        List<UserRole> userRoles=query.list();
        return userRoles;
    }

    public UserRole getRolePermissions(int roleId) {
        Session session=sessionFactory.getCurrentSession();
        UserRole userRole=(UserRole)session.get(UserRole.class,roleId);
        return userRole;
    }

    public void updateUserRole(UserRole userRole) {
        Session session=sessionFactory.getCurrentSession();
        session.update(userRole);
    }

    public void deleteUserRole(UserRole userRole) {
        Session session=sessionFactory.getCurrentSession();
        session.delete(userRole);
    }
}