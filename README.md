# AI Email Triage Automation

An n8n workflow that automatically classifies incoming emails and generates reply suggestions using AI.

## Features
- 🤖 AI-powered classification (support, sales, billing, spam, other)
- ⚡ Priority detection (urgent vs normal)
- 💬 Automatic reply generation
- 📧 Gmail integration
- 🔔 Notification system

## Setup
1. Import `email-triage-workflow.json` into n8n
2. Configure Gmail OAuth credentials
3. Add Groq API key for LLM
4. Activate workflow

## Tech Stack
- n8n (workflow automation)
- Groq (LLM for classification)
- Gmail API
- AI Agents

## Architecture
```
Gmail Trigger → AI Classifier → Reply Generator → IF (Priority) → Actions

***

## Quick Commands Summary

```bash
git init
git add .
git commit -m "Initial commit: AI email triage workflow"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/n8n-email-triage.git
git push -u origin main

# Future updates:
git add .
git commit -m "Update workflow with better prompts"
git push
