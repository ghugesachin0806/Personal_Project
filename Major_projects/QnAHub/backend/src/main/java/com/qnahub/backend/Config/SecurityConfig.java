package com.qnahub.backend.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
//@EnableWebSecurity <--- In Spring Boot 3 (Spring Security 6), @EnableWebSecurity is optional because Spring Boot
// automatically detects a SecurityFilterChain bean.
public class SecurityConfig {

    // Disabling CSRF
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth.anyRequest().authenticated()) // Requires authentication for all requests
                .csrf(csrf -> csrf.disable()) // Disable CSRF for API requests
                .httpBasic(); // Enable basic authentication

        return http.build();
    }

    // Configuration/Overriding UserDetailsService

}
