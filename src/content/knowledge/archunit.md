---
created: 2026-11-19
updated: 2026-11-20
title: ArchUnit
summary: Turn architecture rules into unit tests for Java – layers, cycles and naming – and keep them honest in CI.
topic: Architecture
tags: [ArchUnit, Java, architecture, testing]
---

ArchUnit checks the structure of Java code with plain unit tests. Architecture rules that live only in a diagram or in people's heads erode; rules that run in the build do not.

## Setup

Add `archunit-junit5` as a test dependency and write rules as JUnit tests.

## Examples

Layers: who may access whom.

```java
@AnalyzeClasses(packages = "com.example.app")
class ArchitectureTest {

    @ArchTest
    static final ArchRule layers = layeredArchitecture()
        .consideringOnlyDependenciesInLayers()
        .layer("Controller").definedBy("..controller..")
        .layer("Service").definedBy("..service..")
        .layer("Persistence").definedBy("..persistence..")
        .whereLayer("Controller").mayNotBeAccessedByAnyLayer()
        .whereLayer("Service").mayOnlyBeAccessedByLayers("Controller")
        .whereLayer("Persistence").mayOnlyBeAccessedByLayers("Service");

    @ArchTest
    static final ArchRule noCycles = slices()
        .matching("com.example.app.(*)..")
        .should().beFreeOfCycles();
}
```

Single rules read almost like prose:

```java
noClasses().that().resideInAPackage("..service..")
    .should().dependOnClassesThat().resideInAPackage("..controller..");
```

## Best practices

- **Few, meaningful rules** beat many trivial ones. Start with layers and cycles.
- **Introduce rules into legacy code** with `FreezingArchRule.freeze(...)`: existing violations are recorded, only new ones fail the build.
- **Run them in CI**, like any other test, and fix violations instead of ignoring them.
- **Name the rule after its intent**, so a failure explains itself.
- **Use them with AI agents:** rules that fail the build give a coding agent immediate feedback about your architecture. See [Agentic Coding](/knowledge/agentic-coding).
