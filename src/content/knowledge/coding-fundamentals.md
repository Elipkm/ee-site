---
created: 2026-11-20
updated: 2026-11-20
title: Coding and Architecture Fundamentals
summary: When to use which Java collection, and how to approach architecture – top-down, bottom-up, views and black/white box.
topic: Fundamentals
tags: [Java, collections, architecture, arc42]
---

Two fundamentals I keep coming back to.

## Which Java collection?

| I need … | Use |
|---|---|
| an ordered sequence, duplicates allowed, access by index | `List` – `ArrayList` by default |
| unique elements | `Set` – `HashSet`; `LinkedHashSet` keeps insertion order, `TreeSet` keeps it sorted |
| lookup by key | `Map` – `HashMap`; `LinkedHashMap` keeps insertion order, `TreeMap` keeps keys sorted |
| first-in-first-out or last-in-first-out | `Queue` / `Deque` – `ArrayDeque` |

Tips:

- Choose by access pattern: index, uniqueness, key lookup or order.
- `ArrayList` is almost always the better list; `LinkedList` rarely pays off.
- Prefer immutable collections (`List.of`, `Map.of`) when the content does not change.
- The standard collections are not thread-safe – see [Java Collections, Synchronization and volatile](/knowledge/java-collections-synchronization-and-volatile).

## Approaching an architecture

- **Top-down:** start with the big picture – context, main building blocks – and refine.
- **Bottom-up:** start from existing components and concrete constraints and grow the structure from there.

Both are useful; I switch between them depending on how much is already known.

### Views

A good architecture description shows the system from several views (as in arc42):

- **Context view:** the system and its environment – users and neighbouring systems.
- **Building block view:** the static structure, from coarse to fine.
- **Runtime view:** how the building blocks interact in important scenarios.
- **Deployment view:** where the software runs.

### Black box and white box

A **black box** is described by its interface and behaviour only. A **white box** also shows the internal structure. Describe each building block as a black box first, and open it up as a white box only where the detail matters.
