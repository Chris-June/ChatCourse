import React from 'react';
import { BookOpen, ListChecks, Compass, Map, Layers, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const OverviewModule3: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="bg-card p-6 rounded-xl border border-border">
        <h1 className="text-3xl font-bold text-card-foreground flex items-center"><BookOpen className="w-7 h-7 mr-3 text-primary"/>Module 3 Overview: Prompting Techniques</h1>
        <p className="text-muted-foreground mt-3">
          Master core prompting techniques—zero‑shot, few‑shot, chain‑of‑thought—and apply reusable patterns to improve reliability, structure, and controllability.
        </p>
      </section>

      {/* What You'll Learn */}
      <section className="bg-muted/30 p-6 rounded-xl border border-muted">
        <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center"><ListChecks className="w-6 h-6 mr-3 text-emerald-500"/>What you’ll learn</h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>Zero‑shot vs few‑shot prompting and when to use each</li>
          <li>Chain‑of‑thought and reasoning prompts for complex tasks</li>
          <li>Reusable prompt patterns for common objectives</li>
          <li>Structuring outputs for evaluation and iteration</li>
        </ul>
      </section>

      {/* Lesson-by-Lesson Snapshot */}
      <section className="bg-card p-6 rounded-xl border border-border">
        <h2 className="text-2xl font-semibold text-card-foreground mb-4 flex items-center"><Map className="w-6 h-6 mr-3 text-sky-500"/>Lesson-by-lesson snapshot</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-lg border bg-muted">
            <h3 className="font-semibold text-foreground">3.1 — Prompting Fundamentals Revisited</h3>
            <p className="text-muted-foreground mt-1">Zero‑shot, few‑shot, and strategies for examples that guide outcomes.</p>
            <Link to="/instructions/module-3/3.1" className="inline-flex items-center text-primary mt-2">Start lesson<ArrowRight className="w-4 h-4 ml-1"/></Link>
          </div>
          <div className="p-4 rounded-lg border bg-muted">
            <h3 className="font-semibold text-foreground">3.2 — Reasoning with Chain‑of‑Thought</h3>
            <p className="text-muted-foreground mt-1">Eliciting step‑by‑step thinking, constraints, and verification prompts.</p>
            <Link to="/instructions/module-3/3.2" className="inline-flex items-center text-primary mt-2">Start lesson<ArrowRight className="w-4 h-4 ml-1"/></Link>
          </div>
          <div className="p-4 rounded-lg border bg-muted">
            <h3 className="font-semibold text-foreground">3.3 — Prompt Patterns in Practice</h3>
            <p className="text-muted-foreground mt-1">Templates for classification, extraction, transformation, planning, and more.</p>
            <Link to="/instructions/module-3/3.3" className="inline-flex items-center text-primary mt-2">Start lesson<ArrowRight className="w-4 h-4 ml-1"/></Link>
          </div>
        </div>
      </section>

      {/* Skills You Will Build */}
      <section className="bg-muted/30 p-6 rounded-xl border border-muted">
        <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center"><Layers className="w-6 h-6 mr-3 text-violet-500"/>Skills you’ll build</h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>Design effective examples for few‑shot prompting</li>
          <li>Compose reasoning prompts with quality checks</li>
          <li>Apply patterns for common tasks consistently</li>
          <li>Evaluate and iterate prompts systematically</li>
        </ul>
      </section>

      {/* How to Use This Module */}
      <section className="bg-card p-6 rounded-xl border border-border">
        <h2 className="text-2xl font-semibold text-card-foreground mb-3 flex items-center"><Compass className="w-6 h-6 mr-3 text-amber-500"/>How to use this module</h2>
        <ol className="list-decimal list-inside text-muted-foreground space-y-2">
          <li>Refresh the fundamentals and practice examples in 3.1.</li>
          <li>Learn to elicit reasoning and verification in 3.2.</li>
          <li>Adopt reusable prompt patterns across tasks in 3.3.</li>
        </ol>
      </section>

      {/* Assessment & Completion */}
      <section className="bg-muted/30 p-6 rounded-xl border border-muted">
        <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center"><Award className="w-6 h-6 mr-3 text-teal-500"/>Assessment & completion</h2>
        <p className="text-muted-foreground text-sm">
          Short knowledge checks and a capstone exercise comparing patterns across tasks with measurable criteria.
        </p>
      </section>
    </div>
  );
};

export default OverviewModule3;
