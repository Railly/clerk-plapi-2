import { auth, currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground">
              <span className="font-mono text-xs font-bold text-background">
                P
              </span>
            </div>
            <span className="font-semibold tracking-tight">PLAPI Demo</span>
          </div>
          <UserButton />
        </div>
      </nav>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Welcome back! You're authenticated via Agent Tasks.
          </p>
        </div>

        <div className="grid gap-6">
          {/* User Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                User Information
                <Badge variant="secondary" className="font-mono text-xs">
                  Server-Side Auth ✓
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    User ID:
                  </span>
                  <code className="rounded bg-muted px-2 py-0.5 text-sm font-mono">
                    {userId}
                  </code>
                </div>
                {user?.primaryEmailAddress && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Email:
                    </span>
                    <code className="rounded bg-muted px-2 py-0.5 text-sm">
                      {user.primaryEmailAddress.emailAddress}
                    </code>
                  </div>
                )}
                {user?.firstName && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Name:
                    </span>
                    <span className="text-sm">
                      {user.firstName} {user.lastName}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Agent Tasks Info */}
          <Card>
            <CardHeader>
              <CardTitle>Agent Tasks Authentication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                This page proves server-side authentication works correctly with
                Clerk's Agent Tasks API and proxied Frontend API.
              </p>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <p className="font-mono text-sm text-muted-foreground">
                  Server successfully authenticated via:
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Agent Task handshake completed</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Session cookies set via proxy</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>auth() and currentUser() work correctly</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
