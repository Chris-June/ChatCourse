import React from 'react';
import { BookOpen, ListChecks, Compass, Map, Layers, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const OverviewModule6: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="bg-card p-6 rounded-xl border border-border">
        <h1 className="text-3xl font-bold text-card-foreground flex items-center"><BookOpen className="w-7 h-7 mr-3 text-primary"/>Module 6 Overview: Development with AI</h1>
        <p className="text-muted-foreground mt-3">
          Apply AI across product development—from discovery to delivery—with practical prompts, workflows, and collaboration patterns.
        </p>
      </section>

      {/* What You'll Learn */}
      <section className="bg-muted/30 p-6 rounded-xl border border-muted">
        <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center"><ListChecks className="w-6 h-6 mr-3 text-emerald-500"/>What you’ll learn</h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>Idea generation, synthesis, and prioritization with AI</li>
          <li>Spec writing, acceptance criteria, and test ideas</li>
          <li>Design collaboration and content workflows</li>
          <li>Shipping iteratively with feedback loops</li>
        </ul>
      </section>

      {/* Lesson-by-Lesson Snapshot */}
      <section className="bg-card p-6 rounded-xl border border-border">
        <h2 className="text-2xl font-semibold text-card-foreground mb-4 flex items-center"><Map className="w-6 h-6 mr-3 text-sky-500"/>Lesson-by-lesson snapshot</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-lg border bg-muted">
            <h3 className="font-semibold text-foreground">6.1 — AI for Discovery & Planning</h3>
            <p className="text-muted-foreground mt-1">Market scans, problem framing, and prioritization prompts.</p>
            <Link to="/instructions/module-6/6.1" className="inline-flex items-center text-primary mt-2">Start lesson<ArrowRight className="w-4 h-4 ml-1"/></Link>
          </div>
          <div className="p-4 rounded-lg border bg-muted">
            <h3 className="font-semibold text-foreground">6.2 — Specs, Criteria, and Tests</h3>
            <p className="text-muted-foreground mt-1">Writing PRDs, refining acceptance criteria, generating tests.</p>
            <Link to="/instructions/module-6/6.2" className="inline-flex items-center text-primary mt-2">Start lesson<ArrowRight className="w-4 h-4 ml-1"/></Link>
          </div>
          <div className="p-4 rounded-lg border bg-muted">
            <h3 className="font-semibold text-foreground">6.3 — Iterative Delivery with AI</h3>
            <p className="text-muted-foreground mt-1">Content and design collaboration; feedback‑driven shipping.</p>
            <Link to="/instructions/module-6/6.3" className="inline-flex items-center text-primary mt-2">Start lesson<ArrowRight className="w-4 h-4 ml-1"/></Link>
          </div>
        </div>
      </section>

      {/* Skills You Will Build */}
      <section className="bg-muted/30 p-6 rounded-xl border border-muted">
        <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center"><Layers className="w-6 h-6 mr-3 text-violet-500"/>Skills you’ll build</h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>Facilitating discovery with structured prompts</li>
          <li>Translating goals into specs and tests</li>
          <li>Running effective AI‑assisted review cycles</li>
        </ul>
      </section>

      {/* How to Use This Module */}
      <section className="bg-card p-6 rounded-xl border border-border">
        <h2 className="text-2xl font-semibold text-card-foreground mb-3 flex items-center"><Compass className="w-6 h-6 mr-3 text-amber-500"/>How to use this module</h2>
        <ol className="list-decimal list-inside text-muted-foreground space-y-2">
          <li>Use 6.1 to generate and refine problems and plans.</li>
          <li>Write specs and tests with 6.2.</li>
          <li>Collaborate and ship iteratively via 6.3.</li>
        </ol>
      </section>

      {/* Assessment & Completion */}
      <section className="bg-muted/30 p-6 rounded-xl border border-muted">
        <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center"><Award className="w-6 h-6 mr-3 text-teal-500"/>Assessment & completion</h2>
        <p className="text-muted-foreground text-sm">
          Produce a concise PRD with acceptance criteria and a test plan, plus a demo plan showing iterative feedback.
        </p>
      </section>
    </div>
  );
};

export default OverviewModule6;
