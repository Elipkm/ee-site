---
created: 2026-11-20
updated: 2026-11-20
title: Java Collections, Synchronization and volatile
summary: Thread safety in Java – which collections are safe, what synchronized and volatile really guarantee, and when to use atomics.
topic: Java
tags: [Java, concurrency, volatile, synchronized, collections]
---

Concurrency bugs are rare in tests and expensive in production. These are the basics I check first.

## Collections are not thread-safe by default

`ArrayList`, `HashMap` and `HashSet` can lose updates or even corrupt their state when several threads modify them. The options:

| Need | Use |
|---|---|
| a concurrent map | `ConcurrentHashMap` – and its atomic methods `computeIfAbsent`, `merge`, `compute` |
| mostly reads, rare writes | `CopyOnWriteArrayList` |
| producer / consumer | a `BlockingQueue` such as `LinkedBlockingQueue` |
| quick wrapper for a legacy collection | `Collections.synchronizedList(...)` – but iterating still needs manual synchronisation |

A classic bug is **check-then-act**: `if (!map.containsKey(k)) map.put(k, v)` is not atomic, even on a `ConcurrentHashMap`. Use `putIfAbsent` or `computeIfAbsent`.

## synchronized

`synchronized` gives **mutual exclusion** (only one thread in the block) and **visibility** (changes made inside are visible to the next thread that takes the same lock). Keep critical sections small and never call unknown code while holding a lock.

## volatile

`volatile` guarantees **visibility** and ordering for one variable, but **no atomicity**.

```java
private volatile boolean running = true;     // fine: one writer, simple flag

private volatile int counter;                // not fine:
void increment() { counter++; }              // read-modify-write, updates get lost

private final AtomicInteger safeCounter = new AtomicInteger();
void incrementSafely() { safeCounter.incrementAndGet(); }   // correct
```

Good uses for `volatile`: stop flags, and publishing an immutable object to other threads. For counters under heavy contention, `LongAdder` scales better than `AtomicLong`.

## My order of preference

1. **Immutability** – nothing shared, nothing to synchronise.
2. **Concurrent collections and atomics** – ready-made and well tested.
3. **Explicit locks or `synchronized`** – when several variables must change together.

With Java 21, virtual threads make blocking code cheap, but they do not remove the need for thread-safe shared state.

See also [Coding Fundamentals](/knowledge/coding-fundamentals) for choosing the right collection in the first place.
