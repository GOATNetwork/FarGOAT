



```typescript
// 1. CORE DOMAIN ENTITIES

class Profile {
    id: UUID;
    email: string;
    walletAddress: string;
    uniqueName: string;
    // ... other profile fields

    async createSession(): Promise<UserSession>
    async validateTwoFactor(code: string): Promise<boolean>
    async updateProfile(data: ProfileUpdateDTO): Promise<void>
    async getAnalytics(): Promise<UserAnalytics>
}

class Project {
    id: UUID;
    founderId: UUID;
    rfpId?: UUID;
    title: string;
    status: ProjectStatus;
    // ... other project fields

    async createQuest(data: QuestCreateDTO): Promise<Quest>
    async updateMetrics(): Promise<void>
    async getAnalytics(): Promise<ProjectAnalytics>
}

class Quest {
    id: UUID;
    projectId: UUID;
    templateId?: UUID;
    title: string;
    requirements: QuestRequirements;
    // ... other quest fields

    async participate(userId: UUID): Promise<QuestParticipant>
    async validateCompletion(participantId: UUID): Promise<boolean>
    async distributeRewards(): Promise<void>
}

class SmartContract {
    id: UUID;
    founderAddress: string;
    contractAddress: string;
    // ... other contract fields

    async configureEvents(configs: EventConfigDTO[]): Promise<void>
    async allocatePoints(amount: number): Promise<void>
    async distributeRewards(): Promise<void>
}

// 2. SERVICE LAYER

class AuthenticationService {
    async login(credentials: LoginDTO): Promise<Session>
    async verify2FA(userId: UUID, code: string): Promise<boolean>
    async refreshToken(token: string): Promise<Session>
    async validateSession(sessionId: UUID): Promise<boolean>
}

class ProjectService {
    async createProject(data: ProjectCreateDTO): Promise<Project>
    async verifyProject(projectId: UUID): Promise<void>
    async updateProjectMetrics(projectId: UUID): Promise<void>
    async getProjectAnalytics(projectId: UUID): Promise<ProjectAnalytics>
}

class QuestService {
    async createQuest(data: QuestCreateDTO): Promise<Quest>
    async participateInQuest(questId: UUID, userId: UUID): Promise<void>
    async validateQuestCompletion(participationId: UUID): Promise<void>
    async distributeQuestRewards(questId: UUID): Promise<void>
}

class SmartContractService {
    async registerContract(data: ContractRegistrationDTO): Promise<SmartContract>
    async processContractEvent(event: ContractEvent): Promise<void>
    async allocatePoints(contractId: UUID, amount: number): Promise<void>
    async distributeRewards(contractId: UUID): Promise<void>
}

// 3. REPOSITORY LAYER

interface IProfileRepository {
    findById(id: UUID): Promise<Profile>
    findByWalletAddress(address: string): Promise<Profile>
    create(data: ProfileCreateDTO): Promise<Profile>
    update(id: UUID, data: ProfileUpdateDTO): Promise<void>
}

interface IProjectRepository {
    findById(id: UUID): Promise<Project>
    findByFounder(founderId: UUID): Promise<Project[]>
    create(data: ProjectCreateDTO): Promise<Project>
    updateMetrics(id: UUID, metrics: ProjectMetrics): Promise<void>
}

interface IQuestRepository {
    findById(id: UUID): Promise<Quest>
    findByProject(projectId: UUID): Promise<Quest[]>
    create(data: QuestCreateDTO): Promise<Quest>
    updateStatus(id: UUID, status: QuestStatus): Promise<void>
}

interface ISmartContractRepository {
    findByAddress(address: string): Promise<SmartContract>
    findByFounder(founderAddress: string): Promise<SmartContract[]>
    create(data: ContractCreateDTO): Promise<SmartContract>
    updatePoints(id: UUID, points: number): Promise<void>
}

// 4. EVENT SYSTEM

class EventBus {
    async publish(event: ApplicationEvent): Promise<void>
    async subscribe(eventType: string, handler: EventHandler): Promise<void>
}

interface ApplicationEvent {
    type: string;
    payload: any;
    timestamp: Date;
}

// 5. MIDDLEWARE AND VALIDATORS

class AuthenticationMiddleware {
    async validateSession(req: Request, res: Response, next: NextFunction): Promise<void>
    async validate2FA(req: Request, res: Response, next: NextFunction): Promise<void>
}

class ValidationMiddleware {
    async validateProjectCreation(req: Request, res: Response, next: NextFunction): Promise<void>
    async validateQuestRequirements(req: Request, res: Response, next: NextFunction): Promise<void>
}

// 6. DATA TRANSFER OBJECTS (DTOs)

interface ProfileCreateDTO {
    email: string;
    walletAddress: string;
    uniqueName: string;
}

interface ProjectCreateDTO {
    title: string;
    description: string;
    founderId: UUID;
    category: string;
}

interface QuestCreateDTO {
    projectId: UUID;
    title: string;
    requirements: QuestRequirements;
    rewards: QuestRewards;
}

interface ContractRegistrationDTO {
    address: string;
    founderAddress: string;
    name: string;
    abi: string;
}

// 7. ANALYTICS AND METRICS

class AnalyticsService {
    async trackUserActivity(userId: UUID, activity: ActivityType): Promise<void>
    async trackProjectMetrics(projectId: UUID): Promise<void>
    async generateReports(): Promise<AnalyticsReport>
}

// 8. BACKGROUND JOBS

class JobScheduler {
    async scheduleMetricsUpdate(): Promise<void>
    async scheduleRewardsDistribution(): Promise<void>
    async scheduleContractVerification(): Promise<void>
}
```

This architecture supports:

1. **User Management & Authentication**
   - Profile management
   - Session handling
   - 2FA support
   - Activity tracking

2. **Project Management**
   - Project creation and updates
   - Metrics tracking
   - Analytics
   - RFP handling

3. **Quest System**
   - Quest creation and management
   - Participant tracking
   - Reward distribution
   - Template support

4. **Smart Contract Integration**
   - Contract registration
   - Event processing
   - Points allocation
   - Rewards distribution

5. **Analytics & Reporting**
   - User analytics
   - Project metrics
   - Quest completion rates
   - Contract interactions

6. **Background Processing**
   - Metrics updates
   - Reward distributions
   - Contract verification

Would you like me to elaborate on any specific component or add more detail to certain areas?




# Database Schema

Below is a comprehensive representation of the database schema, listing all the tables, their fields, data types, constraints, and relationships. Following the tables, a tree structure illustrates the relationships between the tables.

## Database Tables and Their Fields

### 1. profiles

| Field              | Data Type      | Constraints                                      |
|--------------------|----------------|--------------------------------------------------|
| id                 | UUID (PK)      | DEFAULT uuid_generate_v4()                       |
| email              | VARCHAR(255)   | UNIQUE, NOT NULL, CHECK format                    |
| password_hash      | VARCHAR(255)   | NOT NULL                                         |
| wallet_address     | VARCHAR(42)    | UNIQUE, NOT NULL, CHECK format                    |
| unique_name        | VARCHAR(100)   | UNIQUE, NOT NULL                                 |
| profile_picture    | TEXT           |                                                  |
| bio                | TEXT           |                                                  |
| social_links       | JSONB          | DEFAULT '{}'                                     |
| preferences        | JSONB          | DEFAULT '{}'                                     |
| reputation_score   | NUMERIC        | DEFAULT 0                                        |
| email_verified     | BOOLEAN        | DEFAULT FALSE                                    |
| wallet_verified    | BOOLEAN        | DEFAULT FALSE                                    |
| two_factor_enabled | BOOLEAN        | DEFAULT FALSE                                    |
| last_login         | TIMESTAMPTZ    |                                                  |
| status             | VARCHAR(20)    | DEFAULT 'active', CHECK IN ('active', 'suspended', 'banned') |
| created_at         | TIMESTAMPTZ    | DEFAULT NOW()                                     |
| updated_at         | TIMESTAMPTZ    | DEFAULT NOW()                                     |

**Relationships:**
- Primary table with various dependent tables referencing `id` or `wallet_address`.

### 2. user_sessions

| Field           | Data Type    | Constraints                              |
|-----------------|--------------|------------------------------------------|
| id              | UUID (PK)    | DEFAULT uuid_generate_v4()               |
| user_id         | UUID (FK)    | REFERENCES profiles(id)                   |
| session_token   | TEXT         | NOT NULL                                 |
| refresh_token   | TEXT         |                                          |
| device_info     | JSONB        |                                          |
| ip_address      | INET         |                                          |
| user_agent      | TEXT         |                                          |
| last_activity   | TIMESTAMPTZ  |                                          |
| expires_at      | TIMESTAMPTZ  | NOT NULL                                 |
| created_at      | TIMESTAMPTZ  | DEFAULT NOW()                             |

**Relationships:**
- `user_id` references `profiles(id)`.

### 3. user_roles

| Field       | Data Type   | Constraints                                     |
|-------------|-------------|-------------------------------------------------|
| user_id     | UUID        | REFERENCES profiles(id), PK part                |
| role_id     | UUID        | REFERENCES roles(id), PK part                   |
| granted_at  | TIMESTAMPTZ | DEFAULT NOW()                                    |
| granted_by  | UUID        | REFERENCES profiles(id)                          |
| expires_at  | TIMESTAMPTZ |                                                 |

**Relationships:**
- Composite primary key (`user_id`, `role_id`).
- `user_id` references `profiles(id)`.
- `role_id` references `roles(id)`.
- `granted_by` references `profiles(id)`.

### 4. roles

| Field        | Data Type    | Constraints                              |
|--------------|--------------|------------------------------------------|
| id           | UUID (PK)    | DEFAULT uuid_generate_v4()               |
| name         | VARCHAR(50)  | UNIQUE, NOT NULL                         |
| description  | TEXT         |                                          |
| permissions  | JSONB        | NOT NULL                                 |
| created_at   | TIMESTAMPTZ  | DEFAULT NOW()                             |
| updated_at   | TIMESTAMPTZ  | DEFAULT NOW()                             |

**Relationships:**
- Referenced by `user_roles(role_id)`.

### 5. rfps

| Field             | Data Type    | Constraints                                             |
|-------------------|--------------|---------------------------------------------------------|
| id                | UUID (PK)    | DEFAULT uuid_generate_v4()                               |
| project_name      | VARCHAR(255) | NOT NULL                                                |
| description       | TEXT         |                                                         |
| website           | VARCHAR(255) |                                                         |
| tags              | VARCHAR(100)[]| CHECK array_length(tags, 1) <= 3                        |
| project_logo      | TEXT         |                                                         |
| github_url        | VARCHAR(255) |                                                         |
| whitepaper_url    | TEXT         |                                                         |
| founder_id        | UUID (FK)    | REFERENCES profiles(id)                                  |
| status            | VARCHAR(50)  | DEFAULT 'pending', CHECK IN ('pending', 'approved', 'rejected', 'archived') |
| review_notes      | TEXT         |                                                         |
| reviewed_by       | UUID (FK)    | REFERENCES profiles(id)                                  |
| review_date       | TIMESTAMPTZ  |                                                         |
| metadata          | JSONB        | DEFAULT '{}'                                             |
| created_at        | TIMESTAMPTZ  | DEFAULT NOW()                                             |
| updated_at        | TIMESTAMPTZ  | DEFAULT NOW()                                             |

**Relationships:**
- `founder_id` references `profiles(id)`.
- `reviewed_by` references `profiles(id)`.

### 6. projects

| Field                | Data Type     | Constraints                                      |
|----------------------|---------------|--------------------------------------------------|
| id                   | UUID (PK)     | DEFAULT uuid_generate_v4()                       |
| rfp_id               | UUID (FK)     | REFERENCES rfps(id) ON DELETE SET NULL            |
| title                | VARCHAR(255)  | NOT NULL                                         |
| description           | TEXT          |                                                  |
| founder_id           | UUID (FK)     | REFERENCES profiles(id)                           |
| is_verified          | BOOLEAN       | DEFAULT FALSE                                    |
| verification_date    | TIMESTAMPTZ   |                                                  |
| tags                 | VARCHAR(100)[]|                                                  |
| category             | VARCHAR(50)   |                                                  |
| project_stage        | VARCHAR(50)   | CHECK IN ('idea', 'mvp', 'beta', 'launched', 'established') |
| tvl                  | NUMERIC       | DEFAULT 0                                        |
| trx                  | NUMERIC       | DEFAULT 0                                        |
| dau                  | INTEGER       | DEFAULT 0                                        |
| metrics_last_updated | TIMESTAMPTZ   |                                                  |
| status               | VARCHAR(50)   | DEFAULT 'active', CHECK IN ('active', 'paused', 'completed', 'archived') |
| metadata             | JSONB         | DEFAULT '{}'                                     |
| created_at           | TIMESTAMPTZ   | DEFAULT NOW()                                     |
| updated_at           | TIMESTAMPTZ   | DEFAULT NOW()                                     |

**Relationships:**
- `rfp_id` references `rfps(id)`.
- `founder_id` references `profiles(id)`.

### 7. project_profiles

| Field                   | Data Type     | Constraints                                         |
|-------------------------|---------------|-----------------------------------------------------|
| id                      | UUID (PK)     | DEFAULT uuid_generate_v4()                           |
| project_id              | UUID (FK)     | REFERENCES projects(id)                               |
| website                 | VARCHAR(255)  |                                                     |
| github                  | VARCHAR(255)  |                                                     |
| twitter                 | VARCHAR(255)  |                                                     |
| discord                 | VARCHAR(255)  |                                                     |
| telegram                | VARCHAR(255)  |                                                     |
| medium                  | VARCHAR(255)  |                                                     |
| founder_address         | VARCHAR(42)   | REFERENCES profiles(wallet_address)                   |
| team_members            | JSONB         |                                                     |
| roadmap                 | JSONB         |                                                     |
| tokenomics              | JSONB         |                                                     |
| total_points_allocated  | NUMERIC       | DEFAULT 0                                            |
| quest_completion_rate   | NUMERIC       | DEFAULT 0                                            |
| activity_metrics        | JSONB         |                                                     |
| last_activity_update    | TIMESTAMPTZ   |                                                     |
| created_at              | TIMESTAMPTZ   | DEFAULT NOW()                                         |
| updated_at              | TIMESTAMPTZ   | DEFAULT NOW()                                         |

**Relationships:**
- `project_id` references `projects(id)`.
- `founder_address` references `profiles(wallet_address)`.

### 8. quests

| Field               | Data Type     | Constraints                                           |
|---------------------|---------------|-------------------------------------------------------|
| id                  | UUID (PK)     | DEFAULT uuid_generate_v4()                             |
| project_id          | UUID (FK)     | REFERENCES projects(id)                                 |
| template_id         | UUID (FK)     | REFERENCES quest_templates(id)                          |
| title               | VARCHAR(255)  | NOT NULL                                              |
| description         | TEXT          |                                                       |
| type                | VARCHAR(50)   | CHECK IN ('TVL', 'TRX', 'DAU', 'SOCIAL', 'CUSTOM')      |
| category            | VARCHAR(50)   |                                                       |
| difficulty          | VARCHAR(20)   | CHECK IN ('easy', 'medium', 'hard', 'expert')          |
| requirements        | JSONB         | NOT NULL                                              |
| rewards             | JSONB         | NOT NULL                                              |
| start_date          | TIMESTAMPTZ   |                                                       |
| end_date            | TIMESTAMPTZ   |                                                       |
| max_participants    | INTEGER       |                                                       |
| current_participants| INTEGER       | DEFAULT 0                                              |
| points_allocated    | NUMERIC       | DEFAULT 0                                              |
| points_claimed      | NUMERIC       | DEFAULT 0                                              |
| status              | VARCHAR(50)   | DEFAULT 'draft', CHECK IN ('draft', 'active', 'paused', 'completed', 'cancelled') |
| validation_method   | VARCHAR(50)   |                                                       |
| success_criteria    | JSONB         |                                                       |
| metadata            | JSONB         | DEFAULT '{}'                                           |
| created_at          | TIMESTAMPTZ   | DEFAULT NOW()                                           |
| updated_at          | TIMESTAMPTZ   | DEFAULT NOW()                                           |

**Relationships:**
- `project_id` references `projects(id)`.
- `template_id` references `quest_templates(id)`.

### 9. quest_participants

| Field             | Data Type    | Constraints                                     |
|-------------------|--------------|-------------------------------------------------|
| id                | UUID (PK)    | DEFAULT uuid_generate_v4()                       |
| quest_id          | UUID (FK)    | REFERENCES quests(id)                             |
| user_id           | UUID (FK)    | REFERENCES profiles(id)                           |
| status            | VARCHAR(50)  | DEFAULT 'registered', CHECK IN ('registered', 'in_progress', 'completed', 'failed', 'verified') |
| progress          | JSONB        | DEFAULT '{}'                                     |
| completion_data   | JSONB        |                                                 |
| points_earned     | NUMERIC      | DEFAULT 0                                        |
| rewards_claimed   | BOOLEAN      | DEFAULT FALSE                                    |
| started_at        | TIMESTAMPTZ  | DEFAULT NOW()                                     |
| completed_at      | TIMESTAMPTZ  |                                                 |
| verified_at       | TIMESTAMPTZ  |                                                 |
| verified_by       | UUID (FK)    | REFERENCES profiles(id)                           |

**Relationships:**
- `quest_id` references `quests(id)`.
- `user_id` references `profiles(id)`.
- `verified_by` references `profiles(id)`.

### 10. smart_contracts

| Field                    | Data Type     | Constraints                                           |
|--------------------------|---------------|-------------------------------------------------------|
| id                       | UUID (PK)     | DEFAULT uuid_generate_v4()                             |
| contract_address         | VARCHAR(42)   | UNIQUE, NOT NULL, CHECK format                         |
| founder_address          | VARCHAR(42)   | REFERENCES profiles(wallet_address)                     |
| name                     | VARCHAR(255)  | NOT NULL                                              |
| version                  | VARCHAR(20)   |                                                       |
| contract_type            | VARCHAR(50)   |                                                       |
| abi_hash                 | VARCHAR(66)   | NOT NULL                                              |
| abi                      | JSONB         | NOT NULL                                              |
| implementation_address   | VARCHAR(42)   |                                                       |
| proxy_type               | VARCHAR(50)   |                                                       |
| verified_source          | BOOLEAN       | DEFAULT FALSE                                        |
| source_code              | TEXT          |                                                       |
| compiler_version         | VARCHAR(20)   |                                                       |
| optimization_used        | BOOLEAN       |                                                       |
| optimization_runs        | INTEGER       |                                                       |
| license_type             | VARCHAR(50)   |                                                       |
| deployment_tx_hash       | VARCHAR(66)   |                                                       |
| deployment_block_number  | BIGINT        |                                                       |
| current_points           | NUMERIC       | DEFAULT 0                                            |
| pending_rewards          | NUMERIC       | DEFAULT 0                                            |
| claimed_rewards          | NUMERIC       | DEFAULT 0                                            |
| is_verified              | BOOLEAN       | DEFAULT FALSE                                        |
| verification_date         | TIMESTAMPTZ |                                                       |
| last_interaction         | TIMESTAMPTZ |                                                       |
| metadata                 | JSONB         | DEFAULT '{}'                                         |
| created_at               | TIMESTAMPTZ   | DEFAULT NOW()                                         |
| updated_at               | TIMESTAMPTZ   | DEFAULT NOW()                                         |

**Relationships:**
- `founder_address` references `profiles(wallet_address)`.

### 11. contract_event_configs

| Field               | Data Type    | Constraints                                     |
|---------------------|--------------|-------------------------------------------------|
| id                  | UUID (PK)    | DEFAULT uuid_generate_v4()                       |
| contract_id         | UUID (FK)    | REFERENCES smart_contracts(id)                     |
| event_name          | VARCHAR(100) | NOT NULL                                        |
| event_signature     | VARCHAR(66)  | NOT NULL                                        |
| processing_enabled  | BOOLEAN      | DEFAULT TRUE                                    |
| processing_priority | INTEGER      | DEFAULT 1                                        |
| webhook_url         | TEXT         |                                                 |
| retry_policy        | JSONB        |                                                 |
| created_at          | TIMESTAMPTZ  | DEFAULT NOW()                                     |

**Relationships:**
- `contract_id` references `smart_contracts(id)`.

### 12. contract_interactions

| Field               | Data Type    | Constraints                                     |
|---------------------|--------------|-------------------------------------------------|
| id                  | UUID (PK)    | DEFAULT uuid_generate_v4()                       |
| contract_id         | UUID (FK)    | REFERENCES smart_contracts(id)                     |
| transaction_hash    | VARCHAR(66)  | NOT NULL                                        |
| interaction_type    | VARCHAR(50)  | NOT NULL                                        |
| method_signature    | VARCHAR(66)  |                                                 |
| parameters          | JSONB        |                                                 |
| status              | VARCHAR(20)  | CHECK IN ('pending', 'success', 'failed')         |
| error_message       | TEXT         |                                                 |
| gas_used            | NUMERIC      |                                                 |
| block_number        | BIGINT       |                                                 |
| timestamp           | TIMESTAMPTZ  | NOT NULL                                        |
| created_at          | TIMESTAMPTZ  | DEFAULT NOW()                                     |

**Relationships:**
- `contract_id` references `smart_contracts(id)`.

### 13. points_allocation

| Field           | Data Type    | Constraints                                     |
|-----------------|--------------|-------------------------------------------------|
| id              | UUID (PK)    | DEFAULT uuid_generate_v4()                       |
| contract_id     | UUID (FK)    | REFERENCES smart_contracts(id)                     |
| points_amount   | NUMERIC      | NOT NULL                                        |
| allocation_type | VARCHAR(50)  |                                                 |
| reason          | TEXT         |                                                 |
| allocated_by    | UUID (FK)    | REFERENCES profiles(id)                           |
| transaction_hash| VARCHAR(66)  |                                                 |
| status          | VARCHAR(20)  | DEFAULT 'pending', CHECK IN ('pending', 'confirmed', 'failed') |
| created_at      | TIMESTAMPTZ  | DEFAULT NOW()                                     |

**Relationships:**
- `contract_id` references `smart_contracts(id)`.
- `allocated_by` references `profiles(id)`.

### 14. rewards_distribution

| Field              | Data Type    | Constraints                                     |
|--------------------|--------------|-------------------------------------------------|
| id                 | UUID (PK)    | DEFAULT uuid_generate_v4()                       |
| contract_id        | UUID (FK)    | REFERENCES smart_contracts(id)                     |
| points_converted    | NUMERIC      | NOT NULL                                        |
| rewards_amount      | NUMERIC      | NOT NULL                                        |
| conversion_rate     | NUMERIC      | NOT NULL                                        |
| distribution_type   | VARCHAR(50)  |                                                 |
| status              | VARCHAR(20)  | DEFAULT 'pending', CHECK IN ('pending', 'processing', 'completed', 'failed') |
| transaction_hash    | VARCHAR(66)  |                                                 |
| processed_at        | TIMESTAMPTZ  |                                                 |
| created_at          | TIMESTAMPTZ  | DEFAULT NOW()                                     |

**Relationships:**
- `contract_id` references `smart_contracts(id)`.

### 15. rewards_claims

| Field                | Data Type    | Constraints                                     |
|----------------------|--------------|-------------------------------------------------|
| id                   | UUID (PK)    | DEFAULT uuid_generate_v4()                       |
| distribution_id      | UUID (FK)    | REFERENCES rewards_distribution(id)               |
| claimer_address      | VARCHAR(42)  | NOT NULL                                        |
| amount_claimed       | NUMERIC      | NOT NULL                                        |
| claim_transaction_hash | VARCHAR(66)|                                                 |
| status               | VARCHAR(20)  | DEFAULT 'pending', CHECK IN ('pending', 'confirmed', 'failed') |
| created_at           | TIMESTAMPTZ  | DEFAULT NOW()                                     |

**Relationships:**
- `distribution_id` references `rewards_distribution(id)`.

## Tree Structure of Tables and Relationships 
profiles
├── user_sessions
├── profile_history
├── user_roles
│   └── roles
├── two_factor_secrets
├── auth_attempts
├── user_analytics
├── audit_logs
├── user_activity_logs
│   ├── projects
│   └── transactions
├── transactions
│   └── projects
├── quest_points
│   ├── quests
│   └── quest_participants
├── quest_participants
│   ├── quests
│   │   ├── project_id → projects
│   │   └── template_id → quest_templates
│   └── verified_by → profiles
├── rewards (founder_address)
│   └── smart_contracts (founder_address)
│       ├── contract_event_configs
│       ├── contract_interactions
│       ├── points_allocation
│       │   └── allocated_by → profiles
│       ├── rewards_distribution
│       │   └── rewards_claims
│       └── tvl_logs
├── projects (founder_id)
│   ├── project_profiles
│   ├── project_updates
│   │   └── posted_by → profiles
│   ├── project_metrics_history
│   ├── project_analytics
│   ├── quests
│   │   ├── quest_participants
│   │   └── quest_templates
├── rfps (founder_id)
├── smart_contracts (founder_address)
│   ├── contract_event_configs
│   ├── contract_interactions
│   ├── points_allocation
│   │   └── allocated_by → profiles
│   ├── rewards_distribution
│       └── rewards_claims