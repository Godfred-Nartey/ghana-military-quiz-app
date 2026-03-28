# Implementation Guide - Ghana Military Quiz Application

## Current Status

### ✅ Completed Components

1. **Database Layer**
   - Complete MySQL schema with 9 tables
   - Sample data for categories and achievements
   - Sample admin user and questions

2. **Backend Project Structure**
   - Maven configuration (pom.xml)
   - Application properties
   - Main application class

3. **Entity Models** (All 9 models created)
   - User
   - Category
   - Question
   - QuizAttempt
   - QuizAnswer
   - Achievement
   - UserAchievement
   - UserProgress
   - UserStatistics

4. **Repositories** (Started)
   - UserRepository

## Security Configuration

### Environment Variables

The application uses environment variables for sensitive configuration to prevent credentials from being exposed in the codebase.

#### Required Environment Variables

**For Production:**
- `DB_PASSWORD`: Database password (required)
- `JWT_SECRET`: JWT signing secret key (required, must be a strong random string)

**Example (Linux/Mac):**
```bash
export DB_PASSWORD="your_secure_database_password"
export JWT_SECRET="your_secure_random_jwt_secret_key_at_least_256_bits"
```

**Example (Windows CMD):**
```cmd
set DB_PASSWORD=your_secure_database_password
set JWT_SECRET=your_secure_random_jwt_secret_key_at_least_256_bits
```

**Example (Windows PowerShell):**
```powershell
$env:DB_PASSWORD="your_secure_database_password"
$env:JWT_SECRET="your_secure_random_jwt_secret_key_at_least_256_bits"
```

#### Generating a Secure JWT Secret

Use one of these methods to generate a secure JWT secret:

**Using OpenSSL:**
```bash
openssl rand -base64 64
```

**Using Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
```

**Using Python:**
```bash
python -c "import secrets; print(secrets.token_urlsafe(64))"
```

### Development vs Production

- **Development**: The application has fallback values for local development (empty password, default JWT secret)
- **Production**: Always set environment variables - never use default values in production
- **Never commit** sensitive credentials to version control

### Security Best Practices

1. **Database Credentials**: Use strong passwords and rotate them regularly
2. **JWT Secret**: Use a cryptographically secure random string (minimum 256 bits)
3. **Environment Variables**: Set via system environment, container orchestration, or secret management tools
4. **Version Control**: Ensure `.env` files are in `.gitignore`
5. **Access Control**: Limit who can access production environment variables

## Next Steps - Backend Implementation

### Step 1: Complete Repository Layer

Create the following repository interfaces in `backend/src/main/java/com/ghanamilitaryquiz/repository/`:

#### CategoryRepository.java
```java
package com.ghanamilitaryquiz.repository;

import com.ghanamilitaryquiz.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByIsActiveTrue();
    List<Category> findAllByOrderByDisplayOrderAsc();
}
```

#### QuestionRepository.java
```java
package com.ghanamilitaryquiz.repository;

import com.ghanamilitaryquiz.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByCategoryIdAndIsActiveTrue(Long categoryId);
    
    @Query(value = "SELECT * FROM questions WHERE category_id = :categoryId AND is_active = true ORDER BY RAND() LIMIT :limit", nativeQuery = true)
    List<Question> findRandomQuestionsByCategory(@Param("categoryId") Long categoryId, @Param("limit") int limit);
    
    Long countByCategoryIdAndIsActiveTrue(Long categoryId);
}
```

#### QuizAttemptRepository.java
```java
package com.ghanamilitaryquiz.repository;

import com.ghanamilitaryquiz.model.QuizAttempt;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {
    List<QuizAttempt> findByUserIdAndIsCompletedTrue(Long userId);
    Page<QuizAttempt> findByUserIdAndIsCompletedTrue(Long userId, Pageable pageable);
    List<QuizAttempt> findByUserIdAndCategoryIdAndIsCompletedTrue(Long userId, Long categoryId);
}
```

#### QuizAnswerRepository.java
```java
package com.ghanamilitaryquiz.repository;

import com.ghanamilitaryquiz.model.QuizAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizAnswerRepository extends JpaRepository<QuizAnswer, Long> {
    List<QuizAnswer> findByQuizAttemptId(Long quizAttemptId);
}
```

#### AchievementRepository.java
```java
package com.ghanamilitaryquiz.repository;

import com.ghanamilitaryquiz.model.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AchievementRepository extends JpaRepository<Achievement, Long> {
    List<Achievement> findByIsActiveTrue();
    List<Achievement> findByCriteriaType(String criteriaType);
}
```

#### UserAchievementRepository.java
```java
package com.ghanamilitaryquiz.repository;

import com.ghanamilitaryquiz.model.UserAchievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserAchievementRepository extends JpaRepository<UserAchievement, Long> {
    List<UserAchievement> findByUserId(Long userId);
    Optional<UserAchievement> findByUserIdAndAchievementId(Long userId, Long achievementId);
    Boolean existsByUserIdAndAchievementId(Long userId, Long achievementId);
}
```

#### UserProgressRepository.java
```java
package com.ghanamilitaryquiz.repository;

import com.ghanamilitaryquiz.model.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {
    List<UserProgress> findByUserId(Long userId);
    Optional<UserProgress> findByUserIdAndCategoryId(Long userId, Long categoryId);
}
```

#### UserStatisticsRepository.java
```java
package com.ghanamilitaryquiz.repository;

import com.ghanamilitaryquiz.model.UserStatistics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserStatisticsRepository extends JpaRepository<UserStatistics, Long> {
    Optional<UserStatistics> findByUserId(Long userId);
}
```

### Step 2: Create DTO Classes

Create DTOs in `backend/src/main/java/com/ghanamilitaryquiz/dto/`:

#### request/LoginRequest.java
```java
package com.ghanamilitaryquiz.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
    @NotBlank(message = "Username is required")
    private String username;
    
    @NotBlank(message = "Password is required")
    private String password;
}
```

#### request/RegisterRequest.java
```java
package com.ghanamilitaryquiz.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    private String username;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;
    
    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;
    
    private String fullName;
}
```

#### response/AuthResponse.java
```java
package com.ghanamilitaryquiz.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String type = "Bearer";
    private Long expiresIn;
    private UserResponse user;
}
```

#### response/UserResponse.java
```java
package com.ghanamilitaryquiz.dto.response;

import com.ghanamilitaryquiz.model.User;
import lombok.Data;

@Data
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private String fullName;
    private String role;
    
    public static UserResponse fromUser(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());
        response.setFullName(user.getFullName());
        response.setRole(user.getRole().name());
        return response;
    }
}
```

### Step 3: Implement JWT Security

#### security/JwtTokenProvider.java
```java
package com.ghanamilitaryquiz.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {
    
    @Value("${jwt.secret}")
    private String jwtSecret;
    
    @Value("${jwt.expiration}")
    private long jwtExpiration;
    
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }
    
    public String generateToken(Authentication authentication) {
        String username = authentication.getName();
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpiration);
        
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    
    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        
        return claims.getSubject();
    }
    
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
```

### Step 4: Create Services

Start with AuthService, UserService, CategoryService, QuestionService, and QuizService.

### Step 5: Create Controllers

Create REST controllers for each service.

### Step 6: Configure Security

Create SecurityConfig class to configure Spring Security with JWT.

## Frontend Implementation

### Step 1: Initialize React Project

```bash
cd frontend
npm create vite@latest . -- --template react
npm install
```

### Step 2: Install Dependencies

```bash
npm install react-router-dom axios @mui/material @mui/icons-material @emotion/react @emotion/styled
npm install react-hook-form yup @hookform/resolvers
npm install @reduxjs/toolkit react-redux
npm install recharts date-fns
```

### Step 3: Create Project Structure

```
frontend/src/
├── components/
│   ├── common/
│   ├── auth/
│   ├── quiz/
│   ├── profile/
│   ├── leaderboard/
│   └── admin/
├── pages/
├── context/
├── services/
├── hooks/
├── utils/
├── styles/
├── App.jsx
└── main.jsx
```

### Step 4: Implement Authentication

Create AuthContext, login/register pages, and protected routes.

### Step 5: Build Quiz Interface

Create quiz taking interface with timer and question display.

### Step 6: Connect to Backend API

Use Axios to connect frontend to backend endpoints.

## Testing

### Backend Testing

```bash
cd backend
mvn test
```

### Frontend Testing

```bash
cd frontend
npm test
```

## Running the Application

### Start Backend

```bash
cd backend
mvn spring-boot:run
```

Backend runs on: http://localhost:8080

### Start Frontend

```bash
cd frontend
npm run dev
```

Frontend runs on: http://localhost:5173

## Deployment

### Backend Deployment

1. Build JAR file:
```bash
mvn clean package
```

2. Run JAR:
```bash
java -jar target/backend-1.0.0.jar
```

### Frontend Deployment

1. Build for production:
```bash
npm run build
```

2. Deploy `dist/` folder to hosting service (Netlify, Vercel, etc.)

## Common Commands

### Backend

```bash
# Clean and build
mvn clean install

# Run tests
mvn test

# Run application
mvn spring-boot:run

# Package as JAR
mvn clean package
```

### Frontend

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Troubleshooting

### Database Connection Issues

1. Verify MySQL is running
2. Check credentials in application.properties
3. Ensure database exists
4. Check firewall settings

### CORS Issues

Add CORS configuration in SecurityConfig or create a separate CorsConfig class.

### JWT Token Issues

1. Verify JWT secret is properly configured
2. Check token expiration time
3. Ensure token is being sent in Authorization header

## Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev/)
- [Material-UI Documentation](https://mui.com/)
- [JWT.io](https://jwt.io/)

## Next Immediate Tasks

1. ✅ Complete all repository interfaces
2. ✅ Create DTO classes
3. ✅ Implement JWT security components
4. ✅ Create service layer
5. ✅ Create controller layer
6. ✅ Test backend with Postman
7. ✅ Initialize React frontend
8. ✅ Implement authentication UI
9. ✅ Build quiz interface
10. ✅ Connect frontend to backend

Follow this guide step by step to complete the implementation of your Ghana Military Quiz application.
