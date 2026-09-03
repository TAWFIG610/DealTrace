-- ==============================================================================
-- DealTrace Database Schema & Storage Configuration (Supabase / PostgreSQL)
-- Run this entire script in your Supabase SQL Editor to initialize the database.
-- ==============================================================================

-- 1. Enable pgcrypto for UUID generation (enabled by default in Supabase)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Create the main 'deals' table
CREATE TABLE IF NOT EXISTS public.deals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,

    -- Vehicle identification & specs (from NHTSA VIN decoder or manual entry)
    vin VARCHAR(17),
    year VARCHAR(10),
    make VARCHAR(100),
    model VARCHAR(100),
    trim VARCHAR(100),
    engine VARCHAR(150),
    transmission VARCHAR(100),
    body_type VARCHAR(100),
    drive_type VARCHAR(100),
    fuel_type VARCHAR(100),
    exterior_color VARCHAR(100),

    -- Ownership & Deal details
    status VARCHAR(50) DEFAULT 'Owned',
    buyer_name VARCHAR(150),
    purchase_price NUMERIC,
    purchase_state VARCHAR(50),
    purchase_date DATE,
    mileage NUMERIC,
    condition VARCHAR(100),
    seller VARCHAR(150),
    location VARCHAR(150),
    title_status VARCHAR(50) DEFAULT 'Clean',

    -- Financials & Repairs
    repair_notes TEXT,
    repair_cost NUMERIC DEFAULT 0,
    other_costs NUMERIC DEFAULT 0,
    sale_info VARCHAR(150),
    sale_price NUMERIC,
    deal_rating INTEGER CHECK (deal_rating BETWEEN 1 AND 5),

    -- Insights & Notes
    lessons_learned TEXT,
    notes TEXT,

    -- Custom dynamic fields & photos
    custom_fields JSONB DEFAULT '{}'::jsonb,
    photos JSONB DEFAULT '[]'::jsonb
);

-- 3. Create high-performance indexes for fast deal search and comparison
CREATE INDEX IF NOT EXISTS idx_deals_vin ON public.deals(vin);
CREATE INDEX IF NOT EXISTS idx_deals_compare ON public.deals(LOWER(year), LOWER(make), LOWER(model));
CREATE INDEX IF NOT EXISTS idx_deals_buyer ON public.deals(LOWER(buyer_name));
CREATE INDEX IF NOT EXISTS idx_deals_created_at ON public.deals(created_at DESC);

-- 4. Automatically update the updated_at timestamp on row modification
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_set_updated_at ON public.deals;
CREATE TRIGGER trigger_set_updated_at
    BEFORE UPDATE ON public.deals
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users (such as your admin) to perform all operations
DROP POLICY IF EXISTS "Allow authenticated users full access on deals" ON public.deals;
CREATE POLICY "Allow authenticated users full access on deals"
    ON public.deals
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 6. Setup Supabase Storage Bucket for car photos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'deal-photos',
    'deal-photos',
    true,
    10485760, -- 10MB limit per photo
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 10485760;

-- 7. Storage bucket policies for deal photos
DROP POLICY IF EXISTS "Public can view deal photos" ON storage.objects;
CREATE POLICY "Public can view deal photos"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'deal-photos');

DROP POLICY IF EXISTS "Authenticated users can upload deal photos" ON storage.objects;
CREATE POLICY "Authenticated users can upload deal photos"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'deal-photos');

DROP POLICY IF EXISTS "Authenticated users can update deal photos" ON storage.objects;
CREATE POLICY "Authenticated users can update deal photos"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'deal-photos');

DROP POLICY IF EXISTS "Authenticated users can delete deal photos" ON storage.objects;
CREATE POLICY "Authenticated users can delete deal photos"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'deal-photos');
