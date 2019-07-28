package com.engcpp.model;

import com.engcpp.model.entities.Category;
import com.engcpp.model.entities.CustomerPreferences;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author engcpp
 */
@Repository
public class CustomerPreferencesDao extends AbstractDao<CustomerPreferences> {
    
    public List<CustomerPreferences> findByCustomerId(long customerId){
        Query qry = em.createQuery("select o from CustomerPreferences o "
                                 + "where o.customerId = :customerId "
                                 + "order by o.id desc");
        qry.setParameter("customerId", customerId);
        qry.setMaxResults(3);
        
        return qry.getResultList();
    }
    
    public boolean updateViews(long customerId, List<Category> categories){
        em.persist(
            new CustomerPreferences(customerId, new ArrayList<>(categories))
        );
        return true;
    }    
}
