package com.shop.models;
import javax.persistence.*;

/**
 * The User class represents the various users registered under a particular organization.
 * Each user have an associated role.
 * The role may be an admin or a super admin.
 */
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;

    @Column(name = "name")
    private String name;

    @Column(name = "EMAIL_ID")
    private String emailId;

    @Column(name = "password")
    String password;

    @Column(name = "phone_no")
    private Integer phoneNo;

    @Column(name = "role_id")
    private int roleId;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="role_id",updatable = false,insertable = false)
    private UserRole userRole;



    public User() {
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmailId() {
        return emailId;
    }

    public int getRoleId() {
        return roleId;
    }

    public void setRoleId(int roleId) {
        this.roleId = roleId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserRole getUserRole() {
        return userRole;
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
    }

    public Integer getPhoneNo() {
        return phoneNo;
    }


    public void setPhoneNo(Integer phoneNo) {
        this.phoneNo = phoneNo;
    }

}