package com.engcpp.model.entities;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author engcpp
 */
@Entity
@Table(name="category")
public class Category implements Serializable {
    @Id
    private long id;
    
    @Column
    private String name;
    
    public Category(){}
    
    public Category(long id, String name) {
       this.id = id;
       this.name = name;
    }
    
    public long getId() {
        return id;
    }

    public Category withId(long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public Category withName(String name) {
        this.name = name;
        return this;
    }
    
    @Override
    public int hashCode() {
        int hash  = 0;
            hash += id;
        return hash;
    }        
    
    @Override
    public boolean equals(Object object) {
        if (!(object instanceof Category))
            return false;
        
        return (this.getId() == ((Category) object).getId());
    }       
    
    @Override
    public String toString(){
        StringBuilder sb = new StringBuilder();
        sb.append("Category(")
          .append("id="+id)
          .append(", name="+name)
          .append(")");
        
        return sb.toString();
    }    
}
