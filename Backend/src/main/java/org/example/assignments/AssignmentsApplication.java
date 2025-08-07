package org.example.assignments;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.web.config.EnableSpringDataWebSupport;

@SpringBootApplication
@EnableSpringDataWebSupport(pageSerializationMode = EnableSpringDataWebSupport.PageSerializationMode.VIA_DTO)
public class AssignmentsApplication {

    public static void main(String[] args) {
        SpringApplication.run(AssignmentsApplication.class, args);
        System.out.println("Hello World");
    }
}
