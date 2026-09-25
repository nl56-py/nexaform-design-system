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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          claimed_at: string | null
          created_at: string
          display_name: string | null
          email: string
          id: string
          is_active: boolean
          role: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          claimed_at?: string | null
          created_at?: string
          display_name?: string | null
          email: string
          id?: string
          is_active?: boolean
          role?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          claimed_at?: string | null
          created_at?: string
          display_name?: string | null
          email?: string
          id?: string
          is_active?: boolean
          role?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          category: string
          content: string | null
          cover_image: string | null
          created_at: string
          excerpt: string
          id: string
          published: boolean
          published_at: string | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          content?: string | null
          cover_image?: string | null
          created_at?: string
          excerpt: string
          id?: string
          published?: boolean
          published_at?: string | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          content?: string | null
          cover_image?: string | null
          created_at?: string
          excerpt?: string
          id?: string
          published?: boolean
          published_at?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      case_studies: {
        Row: {
          content: string | null
          cover_image: string | null
          created_at: string
          description: string
          display_order: number
          id: string
          industry: string | null
          outcome: string
          published: boolean
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          cover_image?: string | null
          created_at?: string
          description: string
          display_order?: number
          id?: string
          industry?: string | null
          outcome: string
          published?: boolean
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          cover_image?: string | null
          created_at?: string
          description?: string
          display_order?: number
          id?: string
          industry?: string | null
          outcome?: string
          published?: boolean
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          budget: string | null
          company: string | null
          created_at: string
          email: string
          id: string
          message: string
          name: string
          project_type: string | null
          status: string
          timeline: string | null
        }
        Insert: {
          budget?: string | null
          company?: string | null
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          project_type?: string | null
          status?: string
          timeline?: string | null
        }
        Update: {
          budget?: string | null
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          project_type?: string | null
          status?: string
          timeline?: string | null
        }
        Relationships: []
      }
      digital_fairness_bookings: {
        Row: {
          business_category: string
          created_at: string
          domain_support: string | null
          email: string
          id: string
          name: string
          organization: string | null
          phone: string
          preferred_timeline: string | null
          services_description: string
          source_path: string
          status: string
          updated_at: string
        }
        Insert: {
          business_category: string
          created_at?: string
          domain_support?: string | null
          email: string
          id?: string
          name: string
          organization?: string | null
          phone: string
          preferred_timeline?: string | null
          services_description: string
          source_path?: string
          status?: string
          updated_at?: string
        }
        Update: {
          business_category?: string
          created_at?: string
          domain_support?: string | null
          email?: string
          id?: string
          name?: string
          organization?: string | null
          phone?: string
          preferred_timeline?: string | null
          services_description?: string
          source_path?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      free_audit_requests: {
        Row: {
          business_category: string
          business_name: string
          contact_number: string
          created_at: string
          email: string
          id: string
          name: string
          notes: string | null
          primary_goal: string | null
          service_area: string | null
          services: string
          source_path: string
          status: string
          updated_at: string
          website_url: string
        }
        Insert: {
          business_category: string
          business_name: string
          contact_number: string
          created_at?: string
          email: string
          id?: string
          name: string
          notes?: string | null
          primary_goal?: string | null
          service_area?: string | null
          services: string
          source_path?: string
          status?: string
          updated_at?: string
          website_url: string
        }
        Update: {
          business_category?: string
          business_name?: string
          contact_number?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
          notes?: string | null
          primary_goal?: string | null
          service_area?: string | null
          services?: string
          source_path?: string
          status?: string
          updated_at?: string
          website_url?: string
        }
        Relationships: []
      }
      job_positions: {
        Row: {
          id: string
          title: string
          slug: string
          department: string
          location: string
          employment_type: string
          experience_level: string
          salary_range: string | null
          description: string
          requirements: string | null
          benefits: string | null
          published: boolean
          published_at: string | null
          deadline: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          department?: string
          location?: string
          employment_type?: string
          experience_level?: string
          salary_range?: string | null
          description?: string
          requirements?: string | null
          benefits?: string | null
          published?: boolean
          published_at?: string | null
          deadline?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          department?: string
          location?: string
          employment_type?: string
          experience_level?: string
          salary_range?: string | null
          description?: string
          requirements?: string | null
          benefits?: string | null
          published?: boolean
          published_at?: string | null
          deadline?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          id: string
          position_id: string
          full_name: string
          email: string
          phone: string | null
          portfolio_url: string | null
          cover_letter: string | null
          resume_url: string | null
          experience_years: string | null
          current_role: string | null
          status: string
          admin_notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          position_id: string
          full_name: string
          email: string
          phone?: string | null
          portfolio_url?: string | null
          cover_letter?: string | null
          resume_url?: string | null
          experience_years?: string | null
          current_role?: string | null
          status?: string
          admin_notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          position_id?: string
          full_name?: string
          email?: string
          phone?: string | null
          portfolio_url?: string | null
          cover_letter?: string | null
          resume_url?: string | null
          experience_years?: string | null
          current_role?: string | null
          status?: string
          admin_notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_position_id_fkey"
            columns: ["position_id"]
            isOneToOne: false
            referencedRelation: "job_positions"
            referencedColumns: ["id"]
          }
        ]
      }
      hms_leads: {
        Row: {
          id: string
          name: string
          type: string
          area_city: string
          address: string | null
          phone: string | null
          whatsapp_viber: string | null
          email: string | null
          website: string | null
          facebook_url: string | null
          contact_person: string | null
          rating: number | null
          reviews_count: number | null
          rating_raw: string | null
          approximate_size: string | null
          source_urls: string | null
          status: string
          priority: string
          notes: string | null
          follow_up_date: string | null
          last_contacted_at: string | null
          assigned_to: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          type?: string
          area_city: string
          address?: string | null
          phone?: string | null
          whatsapp_viber?: string | null
          email?: string | null
          website?: string | null
          facebook_url?: string | null
          contact_person?: string | null
          rating?: number | null
          reviews_count?: number | null
          rating_raw?: string | null
          approximate_size?: string | null
          source_urls?: string | null
          status?: string
          priority?: string
          notes?: string | null
          follow_up_date?: string | null
          last_contacted_at?: string | null
          assigned_to?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: string
          area_city?: string
          address?: string | null
          phone?: string | null
          whatsapp_viber?: string | null
          email?: string | null
          website?: string | null
          facebook_url?: string | null
          contact_person?: string | null
          rating?: number | null
          reviews_count?: number | null
          rating_raw?: string | null
          approximate_size?: string | null
          source_urls?: string | null
          status?: string
          priority?: string
          notes?: string | null
          follow_up_date?: string | null
          last_contacted_at?: string | null
          assigned_to?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      claim_admin_access: {
        Args: Record<PropertyKey, never>
        Returns: {
          claimed_at: string | null
          created_at: string
          display_name: string | null
          email: string
          id: string
          is_active: boolean
          role: string
          updated_at: string
          user_id: string | null
        }[]
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
