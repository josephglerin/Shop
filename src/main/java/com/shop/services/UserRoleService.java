package com.shop.services;
import com.shop.models.UserRole;
import java.util.List;

/**
 * The interface UserRoleService.
 */
public interface UserRoleService {

    /**
     * Add user role.
     *
     * @param userRole the instance of the class UserRole
     */
    public void addUserRole(UserRole userRole);

    /**
     * List all user roles.
     *
     * @return the list of objects of class UserRole.
     */
    public List<UserRole> userRoleList();

    /**
     * Gets role permissions for a given role id.
     *
     * @param roleId the role id
     * @return the instance of the class UserRole
     */
    public UserRole getRolePermissions(int roleId);

    /**
     * Update user role.
     *
     * @param userRole the instance of the class UserRole
     */
    public void updateUserRole(UserRole userRole);

    /**
     * Delete user role.
     *
     * @param userRole the instance of the class UserRole
     */
    public void deleteUserRole(UserRole userRole);
}