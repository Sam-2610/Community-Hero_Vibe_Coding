-- Enable the PostGIS extension for advanced geolocation queries (optional but recommended for heatmaps later)
CREATE EXTENSION IF NOT EXISTS postgis;

-- Core Issues Table
CREATE TABLE issues (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  severity TEXT NOT NULL, -- Low, Medium, High, Critical
  status TEXT DEFAULT 'Reported', -- Reported, Verified, In Progress, Resolved
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  image_url TEXT NOT NULL,
  reporter_id UUID REFERENCES auth.users(id), -- Nullable if allowing anonymous reports
  verification_count INTEGER DEFAULT 0, -- Gamification/Community validation
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for Community Verification (Upvotes)
CREATE TABLE issue_verifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  issue_id UUID REFERENCES issues(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(issue_id, user_id) -- Prevent double voting
);