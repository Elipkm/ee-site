---
created: 2026-11-20
updated: 2026-11-20
title: YouTube Knowledge System
summary: Playlist Knowledge Base – a chat app that loads and embeds YouTube playlists, creates summaries and answers questions with RAG, built in n8n with Python scripts.
status: Prototype
url: https://github.com/Elipkm/pkb-chat
---

**Playlist Knowledge Base – Chat App.** Load and embed YouTube playlists into the system, get summaries and ask questions through a RAG system.

Born from the question "Can hours of YouTube knowledge be available in minutes?"

## What it does

- **Load and embed playlists:** YouTube playlists are brought into the system and prepared for retrieval.
- **Summaries:** each piece of content can be condensed into a summary.
- **RAG chat:** a chat interface answers questions from the playlist content, so the knowledge is not just searched but used in conversation.

## How it is built

- **Full implementation in n8n:** the workflows handle the whole process, from loading content to the chat.
- **Python scripts as support:** small scripts cover the steps where code is a better fit than a workflow node.

## Key insight

The value comes from clear use cases, boundaries for the AI and clean system logic – not from "more AI".
