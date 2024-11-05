package main

import (
	"time"

	"gorm.io/gorm"
)

// Profile model
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

// Project model
type Project struct {
	ID        string         `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	FounderID string         `gorm:"type:uuid;not null" json:"founder_id"`
	Title     string         `gorm:"type:varchar(255);not null" json:"title"`
	Status    string         `gorm:"type:varchar(50);not null" json:"status"`
	CreatedAt time.Time      `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt time.Time      `gorm:"autoUpdateTime" json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

// Add other models as needed
