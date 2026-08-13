// Hand-written to match supabase/migrations/*.sql (Phase 1 schema), mirroring
// the shape `supabase gen types typescript` produces so it's a drop-in
// replacement once a real project is linked: `supabase gen types typescript --linked`

export type BookingStatus = "confirmed" | "checked_in" | "checked_out" | "cancelled";
export type ChannelType = "ota" | "direct" | "messaging" | "phone" | "walkin";
export type SyncMethod = "ical" | "manual" | "direct_engine";
export type StaffRole = "owner" | "staff";
export type TravelerStatus = "pending" | "assigned" | "rejected";

type Empty = { [_ in never]: never };

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          role: StaffRole;
          created_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          role?: StaffRole;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      properties: {
        Row: {
          id: string;
          name: string;
          timezone: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          timezone?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["properties"]["Insert"]>;
        Relationships: [];
      };
      room_types: {
        Row: {
          id: string;
          property_id: string;
          name: string;
          description: string | null;
          base_capacity: number;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          property_id: string;
          name: string;
          description?: string | null;
          base_capacity?: number;
          sort_order?: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["room_types"]["Insert"]>;
        Relationships: [];
      };
      rooms_beds: {
        Row: {
          id: string;
          room_type_id: string;
          label: string;
          is_private_room: boolean;
          is_active: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          room_type_id: string;
          label: string;
          is_private_room?: boolean;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["rooms_beds"]["Insert"]>;
        Relationships: [];
      };
      channels: {
        Row: {
          id: string;
          name: string;
          brand_color: string;
          logo_key: string;
          type: ChannelType;
          commission_pct: number | null;
          sync_method: SyncMethod;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          brand_color: string;
          logo_key: string;
          type: ChannelType;
          commission_pct?: number | null;
          sync_method: SyncMethod;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["channels"]["Insert"]>;
        Relationships: [];
      };
      guests: {
        Row: {
          id: string;
          name: string;
          phone: string | null;
          email: string | null;
          id_proof_type: string | null;
          id_proof_number: string | null;
          id_card_paths: string[];
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          phone?: string | null;
          email?: string | null;
          id_proof_type?: string | null;
          id_proof_number?: string | null;
          id_card_paths?: string[];
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["guests"]["Insert"]>;
        Relationships: [];
      };
      bookings: {
        Row: {
          id: string;
          channel_id: string;
          guest_id: string;
          room_bed_id: string;
          checkin_date: string;
          checkout_date: string;
          status: BookingStatus;
          rate_total: number | null;
          amount_paid: number;
          external_ref: string | null;
          note: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          channel_id: string;
          guest_id: string;
          room_bed_id: string;
          checkin_date: string;
          checkout_date: string;
          status?: BookingStatus;
          rate_total?: number | null;
          amount_paid?: number;
          external_ref?: string | null;
          note?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["bookings"]["Insert"]>;
        Relationships: [];
      };
      rate_plans: {
        Row: {
          id: string;
          room_type_id: string;
          base_price: number;
          is_default: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          room_type_id: string;
          base_price: number;
          is_default?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["rate_plans"]["Insert"]>;
        Relationships: [];
      };
      pricing_rules: {
        Row: {
          id: string;
          property_id: string;
          weekly_discount_pct: number;
          extended_discount_pct: number;
          monthly_discount_pct: number;
          weekend_discount_pct: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          property_id: string;
          weekly_discount_pct?: number;
          extended_discount_pct?: number;
          monthly_discount_pct?: number;
          weekend_discount_pct?: number;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["pricing_rules"]["Insert"]>;
        Relationships: [];
      };
      guest_checkins: {
        Row: {
          id: string;
          room_type_id: string;
          email: string;
          phone: string | null;
          checkin_date: string;
          checkout_date: string;
          add_ons: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          room_type_id: string;
          email: string;
          phone?: string | null;
          checkin_date: string;
          checkout_date: string;
          add_ons?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["guest_checkins"]["Insert"]>;
        Relationships: [];
      };
      guest_checkin_travelers: {
        Row: {
          id: string;
          checkin_id: string;
          name: string;
          id_card_paths: string[];
          status: TravelerStatus;
          assigned_room_bed_id: string | null;
          booking_id: string | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          checkin_id: string;
          name: string;
          id_card_paths: string[];
          status?: TravelerStatus;
          assigned_room_bed_id?: string | null;
          booking_id?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["guest_checkin_travelers"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Empty;
    Functions: Empty;
    Enums: {
      booking_status: BookingStatus;
      channel_type: ChannelType;
      sync_method: SyncMethod;
      staff_role: StaffRole;
      traveler_status: TravelerStatus;
    };
    CompositeTypes: Empty;
  };
}
