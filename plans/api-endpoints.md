# Ghana Military Quiz Application - API Documentation

## Base URL
```
http://localhost:8080/api
```

## Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "timestamp": "2026-03-09T11:00:00Z"
}
```

---

## Authentication Endpoints

### Register User
Create a new user account.

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "fullName": "John Doe"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "fullName": "John Doe",
    "role": "USER",
    "createdAt": "2026-03-09T11:00:00Z"
  },
  "message": "User registered successfully"
}
```

**Validation Rules:**
- Username: 3-50 characters, alphanumeric and underscore only
- Email: Valid email format
- Password: Minimum 8 characters, at least one uppercase, one lowercase, one number
- Full Name: 2-100 characters

---

### Login
Authenticate user and receive JWT token.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "username": "john_doe",
  "password": "SecurePass123!"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "type": "Bearer",
    "expiresIn": 86400,
    "user": {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "fullName": "John Doe",
      "role": "USER"
    }
  },
  "message": "Login successful"
}
```

---

### Get Current User
Get authenticated user's information.

**Endpoint:** `GET /auth/me`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "fullName": "John Doe",
    "role": "USER",
    "createdAt": "2026-03-09T11:00:00Z",
    "lastLogin": "2026-03-09T12:00:00Z"
  }
}
```

---

### Refresh Token
Refresh JWT token before expiration.

**Endpoint:** `POST /auth/refresh`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "type": "Bearer",
    "expiresIn": 86400
  }
}
```

---

### Logout
Invalidate current token.

**Endpoint:** `POST /auth/logout`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## Category Endpoints

### Get All Categories
Retrieve all quiz categories.

**Endpoint:** `GET /categories`

**Query Parameters:**
- `active` (optional): Filter by active status (true/false)

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Military History",
      "description": "Questions about Ghana Military history...",
      "icon": "history",
      "displayOrder": 1,
      "isActive": true,
      "questionCount": 50
    },
    {
      "id": 2,
      "name": "Ranks and Structure",
      "description": "Military ranks, command structure...",
      "icon": "ranks",
      "displayOrder": 2,
      "isActive": true,
      "questionCount": 35
    }
  ]
}
```

---

### Get Category by ID
Retrieve specific category details.

**Endpoint:** `GET /categories/{id}`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Military History",
    "description": "Questions about Ghana Military history...",
    "icon": "history",
    "displayOrder": 1,
    "isActive": true,
    "questionCount": 50,
    "totalAttempts": 1250,
    "averageScore": 72.5
  }
}
```

---

### Create Category (Admin Only)
Create a new quiz category.

**Endpoint:** `POST /categories`

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "name": "Military Equipment",
  "description": "Questions about weapons, vehicles, and equipment",
  "icon": "equipment",
  "displayOrder": 3
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "id": 3,
    "name": "Military Equipment",
    "description": "Questions about weapons, vehicles, and equipment",
    "icon": "equipment",
    "displayOrder": 3,
    "isActive": true,
    "createdAt": "2026-03-09T11:00:00Z"
  },
  "message": "Category created successfully"
}
```

---

### Update Category (Admin Only)
Update existing category.

**Endpoint:** `PUT /categories/{id}`

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "name": "Military Equipment & Technology",
  "description": "Updated description",
  "displayOrder": 4,
  "isActive": true
}
```

**Response:** `200 OK`

---

### Delete Category (Admin Only)
Delete a category.

**Endpoint:** `DELETE /categories/{id}`

**Headers:** `Authorization: Bearer <admin_token>`

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Category deleted successfully"
}
```

---

## Question Endpoints

### Get Questions by Category
Retrieve questions for a specific category.

**Endpoint:** `GET /questions/category/{categoryId}`

**Query Parameters:**
- `difficulty` (optional): EASY, MEDIUM, HARD
- `limit` (optional): Number of questions (default: 10)
- `random` (optional): Randomize questions (true/false)

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "categoryId": 1,
      "questionText": "In what year did Ghana gain independence?",
      "optionA": "1955",
      "optionB": "1957",
      "optionC": "1960",
      "optionD": "1963",
      "difficultyLevel": "EASY",
      "points": 10
    }
  ]
}
```

**Note:** Correct answer and explanation are NOT included when fetching questions for quiz.

---

### Get Question by ID (Admin Only)
Retrieve complete question details including correct answer.

**Endpoint:** `GET /questions/{id}`

**Headers:** `Authorization: Bearer <admin_token>`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": 1,
    "categoryId": 1,
    "questionText": "In what year did Ghana gain independence?",
    "optionA": "1955",
    "optionB": "1957",
    "optionC": "1960",
    "optionD": "1963",
    "correctAnswer": "B",
    "explanation": "Ghana gained independence from British colonial rule on March 6, 1957...",
    "difficultyLevel": "EASY",
    "points": 10,
    "timesAnswered": 150,
    "timesCorrect": 120,
    "successRate": 80.0
  }
}
```

---

### Create Question (Admin Only)
Add a new question.

**Endpoint:** `POST /questions`

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "categoryId": 1,
  "questionText": "Who was the first Chief of Defence Staff?",
  "optionA": "Major General H.T. Alexander",
  "optionB": "Lieutenant General S.J.A. Otu",
  "optionC": "Major General C.M. Barwah",
  "optionD": "Lieutenant General E.K. Kotoka",
  "correctAnswer": "A",
  "explanation": "Major General H.T. Alexander served as the first Chief of Defence Staff...",
  "difficultyLevel": "MEDIUM",
  "points": 15
}
```

**Response:** `201 Created`

---

### Update Question (Admin Only)
Update existing question.

**Endpoint:** `PUT /questions/{id}`

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:** Same as create

**Response:** `200 OK`

---

### Delete Question (Admin Only)
Delete a question.

**Endpoint:** `DELETE /questions/{id}`

**Headers:** `Authorization: Bearer <admin_token>`

**Response:** `200 OK`

---

### Bulk Import Questions (Admin Only)
Import multiple questions at once.

**Endpoint:** `POST /questions/bulk`

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "questions": [
    {
      "categoryId": 1,
      "questionText": "Question 1...",
      "optionA": "Option A",
      "optionB": "Option B",
      "optionC": "Option C",
      "optionD": "Option D",
      "correctAnswer": "A",
      "explanation": "Explanation...",
      "difficultyLevel": "EASY",
      "points": 10
    }
  ]
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "imported": 25,
    "failed": 0,
    "errors": []
  },
  "message": "25 questions imported successfully"
}
```

---

## Quiz Endpoints

### Start Quiz
Start a new quiz session.

**Endpoint:** `POST /quiz/start`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "categoryId": 1,
  "questionCount": 10,
  "difficultyLevel": "MEDIUM"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "attemptId": 123,
    "categoryId": 1,
    "categoryName": "Military History",
    "totalQuestions": 10,
    "startedAt": "2026-03-09T11:00:00Z",
    "questions": [
      {
        "id": 1,
        "questionText": "In what year did Ghana gain independence?",
        "optionA": "1955",
        "optionB": "1957",
        "optionC": "1960",
        "optionD": "1963",
        "points": 10
      }
    ]
  },
  "message": "Quiz started successfully"
}
```

---

### Submit Quiz
Submit answers and complete quiz.

**Endpoint:** `POST /quiz/{attemptId}/submit`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "answers": [
    {
      "questionId": 1,
      "userAnswer": "B",
      "timeSpent": 15
    },
    {
      "questionId": 2,
      "userAnswer": "A",
      "timeSpent": 20
    }
  ],
  "totalTimeTaken": 180
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "attemptId": 123,
    "score": 85,
    "totalQuestions": 10,
    "correctAnswers": 8,
    "incorrectAnswers": 2,
    "timeTaken": 180,
    "percentage": 80.0,
    "passed": true,
    "newAchievements": [
      {
        "id": 1,
        "name": "First Steps",
        "description": "Complete your first quiz",
        "points": 10
      }
    ]
  },
  "message": "Quiz submitted successfully"
}
```

---

### Get Quiz Results
Get detailed results of a completed quiz.

**Endpoint:** `GET /quiz/{attemptId}/results`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "attemptId": 123,
    "categoryName": "Military History",
    "score": 85,
    "totalQuestions": 10,
    "correctAnswers": 8,
    "percentage": 80.0,
    "timeTaken": 180,
    "completedAt": "2026-03-09T11:03:00Z",
    "answers": [
      {
        "questionId": 1,
        "questionText": "In what year did Ghana gain independence?",
        "userAnswer": "B",
        "correctAnswer": "B",
        "isCorrect": true,
        "explanation": "Ghana gained independence...",
        "points": 10,
        "timeSpent": 15
      }
    ]
  }
}
```

---

### Get Quiz History
Get user's quiz history.

**Endpoint:** `GET /quiz/history`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page` (optional): Page number (default: 0)
- `size` (optional): Page size (default: 10)
- `categoryId` (optional): Filter by category

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "attemptId": 123,
        "categoryName": "Military History",
        "score": 85,
        "totalQuestions": 10,
        "correctAnswers": 8,
        "percentage": 80.0,
        "timeTaken": 180,
        "completedAt": "2026-03-09T11:03:00Z"
      }
    ],
    "totalElements": 25,
    "totalPages": 3,
    "currentPage": 0,
    "pageSize": 10
  }
}
```

---

## Leaderboard Endpoints

### Get Global Leaderboard
Get top users by total points.

**Endpoint:** `GET /leaderboard/global`

**Query Parameters:**
- `limit` (optional): Number of users (default: 10)

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "rank": 1,
      "userId": 5,
      "username": "quiz_master",
      "fullName": "John Doe",
      "totalPoints": 5420,
      "totalQuizzes": 54,
      "averageScore": 85.5,
      "totalAchievements": 8,
      "currentStreak": 7
    }
  ]
}
```

---

### Get Category Leaderboard
Get top users for specific category.

**Endpoint:** `GET /leaderboard/category/{categoryId}`

**Query Parameters:**
- `limit` (optional): Number of users (default: 10)

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "categoryName": "Military History",
    "leaderboard": [
      {
        "rank": 1,
        "userId": 5,
        "username": "quiz_master",
        "bestScore": 95,
        "totalAttempts": 12,
        "averageScore": 87.5
      }
    ]
  }
}
```

---

### Get Weekly Leaderboard
Get top users for current week.

**Endpoint:** `GET /leaderboard/weekly`

**Response:** `200 OK`

---

### Get Monthly Leaderboard
Get top users for current month.

**Endpoint:** `GET /leaderboard/monthly`

**Response:** `200 OK`

---

## User Profile Endpoints

### Get User Profile
Get user profile information.

**Endpoint:** `GET /users/profile`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "fullName": "John Doe",
    "role": "USER",
    "createdAt": "2026-03-09T11:00:00Z",
    "lastLogin": "2026-03-09T12:00:00Z",
    "statistics": {
      "totalQuizzes": 25,
      "totalPoints": 2150,
      "totalCorrectAnswers": 180,
      "currentStreak": 5,
      "longestStreak": 12,
      "averageScore": 78.5
    }
  }
}
```

---

### Update User Profile
Update user profile information.

**Endpoint:** `PUT /users/profile`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "fullName": "John Michael Doe",
  "email": "john.doe@example.com"
}
```

**Response:** `200 OK`

---

### Get User Statistics
Get detailed user statistics.

**Endpoint:** `GET /users/{id}/stats`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "totalQuizzes": 25,
    "totalPoints": 2150,
    "totalQuestionsAnswered": 250,
    "totalCorrectAnswers": 180,
    "accuracyRate": 72.0,
    "currentStreak": 5,
    "longestStreak": 12,
    "averageScore": 78.5,
    "totalTimeSpent": 7200,
    "categoryBreakdown": [
      {
        "categoryName": "Military History",
        "attempts": 10,
        "bestScore": 95,
        "averageScore": 82.5
      }
    ]
  }
}
```

---

### Get User Achievements
Get user's earned achievements.

**Endpoint:** `GET /users/{id}/achievements`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "First Steps",
      "description": "Complete your first quiz",
      "icon": "star",
      "badgeColor": "bronze",
      "points": 10,
      "earnedAt": "2026-03-09T11:05:00Z"
    }
  ]
}
```

---

### Get User Progress
Get user progress by category.

**Endpoint:** `GET /users/{id}/progress`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "categoryId": 1,
      "categoryName": "Military History",
      "totalAttempts": 10,
      "bestScore": 95,
      "averageScore": 82.5,
      "totalPoints": 825,
      "totalTimeSpent": 1800,
      "lastAttemptAt": "2026-03-09T11:00:00Z",
      "progressPercentage": 75.0
    }
  ]
}
```

---

## Achievement Endpoints

### Get All Achievements
Get list of all available achievements.

**Endpoint:** `GET /achievements`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "First Steps",
      "description": "Complete your first quiz",
      "icon": "star",
      "criteriaType": "QUIZ_COUNT",
      "criteriaValue": 1,
      "points": 10,
      "badgeColor": "bronze"
    }
  ]
}
```

---

### Create Achievement (Admin Only)
Create new achievement.

**Endpoint:** `POST /achievements`

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "name": "Century Club",
  "description": "Complete 100 quizzes",
  "icon": "trophy",
  "criteriaType": "QUIZ_COUNT",
  "criteriaValue": 100,
  "points": 500,
  "badgeColor": "platinum"
}
```

**Response:** `201 Created`

---

## Analytics Endpoints (Admin Only)

### Get Dashboard Statistics
Get admin dashboard overview.

**Endpoint:** `GET /analytics/dashboard`

**Headers:** `Authorization: Bearer <admin_token>`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "totalUsers": 1250,
    "activeUsers": 850,
    "totalQuizzes": 15420,
    "totalQuestions": 500,
    "averageQuizScore": 75.5,
    "popularCategories": [
      {
        "categoryName": "Military History",
        "attempts": 5420
      }
    ],
    "recentActivity": [
      {
        "username": "john_doe",
        "action": "Completed quiz",
        "category": "Military History",
        "score": 85,
        "timestamp": "2026-03-09T11:00:00Z"
      }
    ]
  }
}
```

---

### Get Question Statistics
Get statistics for specific question.

**Endpoint:** `GET /analytics/questions/{id}/stats`

**Headers:** `Authorization: Bearer <admin_token>`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "questionId": 1,
    "questionText": "In what year did Ghana gain independence?",
    "timesAnswered": 150,
    "timesCorrect": 120,
    "successRate": 80.0,
    "averageTimeSpent": 18,
    "answerDistribution": {
      "A": 10,
      "B": 120,
      "C": 15,
      "D": 5
    }
  }
}
```

---

### Get Category Performance
Get performance metrics for all categories.

**Endpoint:** `GET /analytics/categories/performance`

**Headers:** `Authorization: Bearer <admin_token>`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "categoryId": 1,
      "categoryName": "Military History",
      "totalQuestions": 50,
      "totalAttempts": 5420,
      "averageScore": 78.5,
      "averageTimeSpent": 180,
      "popularityRank": 1
    }
  ]
}
```

---

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid or missing token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Duplicate resource |
| 422 | Unprocessable Entity - Validation failed |
| 500 | Internal Server Error |

## Rate Limiting

- **Anonymous users**: 100 requests per hour
- **Authenticated users**: 1000 requests per hour
- **Admin users**: Unlimited

## Pagination

Endpoints that return lists support pagination:

**Query Parameters:**
- `page`: Page number (0-indexed)
- `size`: Items per page (default: 10, max: 100)
- `sort`: Sort field and direction (e.g., `createdAt,desc`)

**Response includes:**
```json
{
  "content": [...],
  "totalElements": 100,
  "totalPages": 10,
  "currentPage": 0,
  "pageSize": 10,
  "hasNext": true,
  "hasPrevious": false
}
```

## Testing with Postman

1. Import the API collection
2. Set environment variables:
   - `base_url`: http://localhost:8080/api
   - `token`: Your JWT token
3. Use the authentication endpoints to get a token
4. Token is automatically used in subsequent requests

## Swagger Documentation

Interactive API documentation available at:
```
http://localhost:8080/swagger-ui.html
```
