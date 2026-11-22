---
created: 2026-11-19
updated: 2026-11-21
title: Prompt Collection and AGENTS.md
summary: What belongs into AGENTS.md, a compact example, and the prompt patterns I reuse with coding agents.
topic: Agentic Coding
tags: [AGENTS.md, prompts, agentic coding, context]
---

## AGENTS.md in a nutshell

`AGENTS.md` is a README for coding agents: a Markdown file in the repository that tells an agent how the project works. It is read automatically by several agent tools, and because it is part of the repo it is versioned and reviewed like code.

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

Important when there are new perspectives or learnings the agent should remember. Tell it active to remember:
Persist any valuable knowledge we may need in upcoming sessions in your AGENTS.md file.

See also [Agentic Coding](/knowledge/agentic-coding).
