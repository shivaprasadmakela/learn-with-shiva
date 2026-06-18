package com.bugfix.learning.config;

import com.bugfix.learning.entity.*;
import com.bugfix.learning.repository.*;
import com.bugfix.profile.entity.UserProfile;
import com.bugfix.profile.repository.UserProfileRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final CourseRepository courseRepository;
    private final CourseModuleRepository courseModuleRepository;
    private final LessonRepository lessonRepository;
    private final QuizQuestionRepository quizQuestionRepository;
    private final UserProfileRepository userProfileRepository;

    public DatabaseSeeder(CourseRepository courseRepository,
                          CourseModuleRepository courseModuleRepository,
                          LessonRepository lessonRepository,
                          QuizQuestionRepository quizQuestionRepository,
                          UserProfileRepository userProfileRepository) {
        this.courseRepository = courseRepository;
        this.courseModuleRepository = courseModuleRepository;
        this.lessonRepository = lessonRepository;
        this.quizQuestionRepository = quizQuestionRepository;
        this.userProfileRepository = userProfileRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Only seed if empty
        if (courseRepository.count() == 0) {
            seedCourses();
        }

        // Seed default profile if empty
        if (userProfileRepository.count() == 0) {
            seedProfile();
        }
    }

    private void seedProfile() {
        UserProfile defaultProfile = new UserProfile(
                null,
                "learner_1",
                "Alex Learner",
                "👨‍💻",
                "Apprentice Fullstack Developer",
                "Learning React and Spring Boot to build beautiful, responsive web applications."
        );
        userProfileRepository.save(defaultProfile);
    }

    private void seedCourses() {
        // 1. Primary Fullstack Course
        Course fullstackCourse = new Course(
                null,
                "React & Spring Boot Fullstack Development",
                "Build modern, end-to-end web applications combining the reactive power of a React TypeScript frontend with the robust, enterprise-grade architecture of a Spring Boot backend.",
                "Fullstack",
                "12 Hours",
                "Beginner to Advanced",
                "fullstack_course"
        );
        Course savedCourse = courseRepository.save(fullstackCourse);
        Long courseId = savedCourse.getId();

        // --- MODULE 1 ---
        CourseModule module1 = courseModuleRepository.save(new CourseModule(null, courseId, "Introduction to Fullstack Architectures", 1));
        
        Lesson lesson1_1 = lessonRepository.save(new Lesson(
                null,
                module1.getId(),
                "Understanding the Client-Server Web Model",
                "### The Client-Server Model\n\n" +
                "At the core of modern web development is the **Client-Server Architecture**. In this layout, tasks are shared between providers of a resource or service (called **servers**) and service requesters (called **clients**).\n\n" +
                "Client-server applications communicate via the **Hypertext Transfer Protocol (HTTP)**. The client initiates a request, and the server processes it and sends back a response.\n\n" +
                "```\n" +
                "+------------------+      HTTP Request       +------------------+\n" +
                "|                  |  -------------------->  |                  |\n" +
                "|  React Client    |                         |  Spring Server   |\n" +
                "|  (Browser UI)    |  <--------------------  |  (REST API)      |\n" +
                "|                  |      HTTP Response      |                  |\n" +
                "+------------------+                         +------------------+\n" +
                "```\n\n" +
                "### Understanding RESTful API Design\n\n" +
                "**REST** (Representational State Transfer) is an architectural style for design APIs. RESTful services use standard HTTP methods to perform CRUD operations:\n\n" +
                "- **GET**: Retrieve resource details. Must be safe and idempotent (should not alter state).\n" +
                "- **POST**: Create a new resource on the server.\n" +
                "- **PUT**: Replace/Update an existing resource entirely. Must be idempotent.\n" +
                "- **DELETE**: Remove a resource from the server.\n\n" +
                "### Standard HTTP Status Codes\n\n" +
                "Servers use numeric status codes to communicate request outcomes:\n\n" +
                "- `200 OK`: Request succeeded.\n" +
                "- `201 Created`: Resource successfully created (common response for POST requests).\n" +
                "- `400 Bad Request`: Client request had syntax errors or bad data values.\n" +
                "- `404 Not Found`: Requested resource does not exist on the server.\n" +
                "- `500 Internal Server Error`: Server encountered a bug or database failure.",
                1,
                45
        ));

        quizQuestionRepository.save(new QuizQuestion(
                null,
                lesson1_1.getId(),
                "Which HTTP method is designed to be idempotent and is typically used to update an existing resource entirely?",
                "POST;PUT;GET;DELETE",
                1,
                "PUT is idempotent, meaning multiple identical requests will have the same effect as a single request. It is typically used to update resources."
        ));

        quizQuestionRepository.save(new QuizQuestion(
                null,
                lesson1_1.getId(),
                "What does REST stand for?",
                "Representation State Transfer;Representational State Transfer;Routing Entity Service Template;Request Response System",
                1,
                "REST stands for Representational State Transfer, coined by Roy Fielding in 2000."
        ));

        Lesson lesson1_2 = lessonRepository.save(new Lesson(
                null,
                module1.getId(),
                "Fullstack Developer Environment Setup",
                "### System Prerequisites\n\n" +
                "To build fullstack applications locally, you must install developer runtimes on your machine. Ensure the following are set up:\n\n" +
                "1. **Java Development Kit (JDK 21)**: The latest Long-Term Support (LTS) release of the Java Platform.\n" +
                "2. **Node.js (LTS version)**: The Javascript runtime needed to execute npm commands and bundle React UI assets.\n" +
                "3. **An IDE**: VS Code for frontends, and IntelliJ IDEA or Eclipse for Spring Boot backends.\n\n" +
                "### Creating a React TypeScript Frontend with Vite\n\n" +
                "Vite is a modern, light builder that starts servers extremely fast. Run the following command in terminal to bootstrap your UI project:\n\n" +
                "```bash\n" +
                "npm create vite@latest tms-ui -- --template react-ts\n" +
                "cd tms-ui\n" +
                "npm install\n" +
                "```\n\n" +
                "### Initializing a Spring Boot Backend\n\n" +
                "Spring Initializr (`start.spring.io`) makes it easy to generate the initial directory structure for Spring projects. Select the following dependencies:\n\n" +
                "- **Spring Web**: Builds REST endpoints using Spring MVC.\n" +
                "- **Spring Data JPA**: Automates SQL queries with Java Persistence API.\n" +
                "- **H2 Database**: Fast, in-memory database ideal for development and testing.",
                2,
                40
        ));

        quizQuestionRepository.save(new QuizQuestion(
                null,
                lesson1_2.getId(),
                "Which tool is commonly used to create and serve React TypeScript bundles in modern development?",
                "Maven;Webpack;Vite;Spring Boot",
                2,
                "Vite is a fast build tool and development server that has largely replaced Webpack for modern frontend bundling."
        ));

        // --- MODULE 2 ---
        CourseModule module2 = courseModuleRepository.save(new CourseModule(null, courseId, "Frontend Engineering with React", 2));

        Lesson lesson2_1 = lessonRepository.save(new Lesson(
                null,
                module2.getId(),
                "React Functional Components & Hooks",
                "### Functional Components\n\n" +
                "In React, a component is a reusable JavaScript function that returns **JSX** (HTML-like markup). TypeScript enforces strict typing on component props:\n\n" +
                "```tsx\n" +
                "interface UserCardProps {\n" +
                "  name: string;\n" +
                "  role: string;\n" +
                "}\n\n" +
                "export const UserCard: React.FC<UserCardProps> = ({ name, role }) => {\n" +
                "  return (\n" +
                "    <div className=\"card\">\n" +
                "      <h3>{name}</h3>\n" +
                "      <p>{role}</p>\n" +
                "    </div>\n" +
                "  );\n" +
                "};\n" +
                "```\n\n" +
                "### React State & The `useState` Hook\n\n" +
                "State is a component's memory. The `useState` hook allows functional components to store and update dynamic data:\n\n" +
                "```tsx\n" +
                "import React, { useState } from 'react';\n\n" +
                "const Counter = () => {\n" +
                "  const [count, setCount] = useState<number>(0);\n" +
                "  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;\n" +
                "}\n" +
                "```\n\n" +
                "### Handling Side Effects with `useEffect`\n\n" +
                "Side effects include actions like database queries, fetching API data, or modifying browser DOM. Use `useEffect` to coordinate these:\n\n" +
                "```tsx\n" +
                "import React, { useState, useEffect } from 'react';\n\n" +
                "useEffect(() => {\n" +
                "  // Code runs after component mounts\n" +
                "  console.log('Component mounted!');\n" +
                "  return () => console.log('Component will unmount (cleanup)');\n" +
                "}, []); // Empty array indicates this effect runs only ONCE on mount\n" +
                "```",
                1,
                55
        ));

        quizQuestionRepository.save(new QuizQuestion(
                null,
                lesson2_1.getId(),
                "Which hook should you use to handle operations like data fetching or DOM manipulation on component mounting?",
                "useState;useContext;useRef;useEffect",
                3,
                "The useEffect hook is designed to manage side effects that synchronize with external systems in React components."
        ));

        Lesson lesson2_2 = lessonRepository.save(new Lesson(
                null,
                module2.getId(),
                "Integrating Backend APIs with Fetch",
                "### Fetching Data from Spring Boot\n\n" +
                "React UIs typically communicate with Spring Boot rest controllers using `fetch` or library clients like Axios. Use `async/await` to handle asynchronous promises:\n\n" +
                "```typescript\n" +
                "const loadCourses = async () => {\n" +
                "  try {\n" +
                "    const response = await fetch('/api/courses');\n" +
                "    if (!response.ok) throw new Error('Network error');\n" +
                "    const data = await response.json();\n" +
                "    setCourses(data);\n" +
                "  } catch (error) {\n" +
                "    setError(error.message);\n" +
                "  }\n" +
                "};\n" +
                "```\n\n" +
                "### Vite Proxy Configurations\n\n" +
                "During development, React is served on `http://localhost:5173` while Spring runs on `http://localhost:8081`. Making direct requests causes Cross-Origin Resource Sharing (CORS) security errors.\n\n" +
                "To resolve this seamlessly in local dev, configure a proxy in `vite.config.ts`:\n\n" +
                "```typescript\n" +
                "export default defineConfig({\n" +
                "  server: {\n" +
                "    proxy: {\n" +
                "      '/api': {\n" +
                "        target: 'http://localhost:8081',\n" +
                "        changeOrigin: true,\n" +
                "      }\n" +
                "    }\n" +
                "  }\n" +
                "})\n" +
                "```",
                2,
                50
        ));

        quizQuestionRepository.save(new QuizQuestion(
                null,
                lesson2_2.getId(),
                "What is the core benefit of configuring a local server proxy in your Vite configurations?",
                "Encrypted database queries;Bypassing browser CORS policy blocks during local development;Faster CSS stylesheet downloads;Enabling dark theme support",
                1,
                "Vite's server proxy routes frontend api calls to the backend server port, avoiding CORS policy blocks in your local browser."
        ));

        // --- MODULE 3 ---
        CourseModule module3 = courseModuleRepository.save(new CourseModule(null, courseId, "Backend Engineering with Spring Boot", 3));

        Lesson lesson3_1 = lessonRepository.save(new Lesson(
                null,
                module3.getId(),
                "Building RESTful Controllers in Java",
                "### Spring MVC & REST Controllers\n\n" +
                "Spring Boot uses annotations to scan classes and set up web routing endpoints automatically. A REST Controller is created by annotating a Java class with `@RestController`:\n\n" +
                "```java\n" +
                "package com.bugfix.learning.controller;\n\n" +
                "import org.springframework.web.bind.annotation.*;\n" +
                "import java.util.List;\n\n" +
                "@RestController\n" +
                "@RequestMapping(\"/api/hello\")\n" +
                "public class HelloController {\n\n" +
                "    @GetMapping\n" +
                "    public String sayHello() {\n" +
                "        return \"Hello from Spring Boot!\";\n" +
                "    }\n" +
                "}\n" +
                "```\n\n" +
                "### Accessing Request Variables\n\n" +
                "Use Spring annotations to capture parameters sent by clients:\n\n" +
                "1. **`@PathVariable`**: Captures path segments, e.g. `/api/courses/{id}`.\n" +
                "2. **`@RequestParam`**: Captures query parameters, e.g. `/api/search?query=react`.\n" +
                "3. **`@RequestBody`**: Binds incoming JSON payloads directly to Java object schemas (DTOs).",
                1,
                60
        ));

        quizQuestionRepository.save(new QuizQuestion(
                null,
                lesson3_1.getId(),
                "Which Spring Boot annotation designates a Java class as a controller that automatically serializes response bodies to JSON?",
                "@Controller;@Service;@RestController;@Component",
                2,
                "@RestController combines @Controller and @ResponseBody, serializing return values directly into HTTP response bodies."
        ));

        Lesson lesson3_2 = lessonRepository.save(new Lesson(
                null,
                module3.getId(),
                "Database Persistence with Spring Data JPA",
                "### Java Persistence API (JPA)\n\n" +
                "JPA is a Java standard mapping objects (entities) to SQL database tables. Mark a model as persistent using `@Entity` and `@Table`:\n\n" +
                "```java\n" +
                "import jakarta.persistence.*;\n\n" +
                "@Entity\n" +
                "@Table(name = \"users\")\n" +
                "public class User {\n" +
                "    @Id\n" +
                "    @GeneratedValue(strategy = GenerationType.IDENTITY)\n" +
                "    private Long id;\n" +
                "    private String name;\n" +
                "    // constructors, getters, setters\n" +
                "}\n" +
                "```\n\n" +
                "### Spring Data JPA Repositories\n\n" +
                "Extend `JpaRepository<Entity, IdType>` to get database operation helpers like `save()`, `findById()`, `findAll()`, and `deleteById()` automatically compiled at runtime:\n\n" +
                "```java\n" +
                "import org.springframework.data.jpa.repository.JpaRepository;\n" +
                "import org.springframework.stereotype.Repository;\n\n" +
                "@Repository\n" +
                "public interface UserRepository extends JpaRepository<User, Long> {\n" +
                "    // Spring automatically implements database fetching queries here!\n" +
                "}\n" +
                "```",
                2,
                55
        ));

        quizQuestionRepository.save(new QuizQuestion(
                null,
                lesson3_2.getId(),
                "What interface can you extend in your repositories to get standard CRUD operations automatically?",
                "CrudService;JpaRepository;EntityRepository;JdbcTemplate",
                1,
                "JpaRepository provides full CRUD and pagination methods automatically at runtime based on generic type parameters."
        ));

        // --- MODULE 4 ---
        CourseModule module4 = courseModuleRepository.save(new CourseModule(null, courseId, "Connecting & Deploying the System", 4));

        Lesson lesson4_1 = lessonRepository.save(new Lesson(
                null,
                module4.getId(),
                "Configuring Cross-Origin Resource Sharing (CORS)",
                "### What is CORS?\n\n" +
                "**Cross-Origin Resource Sharing (CORS)** is a security feature built into browsers that blocks scripts hosted on one domain from querying resources on another domain.\n\n" +
                "For example, a script loaded from `http://localhost:5173` (React dev server) is blocked from calling APIs on `http://localhost:8081` (Spring Boot server) unless the backend explicitly approves it.\n\n" +
                "### Configuring CORS globally in Spring Boot\n\n" +
                "We can configure CORS by registering a global web configurator bean:\n\n" +
                "```java\n" +
                "import org.springframework.context.annotation.Configuration;\n" +
                "import org.springframework.web.servlet.config.annotation.CorsRegistry;\n" +
                "import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;\n\n" +
                "@Configuration\n" +
                "public class WebConfig implements WebMvcConfigurer {\n" +
                "    @Override\n" +
                "    public void addCorsMappings(CorsRegistry registry) {\n" +
                "        registry.addMapping(\"/**\")\n" +
                "                .allowedOrigins(\"http://localhost:5173\")\n" +
                "                .allowedMethods(\"GET\", \"POST\", \"PUT\", \"DELETE\");\n" +
                "    }\n" +
                "}\n" +
                "```",
                1,
                45
        ));

        quizQuestionRepository.save(new QuizQuestion(
                null,
                lesson4_1.getId(),
                "Which mechanism enforces origin permissions on HTTP calls inside modern web browsers?",
                "CORS;XSS;CSRF;SQL Injection",
                0,
                "CORS is a security standard implemented by browsers to restrict cross-origin HTTP requests unless explicitly allowed by the server headers."
        ));

        Lesson lesson4_2 = lessonRepository.save(new Lesson(
                null,
                module4.getId(),
                "Packaging the Application for Deployment",
                "### Building production frontend bundles\n\n" +
                "To prepare our React app for deployment, build a static distribution package containing minimized HTML, CSS, and JS:\n\n" +
                "```bash\n" +
                "npm run build\n" +
                "```\n\n" +
                "This outputs all compile files to the `/dist` directory.\n\n" +
                "### Hosting Frontend Assets inside Spring Boot\n\n" +
                "Spring Boot automatically serves static contents from resources static folder on the classpath. Copy your `/dist` files into `src/main/resources/static` in the backend.\n\n" +
                "When you run Spring Boot, it will serve the React single-page UI at the root path `http://localhost:8081/`!\n\n" +
                "### Compiling the Spring Boot Executable JAR\n\n" +
                "Use Maven to compile the Java code and package it together with static files into a single, executable JAR file:\n\n" +
                "```bash\n" +
                "mvn clean package\n" +
                "```\n\n" +
                "This creates a file like `target/backend-0.0.1-SNAPSHOT.jar`. Launch it anywhere with Java installed:\n\n" +
                "```bash\n" +
                "java -jar target/backend-0.0.1-SNAPSHOT.jar\n" +
                "```",
                2,
                50
        ));

        quizQuestionRepository.save(new QuizQuestion(
                null,
                lesson4_2.getId(),
                "Where should you copy compiled static web assets so Spring Boot serves them automatically?",
                "src/main/java;src/main/resources/static;src/main/resources/templates;target",
                1,
                "Spring Boot automatically serves static contents placed in /static, /public, or /resources directories on classpath."
        ));

        // 2. Placeholder Cloud Course
        courseRepository.save(new Course(
                null,
                "Google Cloud Console Basics",
                "Start your cloud journey by learning project administration, service management, compute virtual machines, cloud storage buckets, and IAM policy frameworks directly in Google Cloud Console.",
                "Cloud",
                "6 Hours",
                "Beginner",
                "cloud_course"
        ));

        // 3. Placeholder Boot Course
        courseRepository.save(new Course(
                null,
                "Advanced Spring Boot Architectures",
                "Take your Java skills to the enterprise level. Master transaction configurations, Spring Security OAuth2 OAuth protocols, reactive WebFlux APIs, messaging queues, and dockerized microservices.",
                "Backend",
                "15 Hours",
                "Advanced",
                "boot_course"
        ));

        // 4. Placeholder Design Course
        courseRepository.save(new Course(
                null,
                "UX/UI Design for Developers",
                "Design interfaces that users love. Learn core layout theory, styling variables, typography pairing, dark/light theme designs, and interactive high-fidelity prototyping with Figma.",
                "Design",
                "8 Hours",
                "Intermediate",
                "design_course"
        ));
    }
}
