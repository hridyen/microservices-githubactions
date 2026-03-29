# Branch-Aware Pipeline (Monorepo Microservices CI)

## Description
A streamlined CI pipeline designed for a monorepo architecture that reliably detects changes at the service level and builds only the affected microservices using GitHub Actions.

## Goal
- Optimize CI/CD workflows by mitigating unnecessary and redundant service builds.
- Implement robust path-based change detection within a multi-service monorepo.
- Emulate real-world DevOps continuous integration practices utilized in highly scalable systems.

## 🛠 Tech Stack
- **GitHub Actions**: CI/CD automation and pipeline orchestration
- **Docker**: Containerization of microservices
- **Node.js (Express)**: Microservice application backend
- **YAML**: Pipeline configuration and infrastructure as code
- **Git & GitHub**: Version control and webhook triggers

## ✨ Key Features
- **Path-Based Service Detection**: Accurately identifies which specific microservices contain modifications.
- **Selective Builds**: Compiles and tests only the modified services, saving pipeline time and compute resources.
- **Monorepo Architecture Support**: Seamlessly manages multiple independent services within a single repository environment.
- **Dockerized Services**: Ensures consistent and reproducible environments across development and CI/CD stages.
- **Parallel Job Execution**: Runs independent service pipelines concurrently for faster CI feedback.
- **Debug-Friendly Logs**: Comprehensive output tracking allows for rapid CI issue resolution.

## 🏛️ Architecture

### High-Level Component Flow
```text
Developer Push → GitHub Repository → GitHub Actions Pipeline
                                          ↓
                               Detect Changed Service
                                          ↓
                 ┌────────────────┬────────────────┬────────────────┐
                 │  Auth Service  │  Login Service │ Config Service │
                 └────────────────┴────────────────┴────────────────┘
                                          ↓
                                Docker Build & Run
```

### Core Components
- **Monorepo**: A centralized repository housing multiple independent services (`auth`, `login`, `config`).
- **Detection Layer**: Change-detection logic to identify modified sub-directories.
- **Execution Layer**: Conditional GitHub Actions jobs that execute individually based on path history.
- **Container Layer**: Automated building and ephemeral execution of distinct Docker images per service.

## 🔁 Workflow / How It Works
1. **Push**: A developer pushes code changes to the target branch.
2. **Trigger**: The GitHub Actions pipeline is initiated by the push event.
3. **Detection**: The `detect-changes` job assesses the Git diff for modified file paths.
4. **Evaluation**: Boolean outputs (`true`/`false`) are generated reflecting the modification status of each service.
5. **Conditional Execution**: Subsequent build jobs evaluate these flags; only services marked `true` execute their build steps.
6. **Validation**: Docker containers validate the successful build by spinning up and surfacing application logs.

## ⚙️ Setup Instructions

### Prerequisites
- Git
- Node.js
- Docker Engine
- A foundational understanding of GitHub Actions

### Installation
Clone the repository to your local environment:
```bash
git clone https://github.com/your-username/microservices-monorepo.git
cd microservices-monorepo
```

### Configuration
Service-level configuration (Example using the Auth Service):
```bash
cd auth-service
npm install
```

### Running the Project Locally
To build and run a specific microservice container:
```bash
docker build -t auth-service .
docker run -p 3001:3000 auth-service
```
Access the service locally at: `http://localhost:3001` (Ensure port mappings match the specific service).

## 🔗 Integrations
- **GitHub Actions**: Provides the CI runner infrastructure and CI/CD logical engine.
- **Docker Engine**: Core dependency for resolving standardized, scalable container images.
- **GitHub Webhooks**: Serves as the real-time event trigger for pipeline invocation.

## 📦 CI/CD Pipeline
- **Trigger**: Automated upon pushed commits to configured branches.
- **Build**: Context-aware Docker image synthesis specific to the services flagged by the diff analyzer.
- **Test**: Container startup verification and application health log validation.
- **Deploy**: Simulated temporary deployment running containers securely within the GitHub runner instance.

## 🌿 Branch Strategy
| Branch | Purpose |
| ------ | ------- |
| `main` | Production-ready code, establishing the source-of-truth. |
| `dev` | Integration testing limit and active pre-production collaboration. |
| `feature/*` | Isolated context for developing independent features or tasks. |

## 📊 Screenshots / Output
*(Add screenshots showing pipeline execution views, job-level logs, and Docker build outputs here)*

## 💡 Learnings & Optimizations

### Monorepo Change Detection Optimization
During initial pipeline development, incorrect services were sporadically triggering (e.g., `auth-service` initiating a build during a commit entirely isolated to `login-service`).
- **Root Cause**: The standard `actions/checkout` step invokes a shallow repository clone (`fetch-depth: 1`), omitting the historical delta context required for precise branch-diff evaluation.
- **Solution**: Enhanced the repository checkout configuration to fetch complete Git history, enabling native and accurate path-based filtering algorithms.
  ```yaml
  - uses: actions/checkout@v4
    with:
      fetch-depth: 0
  ```

### Key Takeaways
- Command over monorepo CI/CD routing optimization techniques.
- Implementation strategies for matrix and conditional job execution.
- Operationalization of Git differential state evaluating inside ephemeral infrastructures.

## 🚀 Future Improvements
- [ ] Automate pushing successfully tested Docker images to an external registry (Docker Hub/ECR).
- [ ] Implement deployment phases targeting AWS EC2, or a Kubernetes cluster.
- [ ] Expand the pipeline with robust testing gateways (Unit, Integration, and end-to-end testing).
- [ ] Architect a unified Nginx/Traefik reverse proxy layer for consolidated local request routing.
- [ ] Introduce dedicated observability infrastructure utilizing Prometheus and Grafana.

## 🏁 Conclusion
This repository functions as a professional, scalable demonstration of continuous integration handling microservices within a monorepo structure. Integrating intelligent, path-aware evaluation mechanisms drastically improves feedback loops and compute efficiency, reflecting mature, industry-standard DevOps engineering principles.
