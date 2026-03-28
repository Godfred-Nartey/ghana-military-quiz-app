# Ghana Military Quiz Application

A full-stack web application for testing and enhancing knowledge about the Ghana Military, built with Java Spring Boot backend and React frontend.

## Project Structure

```
end-of-semester-project/
├── backend/                    # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/ghanamilitaryquiz/
│   │   │   │       ├── GhanaMilitaryQuizApplication.java
│   │   │   │       ├── model/
│   │   │   │       ├── repository/
│   │   │   │       ├── service/
│   │   │   │       ├── controller/
│   │   │   │       ├── security/
│   │   │   │       ├── dto/
│   │   │   │       ├── config/
│   │   │   │       ├── exception/
│   │   │   │       └── util/
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   └── pom.xml
├── frontend/                   # React frontend (to be created)
├── database/                   # Database scripts
│   └── schema.sql
├── plans/                      # Project planning documents
│   ├── architecture-plan.md
│   ├── database-schema.md
│   ├── setup-guide.md
│   ├── api-endpoints.md
│   └── project-summary.md
└── README.md
```

## Technology Stack

### Backend
- **Framework**: Spring Boot 3.2.3
- **Language**: Java 17
- **Database**: MySQL 8.x
- **Security**: Spring Security + JWT
- **ORM**: Spring Data JPA / Hibernate
- **Build Tool**: Maven
- **API Docs**: Swagger/OpenAPI

### Frontend (To be implemented)
- **Framework**: React 18+
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State Management**: Context API + Redux Toolkit
- **HTTP Client**: Axios
- **UI Framework**: Material-UI or Tailwind CSS

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Java JDK 17 or higher**
   - Download from: https://www.oracle.com/java/technologies/downloads/
   - Verify: `java -version`

2. **Maven**
   - Download from: https://maven.apache.org/download.cgi
   - Verify: `mvn -version`

3. **MySQL 8.x**
   - Download from: https://dev.mysql.com/downloads/mysql/
   - Or use XAMPP/WAMP

4. **Node.js 18+ and npm** (for frontend)
   - Download from: https://nodejs.org/
   - Verify: `node -v` and `npm -v`

5. **Git**
   - Download from: https://git-scm.com/downloads

## Quick Start

### 1. Database Setup

1. Start MySQL server
2. Create the database and run the schema:

```bash
mysql -u root -p < database/schema.sql
```

Or manually:
```sql
CREATE DATABASE ghana_military_quiz;
USE ghana_military_quiz;
-- Then run the contents of database/schema.sql
```

### 2. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Update `src/main/resources/application.properties` with your MySQL credentials:
```properties
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
```

3. Build the project:
```bash
mvn clean install
```

4. Run the application:
```bash
mvn spring-boot:run
```

The backend will start on http://localhost:8080

### 3. Verify Backend is Running

- Health check: http://localhost:8080/actuator/health (if actuator is enabled)
- Swagger UI: http://localhost:8080/swagger-ui.html
- API Docs: http://localhost:8080/api-docs

### 4. Frontend Setup (Coming Soon)

The frontend will be set up in the next phase using Vite and React.

## Current Implementation Status

### ✅ Completed
- [x] Project planning and architecture design
- [x] Database schema design
- [x] Backend project structure setup
- [x] Maven configuration with all dependencies
- [x] Application properties configuration
- [x] Main application class
- [x] User entity model

### 🚧 In Progress
- [ ] Complete all entity models
- [ ] Create repositories
- [ ] Implement services
- [ ] Create controllers
- [ ] Implement JWT security
- [ ] Set up frontend project

### 📋 Pending
- [ ] Complete backend API endpoints
- [ ] Build React frontend
- [ ] Integrate frontend with backend
- [ ] Testing
- [ ] Deployment

## Features

### Core Features
- ✅ User registration and authentication
- ✅ JWT-based security
- ✅ Multiple quiz categories
- ✅ Progress tracking
- ✅ Achievement system
- ✅ Leaderboard
- ✅ Admin panel

### Quiz Categories
1. Military History
2. Ranks and Structure
3. Military Equipment
4. Training and Doctrine
5. Notable Figures
6. International Relations

## API Documentation

Detailed API documentation is available in [`plans/api-endpoints.md`](plans/api-endpoints.md)

### Base URL
```
http://localhost:8080/api
```

### Main Endpoints
- `/api/auth/*` - Authentication
- `/api/categories/*` - Quiz categories
- `/api/questions/*` - Question management
- `/api/quiz/*` - Quiz operations
- `/api/leaderboard/*` - Rankings
- `/api/users/*` - User management
- `/api/achievements/*` - Achievements
- `/api/analytics/*` - Analytics (Admin)

## Development Workflow

### Backend Development
1. Create entity models
2. Create repositories
3. Create services
4. Create controllers
5. Add security
6. Write tests

### Frontend Development
1. Set up React project
2. Create components
3. Implement routing
4. Add state management
5. Connect to API
6. Style application

## Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests (when implemented)
```bash
cd frontend
npm test
```

## Building for Production

### Backend
```bash
cd backend
mvn clean package
java -jar target/backend-1.0.0.jar
```

### Frontend (when implemented)
```bash
cd frontend
npm run build
```

## Documentation

- [`plans/architecture-plan.md`](plans/architecture-plan.md) - Complete system architecture
- [`plans/database-schema.md`](plans/database-schema.md) - Database design
- [`plans/setup-guide.md`](plans/setup-guide.md) - Detailed setup instructions
- [`plans/api-endpoints.md`](plans/api-endpoints.md) - API documentation
- [`plans/project-summary.md`](plans/project-summary.md) - Project overview

## Troubleshooting

### MySQL Connection Issues
- Verify MySQL is running
- Check username and password in application.properties
- Ensure database exists
- Check firewall settings

### Port Already in Use
Change the port in application.properties:
```properties
server.port=8081
```

### Maven Build Fails
```bash
mvn clean install -U
```

## Next Steps

1. ✅ Complete remaining entity models (Category, Question, QuizAttempt, etc.)
2. ✅ Create repository interfaces
3. ✅ Implement service layer
4. ✅ Create REST controllers
5. ✅ Implement JWT authentication
6. ✅ Set up React frontend
7. ✅ Build UI components
8. ✅ Integrate frontend with backend
9. ✅ Test all features
10. ✅ Deploy application

## Contributing

This is an end-of-semester project. For questions or issues, please contact the project maintainer.

## License

This project is created for educational purposes as part of an end-of-semester project.

## Contact

For more information, refer to the planning documents in the [`plans/`](plans/) directory.

---

**Status**: 🚧 In Development
**Last Updated**: March 9, 2026
