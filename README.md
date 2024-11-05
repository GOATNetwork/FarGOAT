# README for Deploying the FARGOAT Ecosystem

## Introduction

Welcome to the FARGOAT Ecosystem! This guide will help you deploy and run the various components of the FARGOAT platform, including the GOAT Founders Club Ecosystem. This ecosystem is designed to enhance user engagement, visibility, and community growth for blockchain projects.

## TL;DR

- **Frontend**: Use Next.js to build and deploy the frontend.
- **Backend**: Use Go services with PostgreSQL for the backend.
- **Blockchain**: Interact with the Goat Network blockchain for smart contract operations.

## Deployment Guide

### Frontend Deployment

1. **Install Dependencies**:
   ```bash
   yarn install
   ```

2. **Build the Project**:
   ```bash
   yarn build
   ```

3. **Run the Development Server**:
   ```bash
   yarn dev
   ```

4. **Deploy**:
   - Use Vercel or any other hosting service that supports Next.js.
   - Ensure your `vercel.json` is configured correctly:
     ```json
     {
         "buildCommand": "yarn build"
     }
     ```

### Backend Deployment

1. **Setup Go Environment**:
   - Ensure you have Go installed. You can download it from [golang.org](https://golang.org/dl/).

2. **Initialize and Install Dependencies**:
   - Navigate to your project directory and run the following script to initialize the Go module and install necessary packages:
   ```bash
   ./run.sh
   ```

3. **Run the Go Services**:
   - After the script completes, start the application:
   ```bash
   ./farGoat
   ```

4. **Database Setup**:
   - Use PostgreSQL for data storage.
   - Ensure your database is configured and running.

5. **API Integration**:
   - Use GraphQL APIs to connect the frontend and backend.

### Blockchain Interaction

1. **Smart Contract Deployment**:
   - Deploy your smart contracts on the Goat Network blockchain (Chain ID 48815).

2. **Register Contracts**:
   - Register your smart contracts within the ecosystem to enable point allocation and quest creation.

3. **Interact with Contracts**:
   - Use the provided APIs to interact with your smart contracts for managing points and rewards.

## Key Features

- **Quests System**: Create tasks for users to earn points and rewards.
- **Points and Rewards**: Allocate and convert points into rewards.
- **Analytics**: Access real-time and batch analytics for user engagement.
- **Community Building**: Engage with a vibrant community of blockchain projects and users.

## Conclusion

By following this guide, you can successfully deploy and run the FARGOAT Ecosystem, enhancing your blockchain project's engagement and visibility. Join the GOAT Founders Club today and take your project to new heights!

---

For more detailed instructions and scenarios, refer to the comprehensive guide provided in the ecosystem documentation.