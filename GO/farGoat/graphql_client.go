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

	req.Header.Set("Authorization", "Bearer "+os.Getenv("ANON_API_KEY"))

	if err := graphqlClient.Run(context.Background(), req, &response); err != nil {
		log.Printf("GraphQL query failed: %v", err)
		return err
	}
	return nil
}
