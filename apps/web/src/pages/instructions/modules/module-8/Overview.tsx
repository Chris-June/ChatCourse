import React from 'react';
import { BookOpen, ListChecks, Compass, Map, Layers, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const OverviewModule8: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="bg-card p-6 rounded-xl border border-border">
        <h1 className="text-3xl font-bold text-card-foreground flex items-center"><BookOpen className="w-7 h-7 mr-3 text-primary"/>Module 8 Overview: Responsible AI</h1>
        <p className="text-muted-foreground mt-3">
          Build a responsible AI foundation: bias/fairness, transparency, privacy, and security. Apply practical safeguards in design and delivery.
        </p>
      </section>

      {/* What You'll Learn */}
      <section className="bg-muted/30 p-6 rounded-xl border border-muted">
        <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center"><ListChecks className="w-6 h-6 mr-3 text-emerald-500"/>What you’ll learn</h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>Bias and fairness basics with mitigation strategies</li>
          <li>Transparency and explainability considerations</li>
          <li>Privacy, data handling, and user consent</li>
          <li>Security threats and hardening tactics</li>
        </ul>
      </section>

      {/* Lesson-by-Lesson Snapshot */}
      <section className="bg-card p-6 rounded-xl border border-border">
        <h2 className="text-2xl font-semibold text-card-foreground mb-4 flex items-center"><Map className="w-6 h-6 mr-3 text-sky-500"/>Lesson-by-lesson snapshot</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-lg border bg-muted">
            <h3 className="font-semibold text-foreground">8.1 — Bias & Fairness</h3>
            <p className="text-muted-foreground mt-1">Sources of bias, detection, and practical mitigation in prompts and data.</p>
            <Link to="/instructions/module-8/8.1" className="inline-flex items-center text-primary mt-2">Start lesson<ArrowRight className="w-4 h-4 ml-1"/></Link>
          </div>
          <div className="p-4 rounded-lg border bg-muted">
            <h3 className="font-semibold text-foreground">8.2 — Transparency & Privacy</h3>
            <p className="text-muted-foreground mt-1">Model disclosures, explainability notes, data handling, and consent.</p>
            <Link to="/instructions/module-8/8.2" className="inline-flex items-center text-primary mt-2">Start lesson<ArrowRight className="w-4 h-4 ml-1"/></Link>
          </div>
          <div className="p-4 rounded-lg border bg-muted">
            <h3 className="font-semibold text-foreground">8.3 — Security & Hardening</h3>
            <p className="text-muted-foreground mt-1">Prompt injection, data exfiltration, rate limits, and monitoring.</p>
            <Link to="/instructions/module-8/8.3" className="inline-flex items-center text-primary mt-2">Start lesson<ArrowRight className="w-4 h-4 ml-1"/></Link>
          </div>
        </div>
      </section>

      {/* Skills You Will Build */}
      <section className="bg-muted/30 p-6 rounded-xl border border-muted">
        <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center"><Layers className="w-6 h-6 mr-3 text-violet-500"/>Skills you’ll build</h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>Identifying and mitigating bias/fairness risks</li>
          <li>Documenting transparency and explainability</li>
          <li>Implementing privacy‑aware data flows</li>
          <li>Hardening systems against common threats</li>
        </ul>
      </section>

      {/* How to Use This Module */}
      <section className="bg-card p-6 rounded-xl border border-border">
        <h2 className="text-2xl font-semibold text-card-foreground mb-3 flex items-center"><Compass className="w-6 h-6 mr-3 text-amber-500"/>How to use this module</h2>
        <ol className="list-decimal list-inside text-muted-foreground space-y-2">
          <li>Learn bias/fairness concepts in 8.1 and list mitigations.</li>
          <li>Capture transparency and privacy practices in 8.2.</li>
          <li>Apply security hardening in 8.3 and plan monitoring.</li>
        </ol>
      </section>

      {/* Assessment & Completion */}
      <section className="bg-muted/30 p-6 rounded-xl border border-muted">
        <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center"><Award className="w-6 h-6 mr-3 text-teal-500"/>Assessment & completion</h2>
        <p className="text-muted-foreground text-sm">
          Produce a Responsible AI checklist for your project covering fairness, transparency, privacy, and security with concrete actions.
        </p>
      </section>
    </div>
  );
};

export default OverviewModule8;
