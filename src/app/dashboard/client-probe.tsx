"use client";

import { useEffect, useState } from "react";

import { useAuth, useUser } from "@clerk/nextjs";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ClientProbeState = {
  hasClerk: boolean;
  loaded: boolean | null;
  userId: string | null;
  sessionId: string | null;
  clientSessionsCount: number | null;
  clientUatCookie: string | null;
};

function readClientUatCookie() {
  return (
    document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("__client_uat="))
      ?.split("=")[1] ?? null
  );
}

export function ClientProbe() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { sessionId } = useAuth();
  const [state, setState] = useState<ClientProbeState>({
    hasClerk: false,
    loaded: null,
    userId: null,
    sessionId: null,
    clientSessionsCount: null,
    clientUatCookie: null,
  });

  useEffect(() => {
    const refresh = () => {
      setState({
        hasClerk: Boolean(window.Clerk),
        loaded: window.Clerk?.loaded ?? null,
        userId: window.Clerk?.user?.id ?? null,
        sessionId: window.Clerk?.session?.id ?? null,
        clientSessionsCount: window.Clerk?.client?.sessions?.length ?? null,
        clientUatCookie: readClientUatCookie(),
      });
    };

    refresh();
    const timeout = window.setTimeout(refresh, 3000);

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Probe</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 font-mono text-sm">
        <p>
          useUser:{" "}
          {isLoaded ? (isSignedIn ? "signed-in" : "signed-out") : "loading"}
        </p>
        <p>useUser id: {user?.id ?? "null"}</p>
        <p>useAuth session: {sessionId ?? "null"}</p>
        <p>window.Clerk.user: {state.userId ?? "null"}</p>
        <p>
          window.Clerk.client.sessions:{" "}
          {state.clientSessionsCount === null
            ? "null"
            : state.clientSessionsCount}
        </p>
        <p>__client_uat: {state.clientUatCookie ?? "missing"}</p>
        <pre className="overflow-auto rounded-md bg-muted p-3 text-xs">
          {JSON.stringify(state, null, 2)}
        </pre>
      </CardContent>
    </Card>
  );
}
