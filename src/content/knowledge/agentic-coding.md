---
created: 2026-11-20
updated: 2026-11-21
title: Agentic Coding in Practice
summary: How I work with coding agents across frontend, backend and end-to-end tests – small steps, clear contracts, verified results.
topic: Agentic Coding
tags: [agentic coding, Codex, testing, workflow]
---

Coding agents are most useful when the task is small, the context is clear and the result can be verified. What that looks like depends on the layer you work in.

## The basic loop

1. Describe the intent: the goal, the constraints and what must not change.
2. Let the agent plan, then approve or adjust the plan.
3. Implement in small steps.
4. Verify with tests, the build and your own review.
5. Commit only what you understand.

## Frontend

- Give the agent the design, the component library and the styling rules, so it reuses instead of inventing.
- Check the result visually, in the browser or on a screenshot – not only in the diff.
- Keep components small. Large generated templates are hard to review.

## Backend

- Agree the contracts first: API definitions, interfaces, DTOs and database changes.
- Provide architecture rules and let tests enforce them (see [ArchUnit](/knowledge/archunit)).
- Review business logic and side effects line by line. Generated code often looks right but mishandles edge cases.

## End-to-end tests

- Derive scenarios from the acceptance criteria and let the agent draft the tests.
- Review the assertions yourself: a green test that checks the wrong thing is worse than no test.
- Keep tests deterministic with stable selectors and no fixed sleeps.

## Rule of thumb

The agent writes, I stay responsible. More in [Prompt Collection and AGENTS.md](/knowledge/prompt-collection-and-agents-md).

The scope of the task is critical, model powerful enough to work on full story? Multiple services, dependencies etc. or smaller subtasks for the agent?
