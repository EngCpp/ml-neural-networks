package com.engcpp.controllers;

import java.io.IOException;
import java.net.URL;

import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import org.springframework.stereotype.Component;
import org.tuckey.web.filters.urlrewrite.Conf;
import org.tuckey.web.filters.urlrewrite.UrlRewriteFilter;

@Component
public class MyUrlRewriteFilter extends UrlRewriteFilter {
    private static final String CONFIG_LOCATION = "classpath:urlrewrite.xml";

    @Override
    protected void loadUrlRewriter(FilterConfig filterConfig) throws ServletException {
        try {
            
            checkConf(new Conf(new URL(CONFIG_LOCATION)));
            
        } catch (IOException ex) {
            throw new ServletException("Unable to load URL rewrite configuration file from " + CONFIG_LOCATION, ex);
        }
    }
}