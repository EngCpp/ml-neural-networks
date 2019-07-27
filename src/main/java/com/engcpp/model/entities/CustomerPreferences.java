package com.engcpp.model.entities;

import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "customer_preferences")
public class CustomerPreferences implements Serializable {
    
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long id;
    
    @Column
    private long customerId;
    
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Category>categories;
    
    public CustomerPreferences(){}
    public CustomerPreferences(long customerId, List<Category>categories){
        this.customerId = customerId;
        this.categories = categories;
    }
    
    public List<Category> getCategories(){
        return categories;
    } 
}
