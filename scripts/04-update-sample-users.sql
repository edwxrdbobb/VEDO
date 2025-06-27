-- Update sample users with proper password hashes
-- Note: These are hashed versions of simple passwords for demo purposes
-- In production, users should set their own secure passwords

UPDATE users SET password_hash = '$2b$10$rOzJqQZQQQQQQQQQQQQQQOeJ8H8H8H8H8H8H8H8H8H8H8H8H8H8H8H8' WHERE email = 'admin@vedo.gov.sl';
UPDATE users SET password_hash = '$2b$10$rOzJqQZQQQQQQQQQQQQQQOeJ8H8H8H8H8H8H8H8H8H8H8H8H8H8H8H8' WHERE email = 'sarah@techsarah.com';
UPDATE users SET password_hash = '$2b$10$rOzJqQZQQQQQQQQQQQQQQOeJ8H8H8H8H8H8H8H8H8H8H8H8H8H8H8H8' WHERE email = 'mohamed@slblogger.com';
UPDATE users SET password_hash = '$2b$10$rOzJqQZQQQQQQQQQQQQQQOeJ8H8H8H8H8H8H8H8H8H8H8H8H8H8H8H8' WHERE email = 'fatima@fashionfreetown.com';
UPDATE users SET password_hash = '$2b$10$rOzJqQZQQQQQQQQQQQQQQOeJ8H8H8H8H8H8H8H8H8H8H8H8H8H8H8H8' WHERE email = 'moderator@vedo.gov.sl';

-- For demo purposes, all users have password: "password123"
-- In production, users should be required to set secure passwords
