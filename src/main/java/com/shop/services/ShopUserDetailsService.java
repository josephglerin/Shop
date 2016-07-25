package com.shop.services;

import com.shop.dao.UserDao;
import com.shop.models.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * The type Kbyg user details service.
 */
@Service("shopUserDetailsService")
public class ShopUserDetailsService implements UserDetailsService {

    @Autowired
    private UserDao userDao;

    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    @Transactional(readOnly=true)
    public UserDetails loadUserByUsername(final String username)
            throws UsernameNotFoundException {
        com.shop.models.User user = userDao.findUser(username);
        if (user == null)
        {
            throw new UsernameNotFoundException("User cannot found!..");
        }
        Set <UserRole> userRoles = new HashSet<UserRole>();
        userRoles.add(user.getUserRole());
        List<GrantedAuthority> authorities = buildUserAuthority(userRoles);

        return buildUserForAuthentication(user, authorities);

    }

    // Converts com.shop.users.model.User user to
    // org.springframework.security.core.userdetails.User
    private User buildUserForAuthentication(com.shop.models.User user,
                                            List<GrantedAuthority> authorities) {
        return new User(user.getEmailId(), user.getPassword(),
                true, true, true, true, authorities);
    }

    private List<GrantedAuthority> buildUserAuthority(Set<UserRole> userRoles) {

        Set<GrantedAuthority> setAuths = new HashSet<GrantedAuthority>();

        // Build user's authorities
        for (UserRole userRole : userRoles) {
            setAuths.add(new SimpleGrantedAuthority(userRole.getRoleName()));
        }

        List<GrantedAuthority> Result = new ArrayList<GrantedAuthority>(setAuths);

        return Result;
    }

}