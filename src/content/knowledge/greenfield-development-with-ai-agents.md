---
created: 2026-11-19
updated: 2026-11-19
title: Greenfield Development with AI Agents
summary: How I start a new project with a coding agent – AGENTS.md, product vision, spec-driven development.
topic: AI & Agents
tags: [agentic coding, AGENTS.md, Codex, OpenSpec]
---

This is how I start a new project with a coding agent:

1. Brainstorm the product idea and requirements with a chat AI.
2. Draft an implementation plan and tech stack for an MVP.
3. Create a main folder with **`AGENTS.md`** (folder structure, rules) and **`product-vision.md`** (description and requirements).
4. Continue spec-driven, for example with `openspec init`.
5. Start the agent (for example Codex) in the project folder.
6. Initialise a Git repository so every change stays traceable.

## Principles

- **Don't follow blindly:** I describe intent and boundaries, review the result critically and stay accountable for the code.
- **Build your own AI work process:** context as Markdown (rules, guidelines, feature plans) instead of long one-off prompts.
- **Split subagents by task**, not by role – it keeps the main context small.
- **Agent-native applications:** the GUI and the agent chat always stay in sync.
