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
