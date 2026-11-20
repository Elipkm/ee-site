---
created: 2026-11-20
updated: 2026-11-20
title: UX and Agents
summary: When a classic GUI, an agentic UI or a generated UI fits – and what makes AI chat interfaces hard.
topic: AI & Agents
tags: [UX, agents, generative UI]
---

AI changes what a user interface can be. These are my notes on when to use which style.

## Classic GUI

For everyday tasks – booking a table, for example – direct manipulation is hard to beat: it is fast and accurate, and users know exactly what will happen.

## Agentic UI

For complex, multi-step tasks, describing a goal and letting an agent work is a better fit. That is why agents work so well for coding.

## Generative UI

The interface is generated, either completely or only in parts that are embedded into the app. To integrate generated parts safely, define app-wide rules up front:

- how lists, maps and other recurring elements look,
- which legal aspects must always be respected,
- which component styles are allowed.

## The tension: consistency and flexibility

A fixed UI is consistent but rigid; a generated UI is flexible but can be unpredictable. Rules and design components keep the flexibility inside safe limits. Smart default values help in both worlds.

## AI chat interfaces

A chat window is a very open interface, and that creates two hard problems:

- **Finding the right context** for each request.
- **Persisting it**, so the conversation does not start from zero every time.

I think the strongest products will combine both: a clear GUI for everyday tasks, with an agent alongside it that stays in sync (agent-native applications).
