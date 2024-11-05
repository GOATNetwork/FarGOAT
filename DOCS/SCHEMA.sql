

-- Profiles Table
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    wallet_address VARCHAR(42) UNIQUE NOT NULL,
    unique_name VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles table
CREATE POLICY "Allow users to manage their own profiles"
ON profiles
FOR ALL
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Projects Table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    founder_id UUID REFERENCES profiles(id),
    title VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policies for projects table
CREATE POLICY "Allow users to manage their own projects"
ON projects
FOR ALL
USING (founder_id = auth.uid())
WITH CHECK (founder_id = auth.uid());

-- Quests Table
CREATE TABLE quests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id),
    title VARCHAR(255) NOT NULL,
    requirements JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE quests ENABLE ROW LEVEL SECURITY;

-- Policies for quests table
CREATE POLICY "Allow founders to manage their project quests"
ON quests
FOR ALL
USING (
    project_id IN (
        SELECT id FROM projects WHERE founder_id = auth.uid()
    )
)
WITH CHECK (
    project_id IN (
        SELECT id FROM projects WHERE founder_id = auth.uid()
    )
);

-- Smart Contracts Table
CREATE TABLE smart_contracts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    founder_id UUID REFERENCES profiles(id),
    contract_address VARCHAR(42) UNIQUE NOT NULL,
    current_points NUMERIC DEFAULT 0,
    pending_rewards NUMERIC DEFAULT 0,
    claimed_rewards NUMERIC DEFAULT 0,
    category VARCHAR(50),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE smart_contracts ENABLE ROW LEVEL SECURITY;

-- Policies for smart_contracts table
CREATE POLICY "Allow founders to manage their own smart contracts"
ON smart_contracts
FOR ALL
USING (founder_id = auth.uid())
WITH CHECK (founder_id = auth.uid());

-- Transactions Table
CREATE TABLE trx (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id),
    contract_address VARCHAR(42),
    transaction_type VARCHAR(50),
    volume_fiat NUMERIC,
    currency VARCHAR(10),
    timestamp TIMESTAMPTZ NOT NULL,
    duration INTEGER,
    gas_used INTEGER,
    trx_category VARCHAR(50),
    status VARCHAR(50),
    completion_time INTEGER,
    additional_data JSONB
);

ALTER TABLE trx ENABLE ROW LEVEL SECURITY;

-- Policies for trx table
CREATE POLICY "Allow users to manage their own transactions"
ON trx
FOR ALL
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Transaction Logs Table
CREATE TABLE trx_logs (
    event_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trx_id UUID REFERENCES trx(id),
    user_id UUID REFERENCES profiles(id),
    event_type VARCHAR(50),
    volume_fiat NUMERIC,
    currency VARCHAR(10),
    timestamp TIMESTAMPTZ NOT NULL,
    gas_used INTEGER,
    trx_category VARCHAR(50),
    additional_data JSONB
);

ALTER TABLE trx_logs ENABLE ROW LEVEL SECURITY;

-- Policies for trx_logs table
CREATE POLICY "Allow users to view their own transaction logs"
ON trx_logs
FOR SELECT
USING (user_id = auth.uid());

-- Transaction Daily Summaries Table
CREATE TABLE trx_daily_summaries (
    day DATE PRIMARY KEY,
    total_volume NUMERIC,
    total_trx_count INTEGER,
    dau_count INTEGER,
    trx_by_type JSONB
);

ALTER TABLE trx_daily_summaries ENABLE ROW LEVEL SECURITY;

-- Policies for trx_daily_summaries table
-- Assuming only admins can view this data
CREATE POLICY "Allow admins to view daily summaries"
ON trx_daily_summaries
FOR SELECT
USING (auth.role() = 'service_role');

-- Analytics Reports Table
CREATE TABLE analytics_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_data JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE analytics_reports ENABLE ROW LEVEL SECURITY;

-- Policies for analytics_reports table
-- Assuming only admins can access
CREATE POLICY "Allow admins to manage analytics reports"
ON analytics_reports
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Job Schedules Table
CREATE TABLE job_schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_type VARCHAR(100) NOT NULL,
    scheduled_at TIMESTAMPTZ NOT NULL,
    status VARCHAR(50) DEFAULT 'pending'
);

ALTER TABLE job_schedules ENABLE ROW LEVEL SECURITY;

-- Policies for job_schedules table
-- Assuming only admins can access
CREATE POLICY "Allow admins to manage job schedules"
ON job_schedules
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Application Events Table
CREATE TABLE application_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(100) NOT NULL,
    payload JSONB NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL
);

ALTER TABLE application_events ENABLE ROW LEVEL SECURITY;

-- Policies for application_events table
-- Assuming only admins can access
CREATE POLICY "Allow admins to manage application events"
ON application_events
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Founder Reports Table
CREATE TABLE founder_reports (
    founder_id UUID PRIMARY KEY REFERENCES profiles(id),
    allocated_points NUMERIC DEFAULT 0,
    distributed_points NUMERIC DEFAULT 0,
    earned_rewards NUMERIC DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    last_updated TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE founder_reports ENABLE ROW LEVEL SECURITY;

-- Policies for founder_reports table
CREATE POLICY "Allow founders to manage their own reports"
ON founder_reports
FOR ALL
USING (founder_id = auth.uid())
WITH CHECK (founder_id = auth.uid());

-- Contract Reports Table
CREATE TABLE contract_reports (
    contract_address VARCHAR(42) PRIMARY KEY,
    current_points NUMERIC DEFAULT 0,
    pending_rewards NUMERIC DEFAULT 0,
    claimed_rewards NUMERIC DEFAULT 0,
    category VARCHAR(50),
    is_verified BOOLEAN DEFAULT FALSE,
    last_updated TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contract_reports ENABLE ROW LEVEL SECURITY;

-- Policies for contract_reports table
-- Assuming only founders can access their own contract reports
CREATE POLICY "Allow founders to manage their own contract reports"
ON contract_reports
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM smart_contracts sc
        WHERE sc.contract_address = contract_reports.contract_address
          AND sc.founder_id = auth.uid()
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM smart_contracts sc
        WHERE sc.contract_address = contract_reports.contract_address
          AND sc.founder_id = auth.uid()
    )
);

-- Daily Summaries Table
CREATE TABLE daily_summaries (
    day DATE PRIMARY KEY,
    total_points_allocated NUMERIC DEFAULT 0,
    total_rewards_claimed NUMERIC DEFAULT 0,
    active_founders INTEGER DEFAULT 0,
    active_contracts INTEGER DEFAULT 0,
    contract_category_stats JSONB DEFAULT '{}'
);

ALTER TABLE daily_summaries ENABLE ROW LEVEL SECURITY;

-- Policies for daily_summaries table
-- Assuming only admins can access
CREATE POLICY "Allow admins to view daily summaries"
ON daily_summaries
FOR SELECT
USING (auth.role() = 'service_role');

