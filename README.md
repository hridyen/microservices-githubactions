# 🚀 Branch-Aware Pipeline (Monorepo Microservices CI)

## 📌 Project Title

**Branch Aware Pipeline**

## 📝 Short Description

A smart CI pipeline for a monorepo architecture that detects changes at the service level and builds only the affected microservices using GitHub Actions.

---

## 🎯 Goal

* Optimize CI/CD workflows by avoiding unnecessary builds
* Implement **path-based change detection** in a monorepo
* Simulate real-world DevOps practices used in scalable systems

---

## ⚙️ Tech Stack

* **GitHub Actions** – CI/CD automation
* **Docker** – Containerization
* **Node.js (Express)** – Microservices backend
* **YAML** – Pipeline configuration
* **Git & GitHub** – Version control

---

## 🔥 Key Features

* ✅ Path-based service detection
* ✅ Selective microservice builds
* ✅ Monorepo architecture support
* ✅ Dockerized services
* ✅ Parallel job execution
* ✅ Debug-friendly pipeline logs
* ✅ Cost and time optimized CI

---

## 🏗️ Architecture

### High-Level Overview:

```
Developer Push → GitHub Repo → GitHub Actions Pipeline
                      ↓
              Detect Changed Service
                      ↓
     ┌──────────────┬──────────────┬──────────────┐
     │ Auth Service │ Login Service│ Config Service│
     └──────────────┴──────────────┴──────────────┘
                      ↓
               Docker Build & Run
```

### Components:

* **Monorepo**: Contains multiple services (`auth`, `login`, `config`)
* **Detection Layer**: Identifies which service changed
* **Execution Layer**: Runs only required jobs
* **Container Layer**: Builds and runs Docker images

---

## 🔄 Workflow / How It Works

1. Developer pushes code to `main` branch
2. Pipeline is triggered
3. `detect-changes` job checks modified paths
4. Outputs (`true/false`) are generated per service
5. Conditional jobs execute:

   * Only affected services are built and run
6. Logs and container status are displayed

---

## 🛠️ Setup Instructions

### 📌 Prerequisites

* Git
* Node.js
* Docker
* GitHub account

---

### ⚙️ Installation

```bash
git clone https://github.com/your-username/your-repo.git
cd microservices-monorepo
```

---

### ⚙️ Service Setup (Example: Auth)

```bash
cd auth
npm install
```

---

### 🐳 Run Locally

```bash
docker build -t auth-service .
docker run -p 3001:3000 auth-service
```

Open:

```
http://localhost:3001
```

---

### ⚙️ GitHub Actions Setup

* Place workflow file in:

```
.github/workflows/monorepo.yml
```

* Push to trigger pipeline

---

## 🔗 Integrations

* GitHub Actions (CI/CD)
* Docker Engine
* GitHub Repository (Webhook-based triggers)

---

## 📦 CI/CD Pipeline

### 🔁 Trigger

* On push to `main` branch

### 🏗️ Build

* Docker image built per changed service

### 🧪 Test

* Container runs and logs validated

### 🚀 Deploy *(Simulated)*

* Containers run in GitHub runner (ephemeral environment)

---

## 🌿 Branch Strategy

| Branch           | Purpose                   |
| ---------------- | ------------------------- |
| main             | Production-ready code     |
| dev *(optional)* | Development/testing       |
| feature/*        | Feature-based development |

---

## 📸 Screenshots / Output

* Pipeline execution view
* Job-level logs
* Docker build output

*(Add screenshots here)*

---

## 🐞 Old Workflow Issue & Fix

### ❌ Problem

* Pipeline incorrectly triggered **wrong services**
* Example:

  * Change in `login/` → `auth-service` also ran

---

### 🔍 Root Cause

* Shallow git clone (`fetch-depth: 1`)
* Incomplete commit history
* Incorrect diff detection by `paths-filter`

---

### ✅ Solution

#### Fix Applied:

```yaml
- uses: actions/checkout@v4
  with:
    fetch-depth: 0
```

```yaml
with:
  base: main
```

---

### 💡 Result

* Accurate change detection
* Correct service triggering
* Stable and reliable pipeline

---

## 🚀 Future Improvements

* Push Docker images to Docker Hub
* Deploy to AWS EC2 / Kubernetes
* Add automated testing stage
* Implement Nginx reverse proxy
* Add monitoring (Prometheus + Grafana)

---

## 📌 Learnings

* Monorepo CI/CD optimization techniques
* Conditional job execution in GitHub Actions
* Docker-based microservice workflows
* Importance of correct git diff detection
* Debugging real-world CI issues

---

## 🧠 Conclusion

This project demonstrates a **production-style CI pipeline** that intelligently handles microservices in a monorepo.

By implementing **branch-aware and path-aware execution**, it significantly improves efficiency, reduces unnecessary workloads, and reflects real-world DevOps engineering practices.

---

💀 *From running everything… to running only what matters.*
