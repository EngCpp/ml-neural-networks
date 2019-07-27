package com.engcpp.model.entities;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 *
 * @author engcpp
 */
@Entity
@Table(name = "film")
public class Film implements Serializable {    
    @Id
    private long id;
    
    @Column
    private String name;
    
    @Column
    private long views;
    
    @Column
    private String image;
    
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Category> categories;
        
    @JsonInclude
    @Transient
    private double rating;
    
    public Film(){}    
    
    public long getId() {
        return id;
    }

    public Film withId(long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public Film withName(String name) {
        this.name = name;
        return this;
    }

    public long getViews() {
        return views;
    }

    public Film withViews(long views) {
        this.views = views;
        return this;
    }    
    
    public List<Category> getCategories() {
        return categories;
    }

    public Film withCategories(List<Category> categories) {
        this.categories = categories;
        return this;
    }
    
    public Film withRating(double rating) {
        this.rating = rating;
        return this;
    }       
    
    public double getRating() {
        return rating;
    }
    
    public Film withImage(String image) {
        this.image = image;
        return this;
    }       
    
    public String getImage() {
        return image;
    }
        
    
    @Override
    public int hashCode() {
        int hash  = 0;
            hash += getId();
        return hash;
    }        
    
    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Film))
            return false;
        
        return (this.getId() == ((Film) object).getId());
    }         
    
    @Override
    public String toString(){
        StringBuilder sb = new StringBuilder();
        sb.append("Film(")
          .append("id="+id)
          .append(", title="+name)
          .append(", categories="+this.categories)
          .append(")");
        
        return sb.toString();
    }
}
