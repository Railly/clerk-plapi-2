import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import {
  ArrowRight,
  Code2,
  KeyRound,
  Layers,
  Shield,
  Terminal,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function CodeBlock() {
  return (
    <div className="overflow-hidden rounded-lg border border-border/50 bg-card">
      <div className="flex items-center gap-2 border-b border-border/50 px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          provision.sh
        </span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed">
        <code>
          <span className="text-muted-foreground">
            {"# Create app with dev + prod instances\n"}
          </span>
          <span className="text-emerald-400">{"$ "}</span>
          <span className="text-foreground">{"clerk apps create"}</span>
          {" \\\n"}
          {"    "}
          <span className="text-sky-400">{"--name"}</span>
          {' "my-saas-app"'}
          {" \\\n"}
          {"    "}
          <span className="text-sky-400">{"--environment-types"}</span>
          {" development,production \\\n"}
          {"    "}
          <span className="text-sky-400">{"--template"}</span>
          {" b2c-saas \\\n"}
          {"    "}
          <span className="text-sky-400">{"-o"}</span>
          {" json\n\n"}
          <span className="text-muted-foreground">
            {"# Response (30 seconds)\n"}
          </span>
          <span className="text-amber-400">{"{"}</span>
          {"\n"}
          {"  "}
          <span className="text-sky-400">{'"application_id"'}</span>
          {": "}
          <span className="text-emerald-400">{'"app_2x9..."'}</span>
          {",\n"}
          {"  "}
          <span className="text-sky-400">{'"instances"'}</span>
          {": [\n"}
          {"    "}
          <span className="text-amber-400">{"{"}</span>{" "}
          <span className="text-sky-400">{'"environment_type"'}</span>
          {": "}
          <span className="text-emerald-400">{'"development"'}</span>{" "}
          <span className="text-amber-400">{"}"}</span>
          {",\n"}
          {"    "}
          <span className="text-amber-400">{"{"}</span>{" "}
          <span className="text-sky-400">{'"environment_type"'}</span>
          {": "}
          <span className="text-emerald-400">{'"production"'}</span>
          {"  "}
          <span className="text-amber-400">{"}"}</span>
          {"\n"}
          {"  ]\n"}
          <span className="text-amber-400">{"}"}</span>
        </code>
      </pre>
    </div>
  );
}

const features = [
  {
    icon: Terminal,
    title: "CLI-First Provisioning",
    description:
      "Create Clerk applications with a single command. Dev + prod instances, templates, and keys in 30 seconds.",
  },
  {
    icon: Layers,
    title: "Multi-Environment",
    description:
      "Separate development and production instances from day one. Each with its own keys and configuration.",
  },
  {
    icon: Shield,
    title: "B2B/B2C Templates",
    description:
      "Start with pre-configured templates for B2B SaaS (orgs), B2C, or waitlist patterns. Zero manual setup.",
  },
  {
    icon: Zap,
    title: "Agentic Provisioning",
    description:
      "AI coding tools can autonomously provision auth. Cursor, v0, and Windsurf integrate via APP protocol.",
  },
  {
    icon: KeyRound,
    title: "Secret Management",
    description:
      "Keys are returned inline. Pipe them to Vercel, .env files, or your CI/CD pipeline automatically.",
  },
  {
    icon: Code2,
    title: "JSON Output",
    description:
      "Machine-readable output for every command. Build scripts, agents, and automation on top of PLAPI.",
  },
];

export default function Home() {
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
          <div className="flex items-center gap-3">
            <Show when="signed-out">
              <SignInButton>
                <Button variant="ghost" size="sm">
                  Sign in
                </Button>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-16">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-12">
          <div className="flex flex-1 flex-col gap-6">
            <Badge variant="secondary" className="w-fit font-mono text-xs">
              clerk platform api v1
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Provision auth
              <br />
              <span className="text-muted-foreground">from the terminal.</span>
            </h1>
            <p className="max-w-md text-lg text-muted-foreground">
              One command to create a Clerk app with development and production
              instances, keys, and templates. Built for developers who ship
              fast.
            </p>
            <div className="flex items-center gap-3">
              <Show when="signed-out">
                <SignInButton>
                  <Button size="lg" className="gap-2">
                    Get started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </SignInButton>
              </Show>
              <Show when="signed-in">
                <Button size="lg" className="gap-2" asChild>
                  <a href="/dashboard">
                    Go to Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </Show>
              <Button variant="outline" size="lg" asChild>
                <a
                  href="https://github.com/crafter-station/clerk-plapi-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View source
                </a>
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <CodeBlock />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-10">
          <h2 className="text-2xl font-bold tracking-tight">
            What PLAPI enables
          </h2>
          <p className="mt-2 text-muted-foreground">
            Programmatic access to everything in the Clerk dashboard.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="border-border/50 bg-card/50 transition-colors hover:bg-card"
            >
              <CardHeader className="pb-3">
                <feature.icon className="mb-2 h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-base">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="mb-10 text-2xl font-bold tracking-tight">
          How it works
        </h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            {
              step: "01",
              title: "Authenticate",
              description:
                "Run clerk login or set your platform API key. One-time setup.",
            },
            {
              step: "02",
              title: "Provision",
              description:
                "Create apps, instances, and configure domains with a single CLI command.",
            },
            {
              step: "03",
              title: "Ship",
              description:
                "Keys are returned inline. Pipe to Vercel env, .env files, or your deploy script.",
            },
          ].map((item) => (
            <div key={item.step} className="flex flex-col gap-3">
              <span className="font-mono text-sm text-muted-foreground">
                {item.step}
              </span>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <p className="text-sm text-muted-foreground">
            Built by{" "}
            <a
              href="https://github.com/crafter-station"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-foreground"
            >
              Crafter Station
            </a>
          </p>
          <p className="text-sm text-muted-foreground">
            Powered by{" "}
            <a
              href="https://clerk.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-foreground"
            >
              Clerk
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
