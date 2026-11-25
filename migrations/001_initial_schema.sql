-- ============================================================================
-- AI COMPANION UNIVERSE DATABASE SCHEMA
-- Version: 1.0
-- Target: Supabase PostgreSQL
-- ============================================================================

-- Enable Row Level Security (RLS)
ALTER ROLE postgres SET pgaudit.log = 'all';

-- 1. profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  avatar_url TEXT,
  age_group VARCHAR(20), -- 'teen', 'college', 'adult'
  preferred_language VARCHAR(10) DEFAULT 'en',
  is_premium BOOLEAN DEFAULT FALSE,
  last_login TIMESTAMP WITH TIME ZONE
);

-- 2. characters
CREATE TABLE characters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(100) NOT NULL,
  personality TEXT NOT NULL,
  background TEXT NOT NULL,
  learning_subjects TEXT[], -- Array of subjects
  style TEXT NOT NULL,
  relationship_boundary TEXT NOT NULL,
  portrait_path TEXT,
  card_thumbnail TEXT,
  chat_background TEXT,
  system_prompt_template TEXT,
  is_active BOOLEAN DEFAULT TRUE
);

-- 3. conversations
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,
  title TEXT,
  last_message_at TIMESTAMP WITH TIME ZONE
);

-- 4. messages
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL, -- 'user' or 'assistant'
  content TEXT NOT NULL,
  is_story_action BOOLEAN DEFAULT FALSE, -- Flag for parsing ** **
  token_count INT DEFAULT 0
);

-- 5. user_memory
CREATE TABLE user_memory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,
  memory_type VARCHAR(50), -- 'preference', 'interest', 'goal', 'summary'
  content TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);

-- 6. learning_progress
CREATE TABLE learning_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,
  word_or_concept VARCHAR(255) NOT NULL,
  meaning TEXT NOT NULL,
  example TEXT,
  subject VARCHAR(100),
  discovery_date DATE DEFAULT CURRENT_DATE
);

-- 7. daily_usage
CREATE TABLE daily_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  usage_date DATE NOT NULL,
  message_count INT DEFAULT 0 CHECK (message_count >= 0 AND message_count <= 100),
  UNIQUE(user_id, usage_date)
);

-- 8. subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  plan_type VARCHAR(50) NOT NULL, -- 'free', 'premium'
  status VARCHAR(50) NOT NULL, -- 'active', 'cancelled', 'expired'
  start_date DATE NOT NULL,
  end_date DATE,
  payment_id VARCHAR(255)
);

-- 9. user_preferences
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  theme VARCHAR(20) DEFAULT 'dark',
  language VARCHAR(10) DEFAULT 'en',
  notification_enabled BOOLEAN DEFAULT TRUE,
  privacy_settings JSONB DEFAULT '{}'::jsonb
);

-- Indexes for performance
CREATE INDEX idx_conversations_user ON conversations(user_id);
CREATE INDEX idx_messages_conversation ON messages(conversation_id);
CREATE INDEX idx_daily_usage_date ON daily_usage(usage_date);
CREATE INDEX idx_learning_progress_user ON learning_progress(user_id);

-- Row Level Security (RLS) Policies
-- Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY profiles_owner_policy ON profiles FOR ALL TO authenticated USING (id = auth.uid());

-- Conversations
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY conversations_owner_policy ON conversations FOR ALL TO authenticated USING (user_id = auth.uid());

-- Messages
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY messages_owner_policy ON messages FOR ALL TO authenticated USING (user_id = auth.uid());

-- User Memory
ALTER TABLE user_memory ENABLE ROW LEVEL SECURITY;
CREATE POLICY user_memory_owner_policy ON user_memory FOR ALL TO authenticated USING (user_id = auth.uid());

-- Learning Progress
ALTER TABLE learning_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY learning_progress_owner_policy ON learning_progress FOR ALL TO authenticated USING (user_id = auth.uid());

-- Daily Usage
ALTER TABLE daily_usage ENABLE ROW LEVEL SECURITY;
CREATE POLICY daily_usage_owner_policy ON daily_usage FOR ALL TO authenticated USING (user_id = auth.uid());

-- Subscriptions
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY subscriptions_owner_policy ON subscriptions FOR ALL TO authenticated USING (user_id = auth.uid());

-- User Preferences
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
CREATE POLICY user_preferences_owner_policy ON user_preferences FOR ALL TO authenticated USING (user_id = auth.uid());

-- Characters (Publicly readable but restricted writes)
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;
CREATE POLICY characters_read_policy ON characters FOR SELECT TO public;
CREATE POLICY characters_admin_policy ON characters FOR ALL TO authenticated USING (auth.role() = 'service_role');
