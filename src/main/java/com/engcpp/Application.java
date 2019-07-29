package com.engcpp;

import com.engcpp.utils.DBUtils;
import java.io.FileNotFoundException;
import java.io.IOException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

/**
 *
 * @author engcpp
 */
@SpringBootApplication
@ServletComponentScan
@RestController
public class Application {
    
    
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }      
    
    public static void main(String args[]) throws FileNotFoundException, IOException {
        ConfigurableApplicationContext context = SpringApplication.run(Application.class, args); 
        context.getBean(DBUtils.class).loadDataBase();
    }
    
}