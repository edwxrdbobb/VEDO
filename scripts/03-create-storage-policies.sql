-- Create storage bucket for documents
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', true);

-- Create storage policies for document uploads
CREATE POLICY "Allow authenticated users to upload documents" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'documents' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Allow users to view their own documents" ON storage.objects
FOR SELECT USING (
  bucket_id = 'documents'
  AND (auth.uid()::text = (storage.foldername(name))[1] OR auth.jwt() ->> 'role' = 'admin')
);

CREATE POLICY "Allow admins to view all documents" ON storage.objects
FOR SELECT USING (
  bucket_id = 'documents'
  AND auth.jwt() ->> 'role' = 'admin'
);

-- Create RLS policies for verification_documents table
ALTER TABLE verification_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own documents" ON verification_documents
FOR SELECT USING (
  creator_id IN (
    SELECT id FROM content_creators WHERE user_id = auth.uid()
  )
  OR EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'moderator')
  )
);

CREATE POLICY "Users can insert their own documents" ON verification_documents
FOR INSERT WITH CHECK (
  creator_id IN (
    SELECT id FROM content_creators WHERE user_id = auth.uid()
  )
);

-- Create RLS policies for content_creators table
ALTER TABLE content_creators ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON content_creators
FOR SELECT USING (
  user_id = auth.uid()
  OR EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'moderator')
  )
  OR verification_status = 'verified' -- Public verification
);

CREATE POLICY "Users can update their own profile" ON content_creators
FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Admins can update any profile" ON content_creators
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'moderator')
  )
);

-- Create RLS policies for content_submissions table
ALTER TABLE content_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own content" ON content_submissions
FOR SELECT USING (
  creator_id IN (
    SELECT id FROM content_creators WHERE user_id = auth.uid()
  )
  OR EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'moderator')
  )
);

CREATE POLICY "Users can insert their own content" ON content_submissions
FOR INSERT WITH CHECK (
  creator_id IN (
    SELECT id FROM content_creators WHERE user_id = auth.uid()
  )
);

-- Create RLS policies for system_logs table
ALTER TABLE system_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view system logs" ON system_logs
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'moderator')
  )
);

CREATE POLICY "System can insert logs" ON system_logs
FOR INSERT WITH CHECK (true);
