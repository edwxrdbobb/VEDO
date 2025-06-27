-- Create a function to safely initialize demo users
CREATE OR REPLACE FUNCTION initialize_demo_users()
RETURNS TEXT AS $$
DECLARE
    result_text TEXT := '';
BEGIN
    -- Check if demo users already exist
    IF EXISTS (SELECT 1 FROM users WHERE email = 'admin@vedo.gov.sl') THEN
        result_text := 'Demo users already exist. Skipping initialization.';
        RETURN result_text;
    END IF;

    -- Insert demo users (this will be handled by the application layer)
    result_text := 'Demo users should be created through the application initialization process.';
    
    RETURN result_text;
END;
$$ LANGUAGE plpgsql;

-- Create a function to check system initialization status
CREATE OR REPLACE FUNCTION check_system_status()
RETURNS JSON AS $$
DECLARE
    user_count INTEGER;
    creator_count INTEGER;
    result JSON;
BEGIN
    -- Count users
    SELECT COUNT(*) INTO user_count FROM users;
    
    -- Count creators
    SELECT COUNT(*) INTO creator_count FROM content_creators;
    
    -- Build result
    result := json_build_object(
        'total_users', user_count,
        'total_creators', creator_count,
        'demo_users_exist', EXISTS(SELECT 1 FROM users WHERE email = 'admin@vedo.gov.sl'),
        'system_initialized', user_count > 0
    );
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;
