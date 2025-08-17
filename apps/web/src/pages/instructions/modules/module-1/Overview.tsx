import React from 'react';
import { BookOpen, ListChecks, Compass, Map, Layers, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const OverviewModule1: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="bg-card p-6 rounded-xl border border-border">
        <h1 className="text-3xl font-bold text-card-foreground flex items-center"><BookOpen className="w-7 h-7 mr-3 text-primary"/>Module 1 Overview: Foundations of AI & Prompting</h1>
        <p className="text-muted-foreground mt-3">
          Build a practical foundation for working with Large Language Models (LLMs). In this module, you’ll learn what an LLM actually does, how tokens work, why prompts matter, and how to use the I.N.S.Y.N.C. framework to consistently get better outcomes. You’ll finish with hands-on practice and a final challenge.
        </p>
      </section>

      {/* What You'll Learn */}
      <section className="bg-muted/30 p-6 rounded-xl border border-muted">
        <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center"><ListChecks className="w-6 h-6 mr-3 text-emerald-500"/>What you’ll learn</h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>How LLMs generate text via next-token prediction</li>
          <li>Tokenization basics and why tokens impact quality, limits, and cost</li>
          <li>Hallucinations: why they happen and how to mitigate them</li>
          <li>Prompting fundamentals: clarity, specificity, persona, and format</li>
          <li>The I.N.S.Y.N.C. framework for building high-quality prompts</li>
          <li>Hands-on practice: prompt builder, critique, and improvement loops</li>
          <li>Advanced techniques: deconstruction, patterns, iterative refinement, priming</li>
        </ul>
      </section>

      {/* Lesson-by-Lesson Snapshot */}
      <section className="bg-card p-6 rounded-xl border border-border">
        <h2 className="text-2xl font-semibold text-card-foreground mb-4 flex items-center"><Map className="w-6 h-6 mr-3 text-sky-500"/>Lesson-by-lesson snapshot</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-lg border bg-muted">
            <h3 className="font-semibold text-foreground">1.1 — What is an AI, Really?</h3>
            <p className="text-muted-foreground mt-1">Plain‑language intro to LLMs as next‑token predictors; why wording steers outcomes.</p>
            <Link to="/instructions/module-1/1.1" className="inline-flex items-center text-primary mt-2">Start lesson<ArrowRight className="w-4 h-4 ml-1"/></Link>
          </div>
          <div className="p-4 rounded-lg border bg-muted">
            <h3 className="font-semibold text-foreground">1.2 — Tokenization & Next-Token Prediction</h3>
            <p className="text-muted-foreground mt-1">Interactive tokenizer and core loop for generation; links to prompt influence.</p>
            <Link to="/instructions/module-1/1.2" className="inline-flex items-center text-primary mt-2">Start lesson<ArrowRight className="w-4 h-4 ml-1"/></Link>
          </div>
          <div className="p-4 rounded-lg border bg-muted">
            <h3 className="font-semibold text-foreground">1.3 — When AI Gets It Wrong (Hallucinations)</h3>
            <p className="text-muted-foreground mt-1">Why plausible but incorrect outputs appear; patterns, red flags, and verification.</p>
            <Link to="/instructions/module-1/1.3" className="inline-flex items-center text-primary mt-2">Start lesson<ArrowRight className="w-4 h-4 ml-1"/></Link>
          </div>
          <div className="p-4 rounded-lg border bg-muted">
            <h3 className="font-semibold text-foreground">1.4 — The Art of the Ask (Intro to Prompting)</h3>
            <p className="text-muted-foreground mt-1">Clarity, specificity, personas, and structure—plus side‑by‑side prompt examples.</p>
            <Link to="/instructions/module-1/1.4" className="inline-flex items-center text-primary mt-2">Start lesson<ArrowRight className="w-4 h-4 ml-1"/></Link>
          </div>
          <div className="p-4 rounded-lg border bg-muted">
            <h3 className="font-semibold text-foreground">1.5 — The I.N.S.Y.N.C. Framework</h3>
            <p className="text-muted-foreground mt-1">Intent, Nuance, Style, You as…, Narrative format, Context—with builder and eval.</p>
            <Link to="/instructions/module-1/1.5" className="inline-flex items-center text-primary mt-2">Start lesson<ArrowRight className="w-4 h-4 ml-1"/></Link>
          </div>
          <div className="p-4 rounded-lg border bg-muted">
            <h3 className="font-semibold text-foreground">1.6 — Workshop: Building with I.N.S.Y.N.C.</h3>
            <p className="text-muted-foreground mt-1">Hands‑on challenges (travel plan, cover letter, campaigns) + prompt improver.</p>
            <Link to="/instructions/module-1/1.6" className="inline-flex items-center text-primary mt-2">Start lesson<ArrowRight className="w-4 h-4 ml-1"/></Link>
          </div>
          <div className="p-4 rounded-lg border bg-muted">
            <h3 className="font-semibold text-foreground">1.7 — Advanced Prompting Techniques</h3>
            <p className="text-muted-foreground mt-1">Deconstruction, patterns, iterative refinement, instructional priming, tools.</p>
            <Link to="/instructions/module-1/1.7" className="inline-flex items-center text-primary mt-2">Start lesson<ArrowRight className="w-4 h-4 ml-1"/></Link>
          </div>
          <div className="p-4 rounded-lg border bg-muted">
            <h3 className="font-semibold text-foreground">1.8 — Module 1 Challenge</h3>
            <p className="text-muted-foreground mt-1">Culminating exercise: apply I.N.S.Y.N.C. end‑to‑end with critique and polish.</p>
            <Link to="/instructions/module-1/1.8" className="inline-flex items-center text-primary mt-2">Start lesson<ArrowRight className="w-4 h-4 ml-1"/></Link>
          </div>
        </div>
      </section>

      {/* Skills You Will Build */}
      <section className="bg-muted/30 p-6 rounded-xl border border-muted">
        <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center"><Layers className="w-6 h-6 mr-3 text-violet-500"/>Skills you’ll build</h2>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>Explain LLMs and tokens in plain language</li>
          <li>Spot and mitigate hallucinations with grounding and structure</li>
          <li>Compose clear, specific prompts with personas and formats</li>
          <li>Use I.N.S.Y.N.C. to design, evaluate, and iterate prompts</li>
          <li>Apply advanced techniques for precision and consistency</li>
        </ul>
      </section>

      {/* How to Use This Module */}
      <section className="bg-card p-6 rounded-xl border border-border">
        <h2 className="text-2xl font-semibold text-card-foreground mb-3 flex items-center"><Compass className="w-6 h-6 mr-3 text-amber-500"/>How to use this module</h2>
        <ol className="list-decimal list-inside text-muted-foreground space-y-2">
          <li>Start with 1.1 and 1.2 to anchor mental models around tokens and prediction.</li>
          <li>Learn failure modes in 1.3, then practice fundamentals in 1.4.</li>
          <li>Adopt the I.N.S.Y.N.C. structure in 1.5 and apply it in 1.6.</li>
          <li>Level up with advanced techniques in 1.7.</li>
          <li>Demonstrate mastery in the final challenge (1.8).</li>
        </ol>
      </section>

      {/* Assessment & Completion */}
      <section className="bg-muted/30 p-6 rounded-xl border border-muted">
        <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center"><Award className="w-6 h-6 mr-3 text-teal-500"/>Assessment & completion</h2>
        <p className="text-muted-foreground text-sm">
          Each lesson includes a short quiz or interactive activity. The final challenge assesses your ability to apply the full I.N.S.Y.N.C. workflow, with critique and refinement. Completing these prepares you for subsequent modules.
        </p>
      </section>
    </div>
  );
};

export default OverviewModule1;
