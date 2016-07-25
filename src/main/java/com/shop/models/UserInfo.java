package com.shop.models;

/**
 * The UserInfo class represents the user and their dependents list.
 */
public class UserInfo {
   private String name;
   private String[] dependents;

    public UserInfo() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String[] getDependents() {
        return dependents;
    }

    public void setDependents(String[] dependents) {
        this.dependents = dependents;
    }

}