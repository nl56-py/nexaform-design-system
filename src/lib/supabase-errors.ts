type SupabaseLikeError = {
  message?: string;
  details?: string;
  hint?: string;
  code?: string;
  name?: string;
};

const getErrorText = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  if (error && typeof error === "object" && "message" in error) {
    const maybeError = error as SupabaseLikeError;
    return typeof maybeError.message === "string" ? maybeError.message : "";
  }

  return "";
};

const extractSchemaObject = (message: string) => {
  const patterns = [
    { kind: "function", regex: /function\s+public\.([a-z0-9_]+)/i },
    { kind: "function", regex: /public\.([a-z0-9_]+)\s+without parameters/i },
    { kind: "table", regex: /table\s+['"]?public\.([a-z0-9_]+)['"]?/i },
    { kind: "table", regex: /relation\s+["']?public\.([a-z0-9_]+)["']?\s+does not exist/i },
  ];

  for (const pattern of patterns) {
    const match = message.match(pattern.regex);
    if (match) {
      return { kind: pattern.kind, name: match[1] };
    }
  }

  return null;
};

export const getSupabaseErrorMessage = (error: unknown, fallback: string) => {
  const rawMessage = getErrorText(error);
  const message = rawMessage.trim();

  if (!message) {
    return fallback;
  }

  if (message.includes("schema cache") || message.includes("does not exist")) {
    const schemaObject = extractSchemaObject(message);

    if (schemaObject?.kind === "function") {
      return `Supabase is missing the database function \`public.${schemaObject.name}\`. Apply the latest database migrations to the connected project.`;
    }

    if (schemaObject?.kind === "table") {
      return `Supabase is missing the table \`public.${schemaObject.name}\`. Apply the latest database migrations to the connected project.`;
    }

    return "Supabase is missing a database object required by this feature. Apply the latest database migrations to the connected project.";
  }

  if (message.toLowerCase().includes("permission denied") || message.includes("new row violates row-level security policy")) {
    return "Supabase denied this request. Check that the required RLS policies are applied, and for admin routes, that the signed-in user has admin access.";
  }

  if (message.includes("Failed to send a request to the Edge Function")) {
    return "The Supabase Edge Function is unreachable. Check that it is deployed and that the app is connected to the correct Supabase project.";
  }

  if (message.includes("Edge Function returned a non-2xx status code")) {
    return "The Supabase Edge Function responded with an error. Check that it is deployed and that its environment variables are configured.";
  }

  return message || fallback;
};

export const toSupabaseError = (error: unknown, fallback: string) =>
  new Error(getSupabaseErrorMessage(error, fallback));
