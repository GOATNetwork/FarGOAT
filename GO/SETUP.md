
Certainly! Below is the file tree structure for your Go project, along with a bash script (`run.sh`) to initialize the Go module, install the necessary Go packages, compile the application, and run it. This setup uses GORM for ORM functionality, communicates with a Supabase Postgres database through a GraphQL proxy service, and exposes endpoints on port **6666**.


```
curl -X POST 'https://dxhmpwhtvzvhwznqswek.supabase.co/rest/v1/profiles' \
-H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4aG1wd2h0dnp2aHd6bnFzd2VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA2ODg5OTksImV4cCI6MjA0NjI2NDk5OX0.dKT3nNRhEuU4TsEhXUgMfDHbEDU-TYt6v0cTf0ZQ2CY" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4aG1wd2h0dnp2aHd6bnFzd2VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA2ODg5OTksImV4cCI6MjA0NjI2NDk5OX0.dKT3nNRhEuU4TsEhXUgMfDHbEDU-TYt6v0cTf0ZQ2CY" \
-H "Content-Type: application/json" \
-H "Prefer: return=minimal" \
-d '{  "user_id": "A7361827-C99D-48C6-84BF-1A0F9B2B88EF",  "email": "newuser@example.com",  "wallet_address": "0xabcdef1234567890abcdef1234567890abcdef18",  "unique_name": "dylantrygo", "id":"A7361827-C99D-48C6-84BF-1A0F9B2B88EF" }'
```

---

### **File Tree Structure**

Assuming your project directory is named `farGoat`, here's how the file structure would look:

```
farGoat/
├── .env
├── database.go
├── go.mod
├── go.sum
├── graphql_client.go
├── handlers.go
├── main.go
├── middleware.go
├── models.go
└── run.sh
```

### **File Descriptions**

- **`.env`**: Contains environment variables such as database connection strings and API keys.
- **`database.go`**: Manages database connections and migrations.
- **`graphql_client.go`**: Handles communication with the GraphQL proxy service.
- **`handlers.go`**: Contains HTTP handlers for CRUD operations.
- **`main.go`**: The entry point of the application.
- **`middleware.go`**: Middleware functions for error handling and service availability checks.
- **`models.go`**: Defines data models corresponding to your database schema.
- **`run.sh`**: Bash script to initialize the Go module, install packages, compile, and run the application.

---

### **Bash Script (`run.sh`)**

Create a file named `run.sh` in your project directory with the following content:

```bash
#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Initializing Go module..."
go mod init farGoat

echo "Installing required Go packages..."
go get -u gorm.io/gorm
go get -u gorm.io/driver/postgres
go get -u github.com/gin-gonic/gin
go get -u github.com/machinebox/graphql
go get -u github.com/joho/godotenv

echo "Compiling the application..."
go build -o farGoat

echo "Starting the application..."
./farGoat
```

**Make the script executable:**

```bash
chmod +x run.sh
```

---

### **Step-by-Step Instructions**

#### **1. Create the Project Directory**

```bash
mkdir farGoat
cd farGoat
```

#### **2. Create the Files**

Create the following files in the `farGoat` directory:

- `.env`
- `database.go`
- `graphql_client.go`
- `handlers.go`
- `main.go`
- `middleware.go`
- `models.go`
- `run.sh` (as above)

#### **3. Populate the Files**

**`.env`**

```env
DATABASE_URL=your_database_url
SUPABASE_ANON_KEY=your_supabase_anon_key
GRAPHQL_ENDPOINT=your_graphql_endpoint
```

Replace placeholders with your actual credentials.

**`database.go`**

```go
package main

import (
    "log"
    "os"

    "gorm.io/driver/postgres"
    "gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
    dsn := os.Getenv("DATABASE_URL")

    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatalf("Failed to connect to database: %v", err)
    }

    // Migrate the schema
    err = db.AutoMigrate(&Profile{}, &Project{}) // Add other models as needed
    if err != nil {
        log.Fatalf("Failed to migrate database: %v", err)
    }

    DB = db
    log.Println("Database connection established")
}
```

**`graphql_client.go`**

```go
package main

import (
    "context"
    "log"
    "os"

    "github.com/machinebox/graphql"
)

var graphqlClient *graphql.Client

func InitGraphQLClient() {
    endpoint := os.Getenv("GRAPHQL_ENDPOINT")
    graphqlClient = graphql.NewClient(endpoint)
}

func ExecuteGraphQLQuery(query string, variables map[string]interface{}, response interface{}) error {
    req := graphql.NewRequest(query)

    for key, value := range variables {
        req.Var(key, value)
    }

    req.Header.Set("Authorization", "Bearer "+os.Getenv("SUPABASE_ANON_KEY"))

    if err := graphqlClient.Run(context.Background(), req, &response); err != nil {
        log.Printf("GraphQL query failed: %v", err)
        return err
    }
    return nil
}
```

**`handlers.go`**

```go
package main

import (
    "net/http"

    "github.com/gin-gonic/gin"
)

func CreateProfile(c *gin.Context) {
    var input Profile
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if err := DB.Create(&input).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create profile"})
        return
    }

    c.JSON(http.StatusOK, input)
}

func GetProfile(c *gin.Context) {
    var profile Profile
    id := c.Param("id")

    if err := DB.First(&profile, "id = ?", id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Profile not found"})
        return
    }

    c.JSON(http.StatusOK, profile)
}

// Implement other handlers as needed
```

**`main.go`**

```go
package main

import (
    "log"

    "github.com/gin-gonic/gin"
    "github.com/joho/godotenv"
)

func main() {
    // Load environment variables
    if err := godotenv.Load(); err != nil {
        log.Println("No .env file found or error loading .env file")
    }

    // Initialize database
    ConnectDatabase()

    // Initialize GraphQL client
    InitGraphQLClient()

    router := gin.Default()

    // Use middleware
    router.Use(DatabaseMiddleware())

    // Routes
    router.POST("/profiles", CreateProfile)
    router.GET("/profiles/:id", GetProfile)
    // Add other routes...

    // Run server on port 6666
    if err := router.Run(":6666"); err != nil {
        log.Fatalf("Failed to run server: %v", err)
    }
}
```

**`middleware.go`**

```go
package main

import (
    "net/http"

    "github.com/gin-gonic/gin"
)

func DatabaseMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        sqlDB, err := DB.DB()
        if err != nil || sqlDB.Ping() != nil {
            c.JSON(http.StatusServiceUnavailable, gin.H{
                "error": "Data service is unavailable",
            })
            c.Abort()
            return
        }
        c.Next()
    }
}
```

**`models.go`**

```go
package main

import (
    "time"

    "gorm.io/gorm"
)

type Profile struct {
    ID            string         `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
    UserID        string         `gorm:"type:uuid;unique;not null" json:"user_id"`
    Email         string         `gorm:"type:varchar(255);unique;not null" json:"email"`
    WalletAddress string         `gorm:"type:varchar(42);unique;not null" json:"wallet_address"`
    UniqueName    string         `gorm:"type:varchar(100);unique;not null" json:"unique_name"`
    CreatedAt     time.Time      `gorm:"autoCreateTime" json:"created_at"`
    UpdatedAt     time.Time      `gorm:"autoUpdateTime" json:"updated_at"`
    DeletedAt     gorm.DeletedAt `gorm:"index" json:"-"`
}

type Project struct {
    ID        string         `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
    FounderID string         `gorm:"type:uuid;not null" json:"founder_id"`
    Title     string         `gorm:"type:varchar(255);not null" json:"title"`
    Status    string         `gorm:"type:varchar(50);not null" json:"status"`
    CreatedAt time.Time      `gorm:"autoCreateTime" json:"created_at"`
    UpdatedAt time.Time      `gorm:"autoUpdateTime" json:"updated_at"`
    DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

// Define other models as needed
```

---

#### **4. Run the Bash Script**

In your terminal, execute:

```bash
./run.sh
```

This will:

- Initialize the Go module.
- Install required packages.
- Compile the application.
- Run the application on port **6666**.

---

#### **5. Test the Application**

Use `curl` or any API testing tool like Postman to interact with your API.

**Create a Profile**

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "user_id": "user-uuid",
  "email": "user@example.com",
  "wallet_address": "0x1234567890abcdef1234567890abcdef12345678",
  "unique_name": "username"
}' http://localhost:6666/profiles
```

**Get a Profile**

```bash
curl http://localhost:6666/profiles/{id}
```

Replace `{id}` with the actual ID returned from the create profile request.

---

### **Notes and Considerations**

- **Environment Variables**:

  Ensure that your `.env` file contains the correct credentials:

  - `DATABASE_URL`: The connection string to your Supabase Postgres database. It should be in the format:

    ```
    postgres://user:password@host:port/database_name
    ```

  - `SUPABASE_ANON_KEY`: Your Supabase anonymous key.
  - `GRAPHQL_ENDPOINT`: The endpoint of your GraphQL proxy service.

- **Database SSL Mode**:

  If your database requires SSL, adjust your `DATABASE_URL` to include `?sslmode=require`. For example:

  ```
  DATABASE_URL=postgres://user:password@host:port/database_name?sslmode=require
  ```

- **GORM UUID Generation**:

  Ensure that your Postgres database has the `pgcrypto` extension enabled to support `gen_random_uuid()`. If not, you can use GORM's UUID handling or switch to using `uuid_generate_v4()`.

- **Error Handling**:

  The provided code includes basic error handling. You may enhance it by adding more specific error responses and logging.

- **Authentication and Security**:

  This example does not include authentication middleware. For production applications, ensure that you implement proper authentication and authorization mechanisms.

- **GraphQL Proxy Service**:

  Make sure that your GraphQL proxy service is correctly configured to interact with your Supabase database.

- **Frontend IndexedDB Storage**:

  As mentioned earlier, handling browser IndexedDB storage is a client-side operation. To implement offline storage using IndexedDB, you'll need to write frontend code in JavaScript using Service Workers and IndexedDB APIs.

---

### **Additional Packages**

The `run.sh` script installs the following Go packages:

- **`gorm.io/gorm`**: The ORM library for Golang.
- **`gorm.io/driver/postgres`**: The PostgreSQL driver for GORM.
- **`github.com/gin-gonic/gin`**: Web framework for building REST APIs.
- **`github.com/machinebox/graphql`**: A simple GraphQL client for Go.
- **`github.com/joho/godotenv`**: Loads environment variables from the `.env` file.

---

### **Final Remarks**

By following these instructions, you should have a basic Go application that:

- Defines models based on your database schema.
- Uses GORM for ORM functionality.
- Connects to a Supabase Postgres database through a GraphQL proxy service.
- Exposes RESTful endpoints on port **6666** using the Gin web framework.
- Handles service unavailability by returning appropriate error responses.
- Provides a bash script to automate setup and execution.

---

### **Troubleshooting**

- **Cannot Connect to Database**:

  - Check that your `DATABASE_URL` is correct.
  - Ensure that your database is running and accessible from your network.
  - Verify SSL settings if applicable.

- **Module Initialization Issues**:

  - Ensure that `go.mod` is properly initialized by running `go mod init farGoat`.
  - Delete `go.mod` and `go.sum` and re-run the script if necessary.

- **Package Installation Errors**:

  - Ensure that you have internet connectivity.
  - Update Go to the latest version if you encounter compatibility issues.

- **Application Crashes on Startup**:

  - Check the logs printed in the console for error messages.
  - Ensure all environment variables are correctly set.

---

### **Next Steps**

- **Implement Additional Models and Handlers**:

  Extend `models.go` and `handlers.go` with the rest of your database schema and corresponding CRUD operations.

- **Add Authentication**:

  Incorporate authentication middleware to secure your API endpoints.

- **Frontend Development**:

  Build a frontend application to interact with your backend API. Implement offline support using IndexedDB and Service Workers.

- **Deploy Your Application**:

  Consider deploying your application to a cloud service like Heroku, AWS, or DigitalOcean.

---

Let me know if you need any further assistance or clarifications!