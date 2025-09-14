<!--
  File: tester_instructions.md
  Purpose: Alpha tester guide with scope, cadence, and per‑module reflection questions.
  Audience: Non‑technical testers evaluating course setup, content clarity, and UX.
  Note: The AI model is not active in production; focus feedback on content and UX.
-->

# Alpha Tester Instructions — ChatCourse

Welcome and thank you for helping shape ChatCourse. This guide explains what to test, how to test it, and how to provide useful feedback. The focus of this alpha is course setup, content clarity for non‑AI‑technical learners, and user experience.

> Important: The AI model is currently not active in the production environment. Please evaluate the materials, flows, and UX, not model accuracy.

## Test Scope and Goals

- Content clarity for non‑technical learners
- Onboarding and course setup experience
- Navigation, readability, and visual design
- Appropriateness and usefulness of examples, exercises, and screenshots
- Alignment of sections with learning goals

## Cadence and Communication

- Weekly rhythm: Review exactly one module per week (Modules 1–8)
- Feedback channel: Post in the community Discord server or share during a live feedback session
- Submission window: Please aim to post feedback by Sunday 5pm local time each week
- Format: Use the feedback templates below to keep responses concise and comparable

## How to Test Each Week

1. Skim the module overview (what you’ll learn, prerequisites, time estimate)
2. Read the content in order, including examples and any exercises
3. Attempt the setup steps as written; note friction points. Installation and set-up is different for Mac, Windows, and Linux.
   - Tip: If a step seems "developer-y," note the exact wording that confused you and suggest simpler phrasing.
4. Capture feedback using the Module Reflection template below
5. Share live feedback or post in Discord using the templates

### Weekly Definition of Done (DoD)

- You completed one module’s required reading and examples
- You recorded friction points with exact wording or screenshots
- You posted a Module Reflection in Discord before Sunday 5pm local time
- You gave one practical suggestion that would help a typical employee finish faster next week

## Known Limitations for This Alpha

- The AI model is not active in production. Do not score model quality.
- Data persistence and advanced features may be stubbed or described but not enabled.
- Screenshots may be placeholders and will be updated based on your feedback.

---

## Feedback Templates

Use these templates to keep feedback consistent and easy to triage.

### 1) Module Reflection (Primary)

- Module: [number and name]
- Overall clarity (1–5): [ ]
- UX/navigation (1–5): [ ]
- Confidence to proceed (1–5): [ ]
- Business applicability (1–5): [ ]  
  (How useful is this module for everyday work or onboarding?)
- Biggest friction point: [what slowed you down]
- Most helpful element: [example, visual, checklist, etc.]
- One change that would improve this module: [your suggestion]
- Estimated time spent: [minutes]
- Accessibility notes (if any): [contrast, keyboard nav, captions]

### 2) Bug Report (Optional)

- Summary: [short description]
- Steps to reproduce: [1, 2, 3]
- Expected vs. actual: [what you thought vs. what happened]
- Environment: [device, browser]
- Screenshots: [attach if available]

### 3) Feature or Content Suggestion (Optional)

- Problem/opportunity: [learner need]
- Proposed solution: [idea]
- Why it matters: [impact on clarity, motivation, or outcomes]
- Priority: [low/medium/high]

---

## Per‑Module Standard Checklist (Quick Pass)

Use this 60–90 second checklist at the end of each module review before you submit feedback:

- Setup clarity: I could follow the steps on my OS without outside help
- One key takeaway: I can name the single most useful idea in plain language
- One practice task: I completed or could complete the suggested exercise
- Business applicability: I can point to one real workflow this helps
- Accessibility basics: Text size/contrast were comfortable; screenshots readable
- Time estimate: The stated time was accurate within ±25%

Then fill in the full Module Reflection below.

## Per‑Module Reflection Questions

Below are tailored questions for each module. Ensure all answers are specific, reference the text you read or the screen you used, and include examples when helpful. If a question does not apply, write “N/A”.

For every module, also answer:

- Outcome in one sentence: I can now [describe a real task you could do at work].
- Time: Did the stated time estimate match your real time? If not, by how much?
- Workplace fit: Name one business scenario where this module helps (e.g., customer email, report draft, meeting prep).
- OS-specific: Were any steps unclear for your OS (Mac/Windows/Linux)? Quote the step and propose a simpler rewrite.

### Module 1: Foundations of AI & Prompting
<sub>In-app label: “Module 1 Overview: Foundations of AI & Prompting”</sub>

- Goal fit: After reading 1.1–1.3, can a non‑technical learner explain “what LLMs do” in one or two sentences? If not, what is confusing?
- Terminology: Which terms require a glossary entry or simpler alternatives?
- Prompt basics: Do 1.2–1.3 progressively build confidence? Where did you need more examples?
- INSYNC framework: Does 1.5–1.6 clearly show how to apply the framework to a simple task?
- Challenge (1.8): Is the challenge scoped so a new learner can succeed in 20–30 minutes?
- Visuals: Which diagram or screenshot clarified a concept the most? Which needs revision?
- Business value: Give one example of how Module 1 could shorten a real task (e.g., draft a memo, summarize notes). What wording would make that obvious in the module?
- Jargon check: Identify one sentence to rewrite in plain language. Provide your suggested rewrite.

### Module 2: Context Management
<sub>In-app label: “Module 2 Overview: Context Management”</sub>

- Role and tone: Are “role definition” and “tone/style” examples concrete and transferable?
- Context window: Do explanations avoid jargon while remaining accurate?
- Maintaining context: Would a non‑technical user know how to keep the AI “on track” after this module?
- Practical examples: Which example best demonstrates context carryover? Any missing edge cases?
- Business scenario: Pick a recurring task (e.g., customer reply, internal update). Draft a role+tone instruction that you would actually reuse. What label would you give it so a teammate could find it?
- Copy‑paste readiness: Are there ready-to-reuse text blocks that you could paste into your workflow? If not, where should we add them?

### Module 3: Prompting Techniques
<sub>In-app label: “Module 3 Overview: Prompting Techniques”</sub>

- Complexity ramp: Do zero‑shot and chain‑of‑thought sections escalate difficulty appropriately?
- Structured outputs: Are formatting templates clear enough for copy‑paste use?
- Reasoning: Did “think step‑by‑step” guidance avoid implying guaranteed correctness from AI?
- Exercises: Which exercise felt too open‑ended or too constrained?
- Business output: Could you produce a simple, consistent template (e.g., meeting notes, weekly status) using this module? What example would make that easier?
- Risk note: Where should we add a short reminder that reasoning text can “sound confident but be wrong,” and what safeguard would you suggest for employees?

### Module 4: AI Capabilities & Tools
<sub>In-app label: “Module 4 Overview: AI Capabilities & Tools”</sub>

- Function calling: Is the concept understandable without coding background?
- MCP and tool safety: Are security considerations clear without fear‑mongering?
- Custom tools: Do planning checklists make sense for non‑developers?
- GPTs/Agents: Do examples make it obvious when to use a custom GPT vs. an agent?
- Business workflow: Identify one internal process that could benefit (e.g., triaging requests). What is the smallest safe tool you would pilot first, and why?
- Safety clarity: Point to a sentence about security that could be clearer. Propose a rewrite in plain language for general employees.

### Module 5: Advanced Interactions
<sub>In-app label: “Module 5 Overview: Advanced Interactions”</sub>

- Multi‑turn flows: Did you learn practical tactics to recover from misunderstanding?
- Personalization: Are privacy considerations stated plainly and respectfully?
- Performance: Do tips help reduce “waiting” frustration and set expectations?
- Interface clarity: Were settings discoverable and labels understandable?
- Trust & efficiency: Did this module help you finish a task faster with fewer corrections? Where should we add a tip or micro‑example?
- Error recovery: Provide a short “If AI misunderstands, then try …” tip we should add to the UI.

### Module 6: Development with AI
<sub>In-app label: “Module 6 Overview: Development with AI”</sub>

- Idea to prototype: Do exercises show a plausible path from idea to first test?
- Design thinking: Are prompts for interviewing users or synthesizing insights clear?
- Metrics: Do suggestions feel actionable for a solo learner?
- Iteration: Is it clear how to revise prompts and flows based on data?
- Business case: Write one sentence of ROI framing for a small pilot (time saved, errors reduced, satisfaction increased). Where should this guidance live in the module?
- Pilot scope: Suggest a 1–2 week pilot that a small team could run after this module. What output would count as success?

### Module 7: Advanced Techniques
<sub>In-app label: “Module 7 Overview: Advanced Techniques”</sub>

- Scope: Does this module set expectations that it’s optional/advanced without discouraging learners?
- RAG: Is the mental model for retrieval clear without diving into code?
- Fine‑tuning: Are trade‑offs explained in plain language with realistic examples?
- Depth: Where would you add a “read more” link or optional sidebar?
- Optional path: Is it clear what to skip if you’re a business user? Suggest a callout to make this explicit.
- Vendor readiness: After reading, what 2–3 questions would you ask a vendor or IT partner to evaluate a solution?

### Module 8: Responsible AI
<sub>In-app label: “Module 8 Overview: Responsible AI”</sub>

- Bias & fairness: Are definitions concrete with relatable examples?
- Explainability: Do we set realistic expectations for what’s explainable today?
- Security & privacy: Are the do’s/don’ts checkbox‑friendly and non‑technical?
- Ethics in practice: Would a learner know what to do differently tomorrow?
- Policy-in-action: Draft one short checklist item you would require employees to follow (e.g., “Do not paste customer PII”). Where should it appear (onboarding, UI tooltip, both)?
- Incident readiness: If something goes wrong, what’s the simple first step employees should take? Propose exact wording for a one-line playbook.

---

## UX and Design Checklist (All Modules)

- Navigation is predictable and consistent
- Headings and labels match the content beneath
- Buttons and links use plain language (“Start exercise” vs. “Submit”)
- Visual hierarchy guides attention; no crowded sections
- Screenshots match the current UI and include captions
- Mobile and desktop layouts are both usable
- Color contrast and font sizes meet accessibility basics

## Prompt‑Design Note

We will design and refine prompts for each section based on your feedback trends. When you flag confusion, please propose the smallest prompt change that would have helped you. Example: “Add an explicit format block” or “Define the role as ‘beginner‑friendly tutor’ upfront.”

## Submitting Feedback in Discord

- Post in the #alpha‑feedback channel
- Prefix your message with the module number (e.g., [M3])
- Paste your completed Module Reflection
- Attach screenshots for any UI issues
- Tag @maintainers on high‑priority blockers

## Thank You

Your feedback directly shapes the course. We will publish weekly change‑logs summarizing what we updated based on your input. If you prefer live feedback, we’ll coordinate a 15–20 minute call during your module week.
