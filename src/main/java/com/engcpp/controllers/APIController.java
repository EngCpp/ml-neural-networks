package com.engcpp.controllers;

import com.engcpp.model.CustomerPreferencesDao;
import com.engcpp.model.FilmDao;
import com.engcpp.model.entities.Film;
import com.engcpp.service.RecommenderService;
import static java.util.Arrays.asList;
import static java.util.Collections.emptyList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import static org.springframework.transaction.annotation.Propagation.REQUIRES_NEW;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author engcpp
 */
@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "api")
public class APIController {
    private static final long CUSTOMER_ID = 1;
    
    @Autowired
    private RecommenderService recommenderService;
    
    @Autowired
    private FilmDao filmDao;       
    
    @Autowired
    private CustomerPreferencesDao customerPreferencesDao;    
        
    @GetMapping(path = "/recommendations")
    public List<Film>getRecommendations() {
        return recommenderService.gerRecommendation(CUSTOMER_ID);
    }

    @GetMapping(path = "/films")
    public List<Film>getFims() {
        return filmDao.findAll();
    }
    
    @GetMapping(path = "/films/{filmId}")
    public List<Film> getFimById(@PathVariable(value = "filmId") Long filmId) {
        return (filmId != null) ? asList(filmDao.findById(filmId)) : emptyList();
    }    
    
    @Transactional(propagation = REQUIRES_NEW)
    @PostMapping(path = "/films/watch/{filmId}")
    public void watch(@PathVariable(value = "filmId") Long filmId) {
        if (filmId != null) {
            Film film = filmDao.findById(filmId);
                 
            if (film != null) {                
                customerPreferencesDao.updateViews(CUSTOMER_ID, film.getCategories());               
                filmDao.edit(film.withViews(film.getViews()+1));
            }
        }
    }      
}
