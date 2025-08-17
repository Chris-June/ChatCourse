import React from 'react';
import { BookOpen, ListChecks, Compass, Map, Layers, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const OverviewModule5: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="bg-card p-6 rounded-xl border border-border">
        <h1 className="text-3xl font-bold text-card-foreground flex items-center"><BookOpen className="w-7 h-7 mr-3 text-primary"/>Module 5 Overview: Advanced Interactions</h1>
        <p className="text-muted-foreground mt-3">
          Go deeper into multi‑turn interactions, personalization, and performance. Design conversations that feel tailored, fast, and reliable.
        </p>
      </section>

      {/* What You'll Learn */}
      <section className="bg-muted/30 p-6 rounded-xl border border-muted">
        <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center"><ListChecks className="w-6 h-6 mr-3 text-emerald-500"/>What you’ll learn</h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>Personalization strategies and user profiles</li>
          <li>Response shaping for tone, brevity, and structure</li>
          <li>Latency + cost trade‑offs and caching ideas</li>
          <li>Quality loops: critique, improve, and verify</li>
        </ul>
      </section>

      {/* Lesson-by-Lesson Snapshot */}
      <section className="bg-card p-6 rounded-xl border border-border">
        <h2 className="text-2xl font-semibold text-card-foreground mb-4 flex items-center"><Map className="w-6 h-6 mr-3 text-sky-500"/>Lesson-by-lesson snapshot</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-lg border bg-muted">
            <h3 className="font-semibold text-foreground">5.1 — Personalization & Profiles</h3>
            <p className="text-muted-foreground mt-1">Collecting preferences safely and tailoring responses.</p>
            <Link to="/instructions/module-5/5.1" className="inline-flex items-center text-primary mt-2">Start lesson<ArrowRight className="w-4 h-4 ml-1"/></Link>
          </div>
          <div className="p-4 rounded-lg border bg-muted">
            <h3 className="font-semibold text-foreground">5.2 — Performance & Cost</h3>
            <p className="text-muted-foreground mt-1">Latency, token usage, batching, and caching patterns.</p>
            <Link to="/instructions/module-5/5.2" className="inline-flex items-center text-primary mt-2">Start lesson<ArrowRight className="w-4 h-4 ml-1"/></Link>
          </div>
          <div className="p-4 rounded-lg border bg-muted">
            <h3 className="font-semibold text-foreground">5.3 — Quality Loops</h3>
            <p className="text-muted-foreground mt-1">Critique‑improve cycles and guardrails for better output.</p>
            <Link to="/instructions/module-5/5.3" className="inline-flex items-center text-primary mt-2">Start lesson<ArrowRight className="w-4 h-4 ml-1"/></Link>
          </div>
        </div>
      </section>

      {/* Skills You Will Build */}
      <section className="bg-muted/30 p-6 rounded-xl border border-muted">
        <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center"><Layers className="w-6 h-6 mr-3 text-violet-500"/>Skills you’ll build</h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>Model‑agnostic personalization flows</li>
          <li>Cost‑aware prompt and session design</li>
          <li>Prompt‑based evaluation and improvement</li>
        </ul>
      </section>

      {/* How to Use This Module */}
      <section className="bg-card p-6 rounded-xl border border-border">
        <h2 className="text-2xl font-semibold text-card-foreground mb-3 flex items-center"><Compass className="w-6 h-6 mr-3 text-amber-500"/>How to use this module</h2>
        <ol className="list-decimal list-inside text-muted-foreground space-y-2">
          <li>Define safe personalization in 5.1.</li>
          <li>Optimize latency and cost in 5.2.</li>
          <li>Establish quality loops in 5.3.</li>
        </ol>
      </section>

      {/* Assessment & Completion */}
      <section className="bg-muted/30 p-6 rounded-xl border border-muted">
        <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center"><Award className="w-6 h-6 mr-3 text-teal-500"/>Assessment & completion</h2>
        <p className="text-muted-foreground text-sm">
          Create a personalized chat flow with measurable latency and cost targets and a prompt‑based evaluation loop.
        </p>
      </section>
    </div>
  );
};

export default OverviewModule5;
