#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Initializing Go module..."
# go mod init farGoat

echo "Installing required Go packages..."
go get -u gorm.io/gorm
go get -u gorm.io/driver/postgres
go get -u github.com/gin-gonic/gin
go get -u github.com/machinebox/graphql
go get -u github.com/joho/godotenv
go get -u github.com/google/uuid

echo "Compiling the application..."
go build -o farGoat

echo "Starting the application..."
./farGoat
