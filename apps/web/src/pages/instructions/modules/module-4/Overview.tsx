import React from 'react';
import { BookOpen, ListChecks, Compass, Map, Layers, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const OverviewModule4: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="bg-card p-6 rounded-xl border border-border">
        <h1 className="text-3xl font-bold text-card-foreground flex items-center"><BookOpen className="w-7 h-7 mr-3 text-primary"/>Module 4 Overview: AI Capabilities & Tools</h1>
        <p className="text-muted-foreground mt-3">
          Explore function calling, MCP servers, custom tools, and agent patterns. Learn when and how to extend LLMs beyond chat to reliable, integrated systems.
        </p>
      </section>

      {/* What You'll Learn */}
      <section className="bg-muted/30 p-6 rounded-xl border border-muted">
        <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center"><ListChecks className="w-6 h-6 mr-3 text-emerald-500"/>What you’ll learn</h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>Designing and validating function calls</li>
          <li>Using MCP to securely expose external resources</li>
          <li>Tool orchestration patterns and error handling</li>
          <li>When to use agents vs scripted workflows</li>
          <li>Security, rate limits, and observability basics</li>
        </ul>
      </section>

      {/* Lesson-by-Lesson Snapshot */}
      <section className="bg-card p-6 rounded-xl border border-border">
        <h2 className="text-2xl font-semibold text-card-foreground mb-4 flex items-center"><Map className="w-6 h-6 mr-3 text-sky-500"/>Lesson-by-lesson snapshot</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-lg border bg-muted">
            <h3 className="font-semibold text-foreground">4.1 — Function Calling Basics</h3>
            <p className="text-muted-foreground mt-1">Model‑invoked functions with schemas, validation, and guardrails.</p>
            <Link to="/instructions/module-4/4.1" className="inline-flex items-center text-primary mt-2">Start lesson<ArrowRight className="w-4 h-4 ml-1"/></Link>
          </div>
          <div className="p-4 rounded-lg border bg-muted">
            <h3 className="font-semibold text-foreground">4.2 — Building Tools with MCP</h3>
            <p className="text-muted-foreground mt-1">Exposing files, APIs, and processes via Model Context Protocol.</p>
            <Link to="/instructions/module-4/4.2" className="inline-flex items-center text-primary mt-2">Start lesson<ArrowRight className="w-4 h-4 ml-1"/></Link>
          </div>
          <div className="p-4 rounded-lg border bg-muted">
            <h3 className="font-semibold text-foreground">4.3 — Tool Orchestration Patterns</h3>
            <p className="text-muted-foreground mt-1">Chaining tools, retries, and structured responses.</p>
            <Link to="/instructions/module-4/4.3" className="inline-flex items-center text-primary mt-2">Start lesson<ArrowRight className="w-4 h-4 ml-1"/></Link>
          </div>
          <div className="p-4 rounded-lg border bg-muted">
            <h3 className="font-semibold text-foreground">4.4 — Agent vs Workflow</h3>
            <p className="text-muted-foreground mt-1">Choosing between autonomous agents and scripted flows.</p>
            <Link to="/instructions/module-4/4.4" className="inline-flex items-center text-primary mt-2">Start lesson<ArrowRight className="w-4 h-4 ml-1"/></Link>
          </div>
          <div className="p-4 rounded-lg border bg-muted">
            <h3 className="font-semibold text-foreground">4.5 — Secure Integrations</h3>
            <p className="text-muted-foreground mt-1">API keys, scopes, and safe defaults for production use.</p>
            <Link to="/instructions/module-4/4.5" className="inline-flex items-center text-primary mt-2">Start lesson<ArrowRight className="w-4 h-4 ml-1"/></Link>
          </div>
          <div className="p-4 rounded-lg border bg-muted">
            <h3 className="font-semibold text-foreground">4.6 — Observability & Testing</h3>
            <p className="text-muted-foreground mt-1">Logging, tracing, evals, and test harnesses for tools.</p>
            <Link to="/instructions/module-4/4.6" className="inline-flex items-center text-primary mt-2">Start lesson<ArrowRight className="w-4 h-4 ml-1"/></Link>
          </div>
        </div>
      </section>

      {/* Skills You Will Build */}
      <section className="bg-muted/30 p-6 rounded-xl border border-muted">
        <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center"><Layers className="w-6 h-6 mr-3 text-violet-500"/>Skills you’ll build</h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>Define robust function schemas and validation layers</li>
          <li>Expose systems via MCP with least privilege</li>
          <li>Design resilient orchestration with retries and fallbacks</li>
          <li>Instrument tools for debugging and measurement</li>
        </ul>
      </section>

      {/* How to Use This Module */}
      <section className="bg-card p-6 rounded-xl border border-border">
        <h2 className="text-2xl font-semibold text-card-foreground mb-3 flex items-center"><Compass className="w-6 h-6 mr-3 text-amber-500"/>How to use this module</h2>
        <ol className="list-decimal list-inside text-muted-foreground space-y-2">
          <li>Start with 4.1–4.2 to learn function calling and MCP.</li>
          <li>Practice orchestration patterns in 4.3 and trade‑offs in 4.4.</li>
          <li>Harden with security in 4.5 and observability in 4.6.</li>
        </ol>
      </section>

      {/* Assessment & Completion */}
      <section className="bg-muted/30 p-6 rounded-xl border border-muted">
        <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center"><Award className="w-6 h-6 mr-3 text-teal-500"/>Assessment & completion</h2>
        <p className="text-muted-foreground text-sm">
          Build a small toolchain (function call + MCP) with tests and logging. Validate inputs and handle errors gracefully.
        </p>
      </section>
    </div>
  );
};

export default OverviewModule4;
