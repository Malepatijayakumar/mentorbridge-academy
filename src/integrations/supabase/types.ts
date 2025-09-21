export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      colleges: {
        Row: {
          address: string | null
          code: string
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          code: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          code?: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      competition_registrations: {
        Row: {
          competition_id: string
          id: string
          registered_at: string
          status: string
          team_name: string | null
          user_id: string
        }
        Insert: {
          competition_id: string
          id?: string
          registered_at?: string
          status?: string
          team_name?: string | null
          user_id: string
        }
        Update: {
          competition_id?: string
          id?: string
          registered_at?: string
          status?: string
          team_name?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "competition_registrations_competition_id_fkey"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "competitions"
            referencedColumns: ["id"]
          },
        ]
      }
      competitions: {
        Row: {
          banner_url: string | null
          college_id: string | null
          competition_type: string
          created_at: string
          created_by: string
          description: string | null
          end_date: string
          id: string
          is_active: boolean
          max_participants: number | null
          prizes: string | null
          registration_deadline: string | null
          rules: string | null
          start_date: string
          title: string
          updated_at: string
        }
        Insert: {
          banner_url?: string | null
          college_id?: string | null
          competition_type?: string
          created_at?: string
          created_by: string
          description?: string | null
          end_date: string
          id?: string
          is_active?: boolean
          max_participants?: number | null
          prizes?: string | null
          registration_deadline?: string | null
          rules?: string | null
          start_date: string
          title: string
          updated_at?: string
        }
        Update: {
          banner_url?: string | null
          college_id?: string | null
          competition_type?: string
          created_at?: string
          created_by?: string
          description?: string | null
          end_date?: string
          id?: string
          is_active?: boolean
          max_participants?: number | null
          prizes?: string | null
          registration_deadline?: string | null
          rules?: string | null
          start_date?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "competitions_college_id_fkey"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "colleges"
            referencedColumns: ["id"]
          },
        ]
      }
      event_registrations: {
        Row: {
          event_id: string
          id: string
          registered_at: string
          status: string
          user_id: string
        }
        Insert: {
          event_id: string
          id?: string
          registered_at?: string
          status?: string
          user_id: string
        }
        Update: {
          event_id?: string
          id?: string
          registered_at?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          banner_url: string | null
          college_id: string | null
          created_at: string
          created_by: string
          description: string | null
          end_date: string
          event_type: string
          id: string
          is_active: boolean
          location: string | null
          max_participants: number | null
          registration_deadline: string | null
          start_date: string
          title: string
          updated_at: string
        }
        Insert: {
          banner_url?: string | null
          college_id?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          end_date: string
          event_type?: string
          id?: string
          is_active?: boolean
          location?: string | null
          max_participants?: number | null
          registration_deadline?: string | null
          start_date: string
          title: string
          updated_at?: string
        }
        Update: {
          banner_url?: string | null
          college_id?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          end_date?: string
          event_type?: string
          id?: string
          is_active?: boolean
          location?: string | null
          max_participants?: number | null
          registration_deadline?: string | null
          start_date?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_college_id_fkey"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "colleges"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          college_id: string | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          college_id?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          college_id?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_college_id_fkey"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "colleges"
            referencedColumns: ["id"]
          },
        ]
      }
      resources: {
        Row: {
          college_id: string | null
          created_at: string
          created_by: string
          description: string | null
          file_size: number | null
          file_type: string
          file_url: string
          id: string
          is_active: boolean
          tags: string[] | null
          title: string
          updated_at: string
          visibility: string
        }
        Insert: {
          college_id?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          file_size?: number | null
          file_type: string
          file_url: string
          id?: string
          is_active?: boolean
          tags?: string[] | null
          title: string
          updated_at?: string
          visibility?: string
        }
        Update: {
          college_id?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          file_size?: number | null
          file_type?: string
          file_url?: string
          id?: string
          is_active?: boolean
          tags?: string[] | null
          title?: string
          updated_at?: string
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "resources_college_id_fkey"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "colleges"
            referencedColumns: ["id"]
          },
        ]
      }
      system_settings: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          setting_key: string
          setting_value: Json
          updated_at: string
          updated_by: string
        }
        Insert: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          setting_key: string
          setting_value: Json
          updated_at?: string
          updated_by: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          setting_key?: string
          setting_value?: Json
          updated_at?: string
          updated_by?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: "student" | "mentor" | "admin" | "super_admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["student", "mentor", "admin", "super_admin"],
    },
  },
} as const
