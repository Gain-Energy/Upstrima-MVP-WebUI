# 🛠 Upstrima WebUI - Customized AI Platform Forked from Open WebUI

**Upstrima WebUI** is a **customized fork** of Open WebUI, optimized for **oil & gas engineering AI workflows**. It includes advanced **multi-agent AI collaboration**, **real-time AI streaming**, **RAG-powered document retrieval**, and **persistent AI memory**.

🔹 **Fully Integrated with Upstrima's AI Stack**  
🔹 **Multi-Agent AI Collaboration**  
🔹 **Custom AI Agent Training & Fine-Tuning**  
🔹 **AI Memory for Persistent Conversations**  
🔹 **File Management & RAG-Powered Search**  
🔹 **Real-Time AI Streaming for Faster Responses**  

---

## 🚀 Key Enhancements in Upstrima WebUI
### 🔹 AI & Chat System
- 🤖 **Multi-Agent Conversations** → Choose different AI agents per message.
- 🧠 **Persistent AI Memory** → AI recalls user interactions across sessions.
- 🔄 **Real-Time Streaming** → AI responses appear word-by-word.
- 🎨 **UI Enhancements** → Smooth message animations & structured outputs.

### 📂 File Management & RAG Search
- 📄 **Upload PDFs & Documents** → AI retrieves information from stored files.
- 🔍 **Optimized Chunking** → Documents are split for better search accuracy.
- 📌 **Citation-Backed AI Responses** → AI references uploaded files when answering.

### 🛠 AI Agent Customization & Training
- ⚙️ **Custom AI Agent Settings** → Users can adjust temperature, tone, and role.
- 📚 **Fine-Tuning API** → Upload datasets & train custom AI models.
- 🔗 **Multi-Agent Collaboration** → AI models can interact with each other.

### 🖥️ Admin Dashboard & Workflows
- 📊 **AI Performance Monitoring** → Evaluate & compare model effectiveness.
- 🔄 **Automated AI Workflows** → Chain AI agents for advanced engineering workflows.
- 📁 **Secure Role-Based Access Control (RBAC)** → Manage permissions for different users.

---

## 📥 Installation Guide

### 1️⃣ Install Upstrima WebUI via Docker
Run the following command:
```bash
docker run -d -p 3000:8080 -v upstrima-data:/app/backend/data --name upstrima-webui --restart always ghcr.io/upstrima/upstrima-webui:main
```
🔹 Access Upstrima WebUI at **http://localhost:3000**.

---

### 2️⃣ Install via Python pip
Ensure you have **Python 3.11+**, then install:
```bash
pip install upstrima-webui
```
Run Upstrima WebUI:
```bash
upstrima-webui serve
```

---

### 3️⃣ Installation via Kubernetes (Helm)
For enterprise-scale deployments:
```bash
helm repo add upstrima https://charts.upstrima.dev
helm install upstrima-webui upstrima/upstrima-webui
```

---

## ⚙️ Configuration
Set up **AI models & API keys** in the `.env` file:
```ini
OPENAI_API_KEY=your-api-key
PINECONE_API_KEY=your-pinecone-key
UPSTRIMA_MODEL_URL=https://ai.upstrima.dev
```
Then restart the service:
```bash
pnpm dev
```

---

## 🛠 Development & Customization
Clone the repository:
```bash
git clone https://github.com/upstrima/upstrima-webui.git
cd upstrima-webui
pnpm install
pnpm dev
```
Modify settings in:
- **backend/api/** → AI models, RAG search, memory.
- **frontend/src/components/chat/** → Chat UI & agent selection.
- **tailwind.config.js** → UI theming.

---

## 📖 Documentation
- [Installation Guide](https://docs.upstrima.dev/webui/install)
- [Customization](https://docs.upstrima.dev/webui/customization)
- [API Reference](https://docs.upstrima.dev/webui/api)

---

## 💬 Support & Community
Join the Upstrima community:
[![Discord](https://img.shields.io/badge/Discord-Upstrima-blue?logo=discord&logoColor=white)](https://discord.gg/upstrima)

---

## 📜 License
This project is licensed under the [BSD-3-Clause License](LICENSE).

---

### 🚀 Ready to Deploy Upstrima WebUI?
🔹 **Multi-Agent AI Collaboration**  
🔹 **Persistent AI Memory**  
🔹 **Real-Time AI Streaming**  
🔹 **File Uploads & RAG Search**  

💡 **Start building AI-powered workflows with Upstrima WebUI today!**
