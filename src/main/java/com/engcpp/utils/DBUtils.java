package com.engcpp.utils;

import com.engcpp.model.CategoryDao;
import com.engcpp.model.FilmDao;
import com.engcpp.model.entities.Category;
import com.engcpp.model.entities.Film;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import static java.util.Arrays.asList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import static org.apache.commons.lang3.StringUtils.isNotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 *
 * @author engcpp
 */
@Component
public class DBUtils {
    @Autowired
    private CategoryDao categoryDao;
    
    @Autowired
    private FilmDao filmDao;    
        
    public void loadDataBase() throws IOException  {        
        long id = 0;
        for(String line : loadData("categories.txt")){
            // Create Categories 
            if (isNotBlank(line)) {
                String[]fields = line.split(",");
                String name = fields[0];
                       name = name.trim();
                categoryDao.create(new Category(++id, name));
            }
        }
        
        List<Category>categoryList = categoryDao.findAll();
        
        id = 0;
        for(String line : loadData("films.txt")){            
            // Create films   
            if (isNotBlank(line)) {
                String[]fields = line.split(",", 3);
                String title = fields[0].trim();
                String filmImage = fields[1].trim();
                String filmCategories = fields[2].trim();
                
                filmCategories = filmCategories.trim();
                filmCategories = filmCategories.replaceAll("[\\[\\](){}]","");

                List<Category>categories = 
                asList(filmCategories.split(",")).stream().map(c->c.trim()).map(c->{
                    Optional<Category>opt = categoryList.stream()
                              .filter(f->f.getName().equalsIgnoreCase(c))
                              .findFirst();

                    return (opt.isPresent()) ? opt.get() : null;
                }).filter(c->c!=null)
                  .collect(Collectors.toList());

                //long views = (long)(Math.random()*10);
                filmDao.create(new Film()
                            .withId(++id)
                            .withName(title)
                            .withCategories(categories)
                            .withViews(1)
                            .withImage(filmImage));
            }
        }
   
    }    
    
    private List<String> loadData(String filename) throws IOException {
        BufferedReader reader = new BufferedReader(new FileReader(new File("./resources/"+filename)));         
        return reader.lines().collect(Collectors.toList());
    }
}
