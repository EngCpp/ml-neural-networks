package com.engcpp.service;

import com.engcpp.model.CategoryDao;
import com.engcpp.model.CustomerPreferencesDao;
import com.engcpp.model.FilmDao;
import com.engcpp.model.entities.Category;
import com.engcpp.model.entities.CustomerPreferences;
import com.engcpp.model.entities.Film;
import com.engcpp.utils.Matrix;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author engcpp
 */
@Service
public class RecommenderService {
    @Autowired
    private FilmDao filmDao;
    
    @Autowired
    private CategoryDao categoryDao;
    
    @Autowired
    private CustomerPreferencesDao customerPreferencesDao;   
    
    public List<Film>gerRecommendation(long customerId) {      
        // Extract views per category 
        List<Category>categories = categoryDao.findAll();
        List<Film>films = filmDao.findAll();
                
        final Matrix customerPrefs = getCustomerPreferences(customerId, categories);
        final Matrix filmsParams = getFilmParams(films, categories);
        
        // Calculate film ratings
        Matrix filmRatings = filmsParams.multiply(customerPrefs);
        
        for (int i=0; i<films.size(); i++) {
            films.get(i)
                 .withRating(filmRatings.get(i, 0));
        }
        
        films = films.stream()
            .sorted(Comparator.comparing(Film::getRating).reversed())
            .limit(10)
            .collect(Collectors.toList());            
        
        return films;
    }   
    
    
    private Matrix getFilmParams(List<Film>films, List<Category>categories) {
        double filmsData[][] = new double[films.size()][categories.size()];
        
        for (int f=0; f<films.size(); f++) {
            for (int c=0; c<categories.size(); c++) {         
                filmsData[f][c] = 
                films.get(f).getCategories().contains(categories.get(c)) ? 
                    1 : 0;
            }
        }   
        
        return new Matrix(filmsData);    
    }    
    
    private Matrix getCustomerPreferences(long customerId, List<Category>categories) {
        // Extract views per category         
        double categoriesData[] = new double[categories.size()];
        List<CustomerPreferences> preferences = customerPreferencesDao.findByCustomerId(customerId);   
        
        for (CustomerPreferences preference : preferences) {
            for (int c=0; c<categories.size(); c++) {                         
                categoriesData[c] += (preferences != null && 
                    preference.getCategories().contains(categories.get(c)))
                  ? 1 : 0;
            }                                
        }        
        
        return new Matrix(categoriesData);    
    }
    
}
