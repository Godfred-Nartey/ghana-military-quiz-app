# Ghana Military Quiz Application - Setup Guide

## Prerequisites

Before starting development, ensure you have the following installed:

### Required Software

1. **Java Development Kit (JDK) 17 or higher**
   - Download from: https://www.oracle.com/java/technologies/downloads/
   - Verify installation: `java -version`

2. **Node.js 18+ and npm**
   - Download from: https://nodejs.org/
   - Verify installation: `node -v` and `npm -v`

3. **MySQL 8.x**
   - Download from: https://dev.mysql.com/downloads/mysql/
   - Or use XAMPP/WAMP for Windows

4. **Maven** (if not using IDE's built-in Maven)
   - Download from: https://maven.apache.org/download.cgi
   - Verify installation: `mvn -version`

5. **Git**
   - Download from: https://git-scm.com/downloads
   - Verify installation: `git --version`

### Recommended Tools

1. **IDE for Java**
   - IntelliJ IDEA Community Edition (recommended)
   - Eclipse IDE
   - VS Code with Java extensions

2. **Code Editor for React**
   - VS Code (recommended)
   - WebStorm

3. **API Testing**
   - Postman
   - Insomnia

4. **Database Management**
   - MySQL Workbench
   - DBeaver
   - phpMyAdmin

## Project Structure

```
end-of-semester-project/
├── backend/                    # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   ├── pom.xml
│   └── README.md
├── frontend/                   # React frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── README.md
├── database/                   # Database scripts
│   ├── schema.sql
│   ├── seed-data.sql
│   └── migrations/
├── docs/                       # Documentation
│   ├── api-documentation.md
│   ├── user-guide.md
│   └── deployment-guide.md
└── plans/                      # Project planning documents
    ├── architecture-plan.md
    ├── database-schema.md
    └── setup-guide.md
```

## Step-by-Step Setup

### Phase 1: Database Setup

#### 1. Install and Start MySQL

**Windows (XAMPP):**
```bash
# Start XAMPP Control Panel
# Start MySQL service
```

**Windows (Standalone MySQL):**
```bash
# MySQL should start automatically as a service
# Or start manually from Services
```

#### 2. Create Database

Open MySQL command line or MySQL Workbench and run:

```sql
CREATE DATABASE ghana_military_quiz;
```

#### 3. Create Database User (Optional but recommended)

```sql
CREATE USER 'quiz_admin'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON ghana_military_quiz.* TO 'quiz_admin'@'localhost';
FLUSH PRIVILEGES;
```

#### 4. Run Schema Script

Execute the database schema from [`database-schema.md`](database-schema.md) to create all tables, views, procedures, and triggers.

### Phase 2: Backend Setup

#### 1. Create Spring Boot Project

**Option A: Using Spring Initializr (Recommended)**

1. Go to https://start.spring.io/
2. Configure project:
   - Project: Maven
   - Language: Java
   - Spring Boot: 3.2.x (latest stable)
   - Group: com.ghanamilitaryquiz
   - Artifact: backend
   - Name: Ghana Military Quiz Backend
   - Package name: com.ghanamilitaryquiz
   - Packaging: Jar
   - Java: 17

3. Add Dependencies:
   - Spring Web
   - Spring Data JPA
   - Spring Security
   - MySQL Driver
   - Lombok
   - Validation
   - Spring Boot DevTools

4. Generate and download the project
5. Extract to `backend/` directory

**Option B: Using IDE**

Most IDEs (IntelliJ IDEA, Eclipse) have Spring Initializr integration built-in.

#### 2. Configure Application Properties

Create [`application.properties`](backend/src/main/resources/application.properties):

```properties
# Application Configuration
spring.application.name=ghana-military-quiz
server.port=8080

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/ghana_military_quiz?useSSL=false&serverTimezone=UTC
spring.datasource.username=quiz_admin
spring.datasource.password=your_secure_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.properties.hibernate.format_sql=true

# JWT Configuration
jwt.secret=your-256-bit-secret-key-change-this-in-production
jwt.expiration=86400000

# Logging
logging.level.com.ghanamilitaryquiz=DEBUG
logging.level.org.springframework.security=DEBUG

# File Upload
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
```

#### 3. Add Additional Dependencies to pom.xml

```xml
<!-- JWT -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.11.5</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>

<!-- Swagger/OpenAPI -->
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.2.0</version>
</dependency>

<!-- ModelMapper -->
<dependency>
    <groupId>org.modelmapper</groupId>
    <artifactId>modelmapper</artifactId>
    <version>3.1.1</version>
</dependency>
```

#### 4. Test Backend Setup

Run the Spring Boot application:

```bash
cd backend
mvn spring-boot:run
```

Or run from your IDE. The application should start on http://localhost:8080

### Phase 3: Frontend Setup

#### 1. Create React Project

**Using Vite (Recommended - Faster):**

```bash
cd frontend
npm create vite@latest . -- --template react
npm install
```

**Using Create React App:**

```bash
npx create-react-app frontend
cd frontend
```

#### 2. Install Required Dependencies

```bash
# Core dependencies
npm install react-router-dom axios

# UI Framework (choose one)
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
# OR
npm install -D tailwindcss postcss autoprefixer

# Form handling
npm install react-hook-form yup @hookform/resolvers

# State management
npm install @reduxjs/toolkit react-redux

# Charts
npm install recharts

# Utilities
npm install date-fns
```

#### 3. Configure Environment Variables

Create [`.env`](frontend/.env):

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=Ghana Military Quiz
```

#### 4. Configure Proxy (if needed)

For Create React App, add to [`package.json`](frontend/package.json):

```json
"proxy": "http://localhost:8080"
```

For Vite, configure in [`vite.config.js`](frontend/vite.config.js):

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})
```

#### 5. Test Frontend Setup

```bash
npm run dev  # For Vite
# OR
npm start    # For Create React App
```

The application should open at http://localhost:5173 (Vite) or http://localhost:3000 (CRA)

### Phase 4: Development Environment Setup

#### 1. Git Repository Setup

```bash
# Initialize git repository
git init

# Create .gitignore
```

Create [`.gitignore`](.gitignore):

```
# Backend
backend/target/
backend/.mvn/
backend/mvnw
backend/mvnw.cmd
backend/.idea/
backend/*.iml
backend/.settings/
backend/.classpath
backend/.project

# Frontend
frontend/node_modules/
frontend/dist/
frontend/build/
frontend/.env.local
frontend/.env.development.local
frontend/.env.test.local
frontend/.env.production.local

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
```

#### 2. Initial Commit

```bash
git add .
git commit -m "Initial project setup"
```

#### 3. Create GitHub Repository (Optional)

```bash
git remote add origin https://github.com/yourusername/ghana-military-quiz.git
git branch -M main
git push -u origin main
```

### Phase 5: Testing the Setup

#### 1. Test Database Connection

Create a simple test endpoint in your backend:

```java
@RestController
@RequestMapping("/api/test")
public class TestController {
    
    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Backend is running!");
    }
}
```

Test: http://localhost:8080/api/test/health

#### 2. Test Frontend-Backend Connection

Create a simple API call in your frontend:

```javascript
// src/services/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const testConnection = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/test/health`);
    return response.data;
  } catch (error) {
    console.error('Connection test failed:', error);
    throw error;
  }
};
```

## Development Workflow

### Backend Development

1. **Create Entity Models** → Define database entities
2. **Create Repositories** → Data access layer
3. **Create Services** → Business logic
4. **Create Controllers** → REST API endpoints
5. **Add Security** → JWT authentication
6. **Write Tests** → Unit and integration tests

### Frontend Development

1. **Set up Routing** → Define application routes
2. **Create Components** → Reusable UI components
3. **Create Pages** → Main application pages
4. **Add State Management** → Redux or Context API
5. **Connect to API** → Integrate with backend
6. **Style Application** → CSS/Material-UI/Tailwind

### Running Both Servers

**Terminal 1 (Backend):**
```bash
cd backend
mvn spring-boot:run
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

## Common Issues and Solutions

### Issue 1: MySQL Connection Failed

**Solution:**
- Verify MySQL is running
- Check username and password in application.properties
- Ensure database exists
- Check firewall settings

### Issue 2: Port Already in Use

**Backend (8080):**
```properties
# Change in application.properties
server.port=8081
```

**Frontend (5173/3000):**
```bash
# Vite
npm run dev -- --port 3001

# CRA
PORT=3001 npm start
```

### Issue 3: CORS Errors

Add CORS configuration in backend:

```java
@Configuration
public class CorsConfig {
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:5173", "http://localhost:3000")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
```

### Issue 4: JWT Secret Key Error

Generate a secure secret key:

```bash
# Using OpenSSL
openssl rand -base64 64
```

Update in application.properties

### Issue 5: Maven Build Fails

```bash
# Clean and rebuild
mvn clean install

# Skip tests if needed
mvn clean install -DskipTests
```

## Next Steps

After completing the setup:

1. ✅ Verify all services are running
2. ✅ Test database connectivity
3. ✅ Test API endpoints with Postman
4. ✅ Test frontend-backend integration
5. 📝 Start implementing features from the todo list
6. 📝 Follow the architecture plan
7. 📝 Implement authentication first
8. 📝 Build core quiz functionality
9. 📝 Add advanced features
10. 📝 Test thoroughly

## Useful Commands

### Backend

```bash
# Run application
mvn spring-boot:run

# Build JAR
mvn clean package

# Run tests
mvn test

# Clean build
mvn clean install
```

### Frontend

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Lint code
npm run lint
```

### Database

```bash
# Connect to MySQL
mysql -u quiz_admin -p ghana_military_quiz

# Backup database
mysqldump -u quiz_admin -p ghana_military_quiz > backup.sql

# Restore database
mysql -u quiz_admin -p ghana_military_quiz < backup.sql
```

## Resources

### Documentation
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [JWT.io](https://jwt.io/)

### Tutorials
- [Spring Boot REST API Tutorial](https://spring.io/guides/tutorials/rest/)
- [React Router Tutorial](https://reactrouter.com/en/main/start/tutorial)
- [Spring Security with JWT](https://www.bezkoder.com/spring-boot-jwt-authentication/)

### Tools
- [Postman](https://www.postman.com/)
- [MySQL Workbench](https://www.mysql.com/products/workbench/)
- [VS Code](https://code.visualstudio.com/)
- [IntelliJ IDEA](https://www.jetbrains.com/idea/)

## Support

If you encounter issues:
1. Check the error logs
2. Review the documentation
3. Search Stack Overflow
4. Check GitHub issues for similar problems
5. Ask your instructor or classmates

## Project Timeline Suggestion

- **Week 1-2**: Setup and database design
- **Week 3-4**: Backend authentication and basic CRUD
- **Week 5-6**: Frontend setup and authentication UI
- **Week 7-8**: Quiz functionality (backend + frontend)
- **Week 9-10**: Advanced features (leaderboard, achievements)
- **Week 11-12**: Testing, bug fixes, and polish
- **Week 13**: Documentation and presentation preparation

Good luck with your project! 🚀
