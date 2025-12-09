/*
  # Create Initial Schema for StoneSoup Composting Management System

  ## Overview
  This migration creates the complete database schema for managing composting services,
  buildings, waste collection schedules, and staff operations.

  ## 1. New Tables

  ### `profiles`
  - `id` (uuid, primary key, references auth.users)
  - `email` (text)
  - `full_name` (text)
  - `role` (text) - staff, supervisor, central-admin, customer
  - `phone` (text)
  - `created_at` (timestamp)
  - `updated_at` (timestamp)

  ### `buildings`
  - `id` (uuid, primary key)
  - `name` (text)
  - `address` (text)
  - `units` (integer)
  - `contact_name` (text)
  - `contact_phone` (text)
  - `contact_email` (text)
  - `service_status` (text) - active, pending, suspended
  - `next_pickup` (date)
  - `monthly_volume` (integer)
  - `join_date` (date)
  - `created_at` (timestamp)
  - `updated_at` (timestamp)

  ### `waste_data`
  - `id` (uuid, primary key)
  - `building_id` (uuid, foreign key)
  - `month` (date)
  - `dry_waste` (numeric)
  - `wet_waste` (numeric)
  - `rejected_waste` (numeric)
  - `created_at` (timestamp)

  ### `mixed_waste_incidents`
  - `id` (uuid, primary key)
  - `building_id` (uuid, foreign key)
  - `apartment_number` (text)
  - `amount` (numeric)
  - `image_url` (text)
  - `description` (text)
  - `timestamp` (timestamp)
  - `created_at` (timestamp)

  ### `violating_apartments`
  - `id` (uuid, primary key)
  - `building_id` (uuid, foreign key)
  - `apartment_number` (text)
  - `violation_count` (integer)
  - `last_violation` (timestamp)
  - `created_at` (timestamp)

  ### `composters`
  - `id` (uuid, primary key)
  - `qr_code` (text, unique)
  - `type` (text) - O'Joy, Aaditi, Ishta
  - `location` (text)
  - `location_type` (text) - apartment, villa, commercial
  - `customer_name` (text)
  - `address` (text)
  - `manufacturing_date` (date)
  - `installation_date` (date)
  - `next_service_date` (date)
  - `status` (text) - active, maintenance, inactive
  - `current_temp` (numeric)
  - `last_service` (date)
  - `total_waste_processed` (numeric)
  - `compost_generated` (numeric)
  - `maintenance_count` (integer)
  - `alerts` (integer)
  - `compost_category` (text) - wet, garden
  - `special_project` (boolean)
  - `created_at` (timestamp)
  - `updated_at` (timestamp)

  ### `collection_schedules`
  - `id` (uuid, primary key)
  - `building_id` (uuid, foreign key)
  - `date` (date)
  - `time_slot` (text)
  - `collection_type` (text) - wet, dry, mixed, all
  - `status` (text) - scheduled, in-progress, completed, cancelled
  - `assigned_staff_id` (uuid, foreign key)
  - `notes` (text)
  - `created_at` (timestamp)
  - `updated_at` (timestamp)

  ### `shredders`
  - `id` (uuid, primary key)
  - `qr_code` (text, unique)
  - `type` (text)
  - `location` (text)
  - `location_type` (text)
  - `customer_name` (text)
  - `address` (text)
  - `installation_date` (date)
  - `next_service_date` (date)
  - `status` (text)
  - `last_service` (date)
  - `total_waste_processed` (numeric)
  - `maintenance_count` (integer)
  - `created_at` (timestamp)
  - `updated_at` (timestamp)

  ## 2. Security
  - Enable RLS on all tables
  - Add policies for authenticated users based on roles
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  role text NOT NULL DEFAULT 'customer',
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create buildings table
CREATE TABLE IF NOT EXISTS buildings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  units integer NOT NULL DEFAULT 0,
  contact_name text NOT NULL,
  contact_phone text,
  contact_email text,
  service_status text NOT NULL DEFAULT 'pending',
  next_pickup date,
  monthly_volume integer DEFAULT 0,
  join_date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE buildings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read buildings"
  ON buildings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins and supervisors can insert buildings"
  ON buildings FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('central-admin', 'supervisor')
    )
  );

CREATE POLICY "Admins and supervisors can update buildings"
  ON buildings FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('central-admin', 'supervisor')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('central-admin', 'supervisor')
    )
  );

CREATE POLICY "Admins can delete buildings"
  ON buildings FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'central-admin'
    )
  );

-- Create waste_data table
CREATE TABLE IF NOT EXISTS waste_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  building_id uuid REFERENCES buildings(id) ON DELETE CASCADE,
  month date NOT NULL,
  dry_waste numeric DEFAULT 0,
  wet_waste numeric DEFAULT 0,
  rejected_waste numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE waste_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read waste data"
  ON waste_data FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Staff and admins can insert waste data"
  ON waste_data FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('central-admin', 'supervisor', 'staff')
    )
  );

CREATE POLICY "Staff and admins can update waste data"
  ON waste_data FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('central-admin', 'supervisor', 'staff')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('central-admin', 'supervisor', 'staff')
    )
  );

-- Create mixed_waste_incidents table
CREATE TABLE IF NOT EXISTS mixed_waste_incidents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  building_id uuid REFERENCES buildings(id) ON DELETE CASCADE,
  apartment_number text NOT NULL,
  amount numeric NOT NULL,
  image_url text,
  description text,
  timestamp timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE mixed_waste_incidents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read incidents"
  ON mixed_waste_incidents FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Staff and admins can insert incidents"
  ON mixed_waste_incidents FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('central-admin', 'supervisor', 'staff')
    )
  );

CREATE POLICY "Staff and admins can update incidents"
  ON mixed_waste_incidents FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('central-admin', 'supervisor', 'staff')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('central-admin', 'supervisor', 'staff')
    )
  );

-- Create violating_apartments table
CREATE TABLE IF NOT EXISTS violating_apartments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  building_id uuid REFERENCES buildings(id) ON DELETE CASCADE,
  apartment_number text NOT NULL,
  violation_count integer DEFAULT 1,
  last_violation timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(building_id, apartment_number)
);

ALTER TABLE violating_apartments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read violations"
  ON violating_apartments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Staff and admins can insert violations"
  ON violating_apartments FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('central-admin', 'supervisor', 'staff')
    )
  );

CREATE POLICY "Staff and admins can update violations"
  ON violating_apartments FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('central-admin', 'supervisor', 'staff')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('central-admin', 'supervisor', 'staff')
    )
  );

-- Create composters table
CREATE TABLE IF NOT EXISTS composters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  qr_code text UNIQUE NOT NULL,
  type text NOT NULL,
  location text NOT NULL,
  location_type text NOT NULL,
  customer_name text NOT NULL,
  address text NOT NULL,
  manufacturing_date date,
  installation_date date,
  next_service_date date,
  status text DEFAULT 'active',
  current_temp numeric,
  last_service date,
  total_waste_processed numeric DEFAULT 0,
  compost_generated numeric DEFAULT 0,
  maintenance_count integer DEFAULT 0,
  alerts integer DEFAULT 0,
  compost_category text,
  special_project boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE composters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read composters"
  ON composters FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert composters"
  ON composters FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'central-admin'
    )
  );

CREATE POLICY "Admins and supervisors can update composters"
  ON composters FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('central-admin', 'supervisor')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('central-admin', 'supervisor')
    )
  );

CREATE POLICY "Admins can delete composters"
  ON composters FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'central-admin'
    )
  );

-- Create collection_schedules table
CREATE TABLE IF NOT EXISTS collection_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  building_id uuid REFERENCES buildings(id) ON DELETE CASCADE,
  date date NOT NULL,
  time_slot text NOT NULL,
  collection_type text NOT NULL,
  status text DEFAULT 'scheduled',
  assigned_staff_id uuid REFERENCES profiles(id),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE collection_schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read schedules"
  ON collection_schedules FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins and supervisors can insert schedules"
  ON collection_schedules FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('central-admin', 'supervisor')
    )
  );

CREATE POLICY "Staff and admins can update schedules"
  ON collection_schedules FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('central-admin', 'supervisor', 'staff')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('central-admin', 'supervisor', 'staff')
    )
  );

CREATE POLICY "Admins and supervisors can delete schedules"
  ON collection_schedules FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('central-admin', 'supervisor')
    )
  );

-- Create shredders table
CREATE TABLE IF NOT EXISTS shredders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  qr_code text UNIQUE NOT NULL,
  type text NOT NULL,
  location text NOT NULL,
  location_type text NOT NULL,
  customer_name text NOT NULL,
  address text NOT NULL,
  installation_date date,
  next_service_date date,
  status text DEFAULT 'active',
  last_service date,
  total_waste_processed numeric DEFAULT 0,
  maintenance_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE shredders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read shredders"
  ON shredders FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert shredders"
  ON shredders FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'central-admin'
    )
  );

CREATE POLICY "Admins and supervisors can update shredders"
  ON shredders FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('central-admin', 'supervisor')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('central-admin', 'supervisor')
    )
  );

CREATE POLICY "Admins can delete shredders"
  ON shredders FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'central-admin'
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_buildings_service_status ON buildings(service_status);
CREATE INDEX IF NOT EXISTS idx_waste_data_building_id ON waste_data(building_id);
CREATE INDEX IF NOT EXISTS idx_waste_data_month ON waste_data(month);
CREATE INDEX IF NOT EXISTS idx_incidents_building_id ON mixed_waste_incidents(building_id);
CREATE INDEX IF NOT EXISTS idx_violations_building_id ON violating_apartments(building_id);
CREATE INDEX IF NOT EXISTS idx_composters_status ON composters(status);
CREATE INDEX IF NOT EXISTS idx_composters_location_type ON composters(location_type);
CREATE INDEX IF NOT EXISTS idx_schedules_building_id ON collection_schedules(building_id);
CREATE INDEX IF NOT EXISTS idx_schedules_date ON collection_schedules(date);
CREATE INDEX IF NOT EXISTS idx_schedules_status ON collection_schedules(status);
CREATE INDEX IF NOT EXISTS idx_schedules_staff_id ON collection_schedules(assigned_staff_id);
CREATE INDEX IF NOT EXISTS idx_shredders_status ON shredders(status);
