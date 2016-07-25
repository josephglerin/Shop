package com.shop.services;
import com.shop.dao.UserRoleDao;
import com.shop.models.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

/**
 * The implementation class for the interface UserRoleService.
 */
@Service
public class UserRoleServiceImpl implements UserRoleService{

    @Autowired
    private UserRoleDao userRoleDao;

    public void setUserRoleDao(UserRoleDao userRoleDao) {
        this.userRoleDao = userRoleDao;
    }

    @Transactional
    public void addUserRole(UserRole userRole) {
        userRoleDao.addUserRole(userRole);
    }

    @Transactional
    public List<UserRole> userRoleList() {
        return userRoleDao.userRoleList();
    }

    @Transactional
    public UserRole getRolePermissions(int roleId) {
       return userRoleDao.getRolePermissions(roleId);
    }

    @Transactional
    public void updateUserRole(UserRole userRole) {
        userRoleDao.updateUserRole(userRole);
    }

    @Transactional
    public void deleteUserRole(UserRole userRole) {
        userRoleDao.deleteUserRole(userRole);
    }

}