-- Seed sample data for VEDO system

-- Insert sample users
INSERT INTO users (id, email, password_hash, role) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'admin@vedo.gov.sl', '$2b$10$example_hash_1', 'admin'),
('550e8400-e29b-41d4-a716-446655440002', 'sarah@techsarah.com', '$2b$10$example_hash_2', 'creator'),
('550e8400-e29b-41d4-a716-446655440003', 'mohamed@slblogger.com', '$2b$10$example_hash_3', 'creator'),
('550e8400-e29b-41d4-a716-446655440004', 'fatima@fashionfreetown.com', '$2b$10$example_hash_4', 'creator'),
('550e8400-e29b-41d4-a716-446655440005', 'moderator@vedo.gov.sl', '$2b$10$example_hash_5', 'moderator');

-- Insert sample content creators
INSERT INTO content_creators (
    id, user_id, vedo_id, first_name, last_name, email, phone, national_id, 
    date_of_birth, address, creator_name, bio, content_type, primary_platform,
    website_url, facebook_url, twitter_url, instagram_url, youtube_url,
    verification_status, verification_level, verification_date,
    terms_agreed, ip_policy_agreed
) VALUES
(
    '660e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440002',
    'VEDO-2024-001247',
    'Sarah', 'Kamara', 'sarah@techsarah.com', '+232-76-123456', 'SL-ID-001247',
    '1995-03-15', '15 Wilkinson Road, Freetown, Sierra Leone',
    'TechSarah', 'Technology blogger focusing on digital innovation in Sierra Leone and West Africa. Passionate about making technology accessible to everyone.',
    'Technology Blog', 'Personal Website',
    'https://techsarah.com',
    'https://facebook.com/techsarah.sl',
    'https://twitter.com/techsarah_sl',
    'https://instagram.com/techsarah_sl',
    'https://youtube.com/c/techsarah',
    'verified', 'gold', '2024-01-15 10:30:00',
    true, true
),
(
    '660e8400-e29b-41d4-a716-446655440002',
    '550e8400-e29b-41d4-a716-446655440003',
    'VEDO-2024-001248',
    'Mohamed', 'Sesay', 'mohamed@slblogger.com', '+232-77-234567', 'SL-ID-001248',
    '1988-07-22', '8 Kissy Street, Freetown, Sierra Leone',
    'SL_Blogger', 'Independent journalist covering politics, social issues, and development in Sierra Leone.',
    'News & Politics', 'Medium',
    'https://medium.com/@slblogger',
    'https://facebook.com/slblogger',
    'https://twitter.com/sl_blogger',
    NULL, NULL,
    'pending_review', 'bronze', NULL,
    true, true
),
(
    '660e8400-e29b-41d4-a716-446655440003',
    '550e8400-e29b-41d4-a716-446655440004',
    'VEDO-2024-001249',
    'Fatima', 'Koroma', 'fatima@fashionfreetown.com', '+232-78-345678', 'SL-ID-001249',
    '1992-11-08', '22 Circular Road, Freetown, Sierra Leone',
    'FashionFreetown', 'Fashion designer and lifestyle blogger showcasing Sierra Leonean fashion and culture.',
    'Fashion & Lifestyle', 'Instagram',
    'https://fashionfreetown.com',
    'https://facebook.com/fashionfreetown',
    'https://twitter.com/fashionfreetown',
    'https://instagram.com/fashionfreetown',
    NULL,
    'pending_documents', 'bronze', NULL,
    true, true
);

-- Insert sample content submissions
INSERT INTO content_submissions (
    id, creator_id, title, description, content_type, platform, content_url,
    views_count, engagement_count, earnings, verification_status, verified_at,
    published_at, submitted_at
) VALUES
(
    '770e8400-e29b-41d4-a716-446655440001',
    '660e8400-e29b-41d4-a716-446655440001',
    'AI in Sierra Leone: Opportunities and Challenges',
    'Exploring the potential of artificial intelligence in transforming various sectors in Sierra Leone.',
    'Blog Post', 'Personal Website',
    'https://techsarah.com/ai-sierra-leone-opportunities-challenges',
    1250, 89, 150.00,
    'verified', '2024-01-20 14:30:00',
    '2024-01-20 09:00:00', '2024-01-20 09:15:00'
),
(
    '770e8400-e29b-41d4-a716-446655440002',
    '660e8400-e29b-41d4-a716-446655440001',
    'Digital Payment Solutions for Small Businesses',
    'A comprehensive guide to digital payment options available for small businesses in Sierra Leone.',
    'Blog Post', 'Medium',
    'https://medium.com/@techsarah/digital-payment-solutions-small-businesses',
    890, 67, 95.00,
    'pending', NULL,
    '2024-01-18 11:00:00', '2024-01-18 11:30:00'
),
(
    '770e8400-e29b-41d4-a716-446655440003',
    '660e8400-e29b-41d4-a716-446655440001',
    'Cybersecurity Best Practices for Content Creators',
    'Essential cybersecurity tips for digital content creators to protect their work and personal information.',
    'Video', 'YouTube',
    'https://youtube.com/watch?v=example123',
    2340, 156, 280.00,
    'verified', '2024-01-15 16:45:00',
    '2024-01-15 12:00:00', '2024-01-15 12:30:00'
);

-- Insert sample platform analytics
INSERT INTO platform_analytics (
    id, creator_id, platform, followers_count, total_views, total_engagement,
    monthly_earnings, month_year
) VALUES
(
    '880e8400-e29b-41d4-a716-446655440001',
    '660e8400-e29b-41d4-a716-446655440001',
    'Personal Website', 5200, 45230, 3420, 2500.00, '2024-01'
),
(
    '880e8400-e29b-41d4-a716-446655440002',
    '660e8400-e29b-41d4-a716-446655440001',
    'YouTube', 8900, 125000, 8500, 1800.00, '2024-01'
),
(
    '880e8400-e29b-41d4-a716-446655440003',
    '660e8400-e29b-41d4-a716-446655440001',
    'Medium', 3400, 28000, 2100, 650.00, '2024-01'
);

-- Insert sample system logs
INSERT INTO system_logs (
    id, action_type, description, user_id, creator_id, metadata
) VALUES
(
    '990e8400-e29b-41d4-a716-446655440001',
    'registration', 'New creator registration completed',
    '550e8400-e29b-41d4-a716-446655440002',
    '660e8400-e29b-41d4-a716-446655440001',
    '{"ip_address": "192.168.1.100", "user_agent": "Mozilla/5.0"}'
),
(
    '990e8400-e29b-41d4-a716-446655440002',
    'verification', 'Creator verification approved',
    '550e8400-e29b-41d4-a716-446655440001',
    '660e8400-e29b-41d4-a716-446655440001',
    '{"verification_level": "gold", "documents_verified": true}'
),
(
    '990e8400-e29b-41d4-a716-446655440003',
    'content_submission', 'New content submitted for verification',
    '550e8400-e29b-41d4-a716-446655440002',
    '660e8400-e29b-41d4-a716-446655440001',
    '{"content_type": "blog_post", "platform": "personal_website"}'
);

-- Insert sample verification documents
INSERT INTO verification_documents (
    id, creator_id, document_type, document_url, file_name, file_size, mime_type,
    verification_status, verified_at, verified_by
) VALUES
(
    'aa0e8400-e29b-41d4-a716-446655440001',
    '660e8400-e29b-41d4-a716-446655440001',
    'National ID', '/documents/sarah_kamara_national_id.pdf',
    'sarah_kamara_national_id.pdf', 2048576, 'application/pdf',
    'approved', '2024-01-15 10:30:00', '550e8400-e29b-41d4-a716-446655440001'
),
(
    'aa0e8400-e29b-41d4-a716-446655440002',
    '660e8400-e29b-41d4-a716-446655440001',
    'Portfolio Sample', '/documents/sarah_kamara_portfolio_1.pdf',
    'tech_blog_samples.pdf', 5242880, 'application/pdf',
    'approved', '2024-01-15 10:30:00', '550e8400-e29b-41d4-a716-446655440001'
);
