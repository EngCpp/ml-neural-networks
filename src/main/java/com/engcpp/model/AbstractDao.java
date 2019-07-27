package com.engcpp.model;

import java.lang.reflect.ParameterizedType;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import static javax.transaction.Transactional.TxType.REQUIRES_NEW;
import org.apache.log4j.Logger;

/**
 *
 * @author engcpp
 */
public abstract class AbstractDao<T> {
    @PersistenceContext
    protected EntityManager em;
    
    private Logger logger = Logger.getLogger(AbstractDao.class);
    
    private Class<T>persistentClass;
    
    public AbstractDao() {
        this.persistentClass = (Class<T>) ((ParameterizedType)getClass().getGenericSuperclass()).getActualTypeArguments()[0];
    }
    
    @Transactional(REQUIRES_NEW)
    public void create(T entity) {
       logger.debug("create: "+entity.toString());
       em.persist(em.merge(entity));
       em.flush();        
    }

    public T edit(T entity) {
        logger.debug("edit: "+entity.toString());
        return em.merge(entity);         
    }

    public void remove(T entity) {
        logger.debug("remove: "+entity.toString());
        em.remove(em.merge(entity));
    }    
    
    public List<T> findAll() {
        String hql = "select t from " + persistentClass.getSimpleName() + " t";
        return em.createQuery(hql).getResultList();
    }    
}
