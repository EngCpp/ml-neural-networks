package com.engcpp;

import com.engcpp.model.CustomerPreferencesDao;
import com.engcpp.model.FilmDao;
import com.engcpp.model.entities.Film;
import com.engcpp.service.RecommenderService;
import com.engcpp.utils.DBUtils;
import java.io.FileNotFoundException;
import java.io.IOException;
import static java.util.Arrays.asList;
import static java.util.Collections.emptyList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import static org.springframework.transaction.annotation.Propagation.REQUIRES_NEW;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

/**
 *
 * @author engcpp
 */
@SpringBootApplication
@ServletComponentScan
@RestController
@CrossOrigin(origins = "*")
public class Application {
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
        
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }      
    
    public static void main(String args[]) throws FileNotFoundException, IOException {
        ConfigurableApplicationContext context = SpringApplication.run(Application.class, args); 
        context.getBean(DBUtils.class).loadDataBase();
    }
}