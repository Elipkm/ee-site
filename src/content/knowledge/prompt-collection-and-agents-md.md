---
created: 2026-11-20
updated: 2026-11-20
title: Prompt Collection and AGENTS.md
summary: What belongs into AGENTS.md, a compact example, and the prompt patterns I reuse with coding agents.
topic: Agentic Coding
tags: [AGENTS.md, prompts, agentic coding, context]
---

## AGENTS.md in a nutshell

`AGENTS.md` is a README for coding agents: a Markdown file in the repository that tells an agent how the project works. It is read automatically by several agent tools, and because it is part of the repo it is versioned and reviewed like code.

### What goes in

- **What the project is** – a short overview and the main modules.
- **Commands** – how to build, test and run.
- **Conventions** – code style, naming, package structure.
- **Architecture rules** – what must not depend on what.
- **Definition of done** – tests pass, docs updated, no unrelated changes.
- **Boundaries** – what the agent must not touch or must ask about first.

### A compact example

```markdown
# AGENTS.md

## Project
Spring Boot REST service for order management (Java 21, Maven).

## Commands
- Build and test: `mvn verify`
- Run locally: `mvn spring-boot:run`

## Conventions
- Constructor injection only; no field injection.
- DTOs in `api`, business logic in `service`, persistence in `repository`.

## Done means
- New behaviour has a test; `mvn verify` is green.
- Public methods have Javadoc.
- No changes outside the scope of the task.

## Ask first
- Database schema changes and new dependencies.
```

### Tips

- **Keep it short and concrete.** Every line should change what the agent does.
- **Update it when the agent gets something wrong** – that is the best signal for a missing rule.
- **Use nested files** in subfolders for module-specific rules.
- Put longer material (guidelines, feature plans) into separate Markdown files and link to them.

## Prompts I reuse

**Plan first**
> Read the relevant code and propose a plan for <task>. List the files you would change and the risks. Do not write code yet.

**Small, verified change**
> Implement step 1 of the plan only. Add or update tests, run them, and show me the diff and the test result.

**Review**
> Review this diff for bugs, missing edge cases, naming and test gaps. Be specific and cite the lines.

**Understand unfamiliar code**
> Explain how <feature> works: entry points, data flow and side effects. Point to the files.

**Write tests**
> Write tests for <class> covering the happy path, error cases and boundary values. Do not change production code.

See also [Greenfield Development with AI Agents](/knowledge/greenfield-development-with-ai-agents) and [Agentic Coding](/knowledge/agentic-coding).
