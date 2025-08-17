import React from 'react';
import { BookOpen, ListChecks, Compass, Map, Layers, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const OverviewModule2: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="bg-card p-6 rounded-xl border border-border">
        <h1 className="text-3xl font-bold text-card-foreground flex items-center"><BookOpen className="w-7 h-7 mr-3 text-primary"/>Module 2 Overview: Context Management</h1>
        <p className="text-muted-foreground mt-3">
          Keep AI conversations grounded and coherent. Learn how to provide, retain, and evolve the right context over multiple turns so models stay on track and relevant to user goals.
        </p>
      </section>

      {/* What You'll Learn */}
      <section className="bg-muted/30 p-6 rounded-xl border border-muted">
        <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center"><ListChecks className="w-6 h-6 mr-3 text-emerald-500"/>What you’ll learn</h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>Structuring inputs to highlight intent, constraints, and key facts</li>
          <li>Managing conversation memory and avoiding context drift</li>
          <li>Extracting and summarizing state across turns</li>
          <li>Balancing brevity with completeness under token limits</li>
          <li>Tactics for correcting and steering when the model veers off</li>
        </ul>
      </section>

      {/* Lesson-by-Lesson Snapshot */}
      <section className="bg-card p-6 rounded-xl border border-border">
        <h2 className="text-2xl font-semibold text-card-foreground mb-4 flex items-center"><Map className="w-6 h-6 mr-3 text-sky-500"/>Lesson-by-lesson snapshot</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-lg border bg-muted">
            <h3 className="font-semibold text-foreground">2.1 — The Power of Context in AI</h3>
            <p className="text-muted-foreground mt-1">Why context matters, what to include, and how it shapes outputs.</p>
            <Link to="/instructions/module-2/2.1" className="inline-flex items-center text-primary mt-2">Start lesson<ArrowRight className="w-4 h-4 ml-1"/></Link>
          </div>
          <div className="p-4 rounded-lg border bg-muted">
            <h3 className="font-semibold text-foreground">2.2 — Maintaining Coherent Conversations</h3>
            <p className="text-muted-foreground mt-1">Carrying forward relevant details and preventing drift over time.</p>
            <Link to="/instructions/module-2/2.2" className="inline-flex items-center text-primary mt-2">Start lesson<ArrowRight className="w-4 h-4 ml-1"/></Link>
          </div>
          <div className="p-4 rounded-lg border bg-muted">
            <h3 className="font-semibold text-foreground">2.3 — Practical Context Exercises</h3>
            <p className="text-muted-foreground mt-1">Hands‑on drills for summarizing, state extraction, and steering.</p>
            <Link to="/instructions/module-2/2.3" className="inline-flex items-center text-primary mt-2">Start lesson<ArrowRight className="w-4 h-4 ml-1"/></Link>
          </div>
        </div>
      </section>

      {/* Skills You Will Build */}
      <section className="bg-muted/30 p-6 rounded-xl border border-muted">
        <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center"><Layers className="w-6 h-6 mr-3 text-violet-500"/>Skills you’ll build</h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>Design effective context blocks and running summaries</li>
          <li>Track and update conversation state</li>
          <li>Recover from derailments with corrective prompts</li>
          <li>Operate within token budgets without losing fidelity</li>
        </ul>
      </section>

      {/* How to Use This Module */}
      <section className="bg-card p-6 rounded-xl border border-border">
        <h2 className="text-2xl font-semibold text-card-foreground mb-3 flex items-center"><Compass className="w-6 h-6 mr-3 text-amber-500"/>How to use this module</h2>
        <ol className="list-decimal list-inside text-muted-foreground space-y-2">
          <li>Study why context matters in 2.1 and identify the essentials to include.</li>
          <li>Practice maintaining coherence across turns in 2.2.</li>
          <li>Apply both in practical drills in 2.3 and save reusable patterns.</li>
        </ol>
      </section>

      {/* Assessment & Completion */}
      <section className="bg-muted/30 p-6 rounded-xl border border-muted">
        <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center"><Award className="w-6 h-6 mr-3 text-teal-500"/>Assessment & completion</h2>
        <p className="text-muted-foreground text-sm">
          Short checks after each lesson plus a final exercise to build a running summary and state tracker for a multi‑turn scenario.
        </p>
      </section>
    </div>
  );
};

export default OverviewModule2;
