export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: 'staff' | 'supervisor' | 'central-admin' | 'customer';
          phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          role?: 'staff' | 'supervisor' | 'central-admin' | 'customer';
          phone?: string | null;
        };
        Update: {
          email?: string;
          full_name?: string | null;
          role?: 'staff' | 'supervisor' | 'central-admin' | 'customer';
          phone?: string | null;
        };
      };
      buildings: {
        Row: {
          id: string;
          name: string;
          address: string;
          units: number;
          contact_name: string;
          contact_phone: string | null;
          contact_email: string | null;
          service_status: 'active' | 'pending' | 'suspended';
          next_pickup: string | null;
          monthly_volume: number;
          join_date: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          address: string;
          units: number;
          contact_name: string;
          contact_phone?: string | null;
          contact_email?: string | null;
          service_status?: 'active' | 'pending' | 'suspended';
          next_pickup?: string | null;
          monthly_volume?: number;
          join_date?: string;
        };
        Update: {
          name?: string;
          address?: string;
          units?: number;
          contact_name?: string;
          contact_phone?: string | null;
          contact_email?: string | null;
          service_status?: 'active' | 'pending' | 'suspended';
          next_pickup?: string | null;
          monthly_volume?: number;
          join_date?: string;
        };
      };
      collection_schedules: {
        Row: {
          id: string;
          building_id: string;
          date: string;
          time_slot: string;
          collection_type: 'wet' | 'dry' | 'mixed' | 'all';
          status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
          assigned_staff_id: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          building_id: string;
          date: string;
          time_slot: string;
          collection_type: 'wet' | 'dry' | 'mixed' | 'all';
          status?: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
          assigned_staff_id?: string | null;
          notes?: string | null;
        };
        Update: {
          building_id?: string;
          date?: string;
          time_slot?: string;
          collection_type?: 'wet' | 'dry' | 'mixed' | 'all';
          status?: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
          assigned_staff_id?: string | null;
          notes?: string | null;
        };
      };
      composters: {
        Row: {
          id: string;
          qr_code: string;
          type: string;
          location: string;
          location_type: 'apartment' | 'villa' | 'commercial';
          customer_name: string;
          address: string;
          manufacturing_date: string | null;
          installation_date: string | null;
          next_service_date: string | null;
          status: 'active' | 'maintenance' | 'inactive';
          current_temp: number | null;
          last_service: string | null;
          total_waste_processed: number;
          compost_generated: number;
          maintenance_count: number;
          alerts: number;
          compost_category: 'wet' | 'garden' | null;
          special_project: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          qr_code: string;
          type: string;
          location: string;
          location_type: 'apartment' | 'villa' | 'commercial';
          customer_name: string;
          address: string;
          manufacturing_date?: string | null;
          installation_date?: string | null;
          next_service_date?: string | null;
          status?: 'active' | 'maintenance' | 'inactive';
          current_temp?: number | null;
          last_service?: string | null;
          total_waste_processed?: number;
          compost_generated?: number;
          maintenance_count?: number;
          alerts?: number;
          compost_category?: 'wet' | 'garden' | null;
          special_project?: boolean;
        };
        Update: {
          qr_code?: string;
          type?: string;
          location?: string;
          location_type?: 'apartment' | 'villa' | 'commercial';
          customer_name?: string;
          address?: string;
          manufacturing_date?: string | null;
          installation_date?: string | null;
          next_service_date?: string | null;
          status?: 'active' | 'maintenance' | 'inactive';
          current_temp?: number | null;
          last_service?: string | null;
          total_waste_processed?: number;
          compost_generated?: number;
          maintenance_count?: number;
          alerts?: number;
          compost_category?: 'wet' | 'garden' | null;
          special_project?: boolean;
        };
      };
    };
  };
}
