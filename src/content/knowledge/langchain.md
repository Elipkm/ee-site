---
created: 2026-11-19
updated: 2026-11-19
title: LangChain
summary: Getting started with LangChain – components, LCEL, RAG and local models with Ollama.
topic: AI & Agents
tags: [LangChain, RAG, LLM, Ollama]
---

LangChain is an open-source framework (Python and JavaScript) for applications built on large language models. Your application stays independent of the concrete model. *(Status of my talk: February 2025 – versions and APIs change quickly.)*

## Ecosystem

LangChain itself, **LangGraph** (agents as graphs), **LangSmith** (tracing and evaluation) and the LangChain Hub.

## Core building blocks

Chains, the Expression Language (LCEL), chat models, prompt templates, document loaders, text splitters, retrievers and output parsers.

A simple chain connects a prompt and a model: `chain = prompt | llm`.

## Patterns from practice

- **RAG:** a retriever adds matching document content to the prompt, for example from a large PDF.
- **Structured output:** a `JsonOutputParser` turns a free-text answer (such as a customer review) into structured data.
- **Run locally:** with Ollama, models like Llama, Mistral or Gemma run on your own machine – ideal for experimenting without API costs.

## Security

API keys belong in environment variables with minimal permissions – never in source code, screenshots or slides.
