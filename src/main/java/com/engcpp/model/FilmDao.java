package com.engcpp.model;

import com.engcpp.model.entities.Film;
import java.util.List;
import org.springframework.stereotype.Repository;

/**
 *
 * @author engcpp
 */
@Repository
public class FilmDao extends AbstractDao<Film> {
    public Film findById(long filmId) {
        final String hql = "select o from Film o where o.id = :id";
        
        List<Film> films = em.createQuery(hql)
          .setParameter("id", filmId)
          .getResultList();
        
        return (films != null || films.size() > 0) ? films.get(0) : null;
    }
}
