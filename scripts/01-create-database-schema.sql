-- VEDO Database Schema
-- Digital Content Creator Registration System for Sierra Leone

-- Create database tables for the VEDO system

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'creator' CHECK (role IN ('creator', 'admin', 'moderator')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Content creators table
CREATE TABLE IF NOT EXISTS content_creators (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    vedo_id VARCHAR(50) UNIQUE NOT NULL,
    
    -- Personal Information
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    national_id VARCHAR(50) UNIQUE NOT NULL,
    date_of_birth DATE NOT NULL,
    address TEXT NOT NULL,
    
    -- Creator Information
    creator_name VARCHAR(100) NOT NULL,
    bio TEXT,
    content_type VARCHAR(100) NOT NULL,
    primary_platform VARCHAR(100) NOT NULL,
    website_url VARCHAR(255),
    
    -- Social Media
    facebook_url VARCHAR(255),
    twitter_url VARCHAR(255),
    instagram_url VARCHAR(255),
    youtube_url VARCHAR(255),
    tiktok_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    
    -- Verification Status
    verification_status VARCHAR(50) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'under_review', 'verified', 'rejected', 'suspended')),
    verification_level VARCHAR(20) DEFAULT 'bronze' CHECK (verification_level IN ('bronze', 'silver', 'gold')),
    verification_date TIMESTAMP,
    
    -- Documents
    id_document_url VARCHAR(255),
    portfolio_documents JSONB DEFAULT '[]',
    
    -- Agreements
    terms_agreed BOOLEAN DEFAULT FALSE,
    ip_policy_agreed BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Content submissions table
CREATE TABLE IF NOT EXISTS content_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    creator_id UUID REFERENCES content_creators(id) ON DELETE CASCADE,
    
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content_type VARCHAR(100) NOT NULL,
    platform VARCHAR(100) NOT NULL,
    content_url VARCHAR(255) NOT NULL,
    
    -- Metrics
    views_count INTEGER DEFAULT 0,
    engagement_count INTEGER DEFAULT 0,
    earnings DECIMAL(10,2) DEFAULT 0.00,
    
    -- Verification
    verification_status VARCHAR(50) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'flagged', 'rejected')),
    verified_at TIMESTAMP,
    verified_by UUID REFERENCES users(id),
    
    -- Timestamps
    published_at TIMESTAMP,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Platform analytics table
CREATE TABLE IF NOT EXISTS platform_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    creator_id UUID REFERENCES content_creators(id) ON DELETE CASCADE,
    
    platform VARCHAR(100) NOT NULL,
    followers_count INTEGER DEFAULT 0,
    total_views INTEGER DEFAULT 0,
    total_engagement INTEGER DEFAULT 0,
    monthly_earnings DECIMAL(10,2) DEFAULT 0.00,
    
    -- Timestamps
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    month_year VARCHAR(7) NOT NULL -- Format: YYYY-MM
);

-- Verification documents table
CREATE TABLE IF NOT EXISTS verification_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    creator_id UUID REFERENCES content_creators(id) ON DELETE CASCADE,
    
    document_type VARCHAR(100) NOT NULL,
    document_url VARCHAR(255) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size INTEGER,
    mime_type VARCHAR(100),
    
    -- Verification
    verification_status VARCHAR(50) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
    verified_at TIMESTAMP,
    verified_by UUID REFERENCES users(id),
    rejection_reason TEXT,
    
    -- Timestamps
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- System logs table
CREATE TABLE IF NOT EXISTS system_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    action_type VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    user_id UUID REFERENCES users(id),
    creator_id UUID REFERENCES content_creators(id),
    
    -- Additional data
    metadata JSONB DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    
    -- Timestamp
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Content flags table
CREATE TABLE IF NOT EXISTS content_flags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_id UUID REFERENCES content_submissions(id) ON DELETE CASCADE,
    
    flag_type VARCHAR(100) NOT NULL,
    reason TEXT NOT NULL,
    flagged_by UUID REFERENCES users(id),
    
    -- Resolution
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'resolved', 'dismissed')),
    resolved_by UUID REFERENCES users(id),
    resolution_notes TEXT,
    resolved_at TIMESTAMP,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_content_creators_vedo_id ON content_creators(vedo_id);
CREATE INDEX IF NOT EXISTS idx_content_creators_email ON content_creators(email);
CREATE INDEX IF NOT EXISTS idx_content_creators_verification_status ON content_creators(verification_status);
CREATE INDEX IF NOT EXISTS idx_content_submissions_creator_id ON content_submissions(creator_id);
CREATE INDEX IF NOT EXISTS idx_content_submissions_platform ON content_submissions(platform);
CREATE INDEX IF NOT EXISTS idx_platform_analytics_creator_id ON platform_analytics(creator_id);
CREATE INDEX IF NOT EXISTS idx_system_logs_created_at ON system_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_content_flags_status ON content_flags(status);

-- Create function to generate VEDO ID
CREATE OR REPLACE FUNCTION generate_vedo_id()
RETURNS TEXT AS $$
DECLARE
    year_part TEXT;
    sequence_part TEXT;
    next_id INTEGER;
BEGIN
    year_part := EXTRACT(YEAR FROM CURRENT_DATE)::TEXT;
    
    -- Get the next sequence number for this year
    SELECT COALESCE(MAX(CAST(SUBSTRING(vedo_id FROM 11) AS INTEGER)), 0) + 1
    INTO next_id
    FROM content_creators
    WHERE vedo_id LIKE 'VEDO-' || year_part || '-%';
    
    sequence_part := LPAD(next_id::TEXT, 6, '0');
    
    RETURN 'VEDO-' || year_part || '-' || sequence_part;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate VEDO ID
CREATE OR REPLACE FUNCTION set_vedo_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.vedo_id IS NULL OR NEW.vedo_id = '' THEN
        NEW.vedo_id := generate_vedo_id();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_vedo_id
    BEFORE INSERT ON content_creators
    FOR EACH ROW
    EXECUTE FUNCTION set_vedo_id();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at columns
CREATE TRIGGER trigger_update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_content_creators_updated_at
    BEFORE UPDATE ON content_creators
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_content_submissions_updated_at
    BEFORE UPDATE ON content_submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
