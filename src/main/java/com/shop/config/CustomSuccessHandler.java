package com.shop.config;

import com.shop.models.User;
import com.shop.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * Implementing UrlAuthenticationSuccessHandler after success authentication
 */
@Component
public class CustomSuccessHandler extends SimpleUrlAuthenticationSuccessHandler{


//    @Qualifier(value = "userService")
    @Autowired
    private UserService userService;

    private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

    String role;

    public String getRole() {
        return role;
    }

    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    protected void handle(HttpServletRequest request,
                          HttpServletResponse response, Authentication authentication) throws IOException {
        String targetUrl = determineTargetUrl(authentication);
        setCookie(authentication.getName(),response,role);
        if (response.isCommitted()) {
            return;
        }

        redirectStrategy.sendRedirect(request, response, targetUrl);
    }

    protected String determineTargetUrl(Authentication authentication) {
        String url="";

        Collection<? extends GrantedAuthority> authorities =  authentication.getAuthorities();

        List<String> roles = new ArrayList<String>();

        for (GrantedAuthority a : authorities) {
            roles.add(a.getAuthority());
        }
        if (isAdmin(roles)) {
            url = "/admin";
            role  = "admin";
        } else if (isUser(roles)) {
            url = "/home";
            role = "user";
        } else {
            url="/404";
        }

        return url;
    }

    public void setRedirectStrategy(RedirectStrategy redirectStrategy) {
        this.redirectStrategy = redirectStrategy;
    }
    protected RedirectStrategy getRedirectStrategy() {
        return redirectStrategy;
    }


    private boolean isAdmin(List<String> roles) {
        if (roles.contains("ROLE_ADMIN")) {
            return true;
        }
        return false;
    }

    private boolean isUser(List<String> roles) {
        if (roles.contains("ROLE_USER")) {
            return true;
        }
        return false;
    }

    /**
     * Setting cookie after login
     *
     * @param userName the user name
     * @param response the HttpServletResponse response object
     * @param role     the user role
     */
    @Transactional
    public void setCookie(String userName,HttpServletResponse response,String role)
    {
        User user = userService.findUser(userName);
        Cookie cookie = new Cookie("userid",user.getUserId()+"");
        response.addCookie(cookie);
        cookie = new Cookie("role",role);
        response.addCookie(cookie);
    }
}