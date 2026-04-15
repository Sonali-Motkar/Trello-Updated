"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { useSession } from "@clerk/nextjs";

type SupabaseContext = {
  supabase: SupabaseClient | null;
  isLoaded: boolean;
};
const Context = createContext<SupabaseContext>({
  supabase: null,
  isLoaded: false,
});

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = useSession();
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);
  const clerkSupabaseTemplate =
    process.env.NEXT_PUBLIC_CLERK_SUPABASE_TEMPLATE || "supabase";

  useEffect(() => {
    if (!session) {
      setIsLoaded(true);
      return;
    }

    if (!hasSupabaseConfig) {
      console.error(
        "Missing Supabase env vars. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local."
      );
      setIsLoaded(true);
      return;
    }

    const client = createClient(
      supabaseUrl!,
      supabaseAnonKey!,
      {
        // Supabase expects a JWT signed for its configured external provider.
        // For Clerk, use a dedicated JWT template (commonly named "supabase").
        accessToken: async () =>
          (await session?.getToken({ template: clerkSupabaseTemplate })) ?? "",
      }
    );

    setSupabase(client);
    setIsLoaded(true);
  }, [
    clerkSupabaseTemplate,
    hasSupabaseConfig,
    session,
    supabaseAnonKey,
    supabaseUrl,
  ]);

  return (
    <Context.Provider value={{ supabase, isLoaded }}>
      {/* {!isLoaded ? <div> Loading...</div> : children} */}
      {children}
    </Context.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useSupabase needs to be inside the provider");
  }

  return context;
};
