---
created: 2026-11-20
updated: 2026-11-20
title: Docker and Docker Swarm
date: 2026-09-25
event: Internal tech talk
---

From Docker fundamentals to running services on a Swarm cluster, with the Docker Certified Associate (DCA) in mind.

**What the talk covers**

- **Why Docker:** "build once, run anywhere" – an application and its dependencies in one package, without the weight of a virtual machine.
- **Images and containers:** an image is a read-only stack of layers; a container adds a thin writable layer on top. Build cache and layer order explain fast and slow builds.
- **Dockerfile:** `FROM`, `RUN`, `COPY`, `CMD` versus `ENTRYPOINT`, `ENV`, `ARG`, `HEALTHCHECK` and multi-stage builds.
- **Container lifecycle:** short-lived and long-running containers, restart policies, `docker exec`.
- **Networking:** bridge networks, name resolution on custom bridges and the host network.
- **Storage:** storage drivers, copy-on-write and volumes.
- **Security:** capabilities, privileged containers, cgroups and namespaces.
- **Docker Swarm:** manager and worker nodes, services, node labels and placement constraints, global services, secrets and backing up the Swarm state.
