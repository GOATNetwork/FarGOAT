package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables from .env file
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found")
	}

	ConnectDatabase()

	r := gin.Default()
	r.Use(DatabaseMiddleware())

	r.GET("/profiles", GetProfiles)
	r.POST("/profiles", CreateProfile)
	r.GET("/profiles/:id", GetProfile)
	r.PUT("/profiles/:id", UpdateProfile)
	r.DELETE("/profiles/:id", DeleteProfile)

	r.Run(":6666")
}
