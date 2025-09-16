# FlightBriefAI ✈️

**Automate the process of gathering recent flight logs to help Private Aviation sales reps.**

*🏆 Top 5 Demo Showcase - LOCALHOST AI Hackathon in Grand Rapids*

## 🚀 Overview

FlightBriefAI transforms the tedious process of flight data research into a streamlined, automated solution for private aviation sales representatives. What used to take 15-60 minutes of manual research across scattered APIs and PDFs now takes just 1 minute.

## 🎯 Problem Statement

- **Time Waste**: Sales reps spend excessive time hunting for flight information
- **Data Fragmentation**: Critical data is scattered across multiple APIs and PDF documents
- **Outdated Information**: Sales reps enter client discussions without real-time flight data

## 💡 Solution

**Turn 15-60 minutes of research into 1 minute with our 3-step process:**

1. **Enter Plane ID** - Simple input interface
2. **Pull Flight Logs** - Automated data aggregation
3. **Generate Sales Briefing** - AI-powered insights and summaries

## 🛠️ Tech Stack

- **Frontend**: Next.js
- **Data Source**: OpenSky API
- **AI/LLM**: Nebius AI Studio

## 👥 Team

- **[Cody Thornell](https://github.com/grcodeman)** 
- **[Benwin George](https://github.com/benwin-dev)**
- **[Santhiya Venkatesh](https://github.com/santhiya-2000)**
- **[Lingamuthu Kalyanasundaram](https://github.com/lingan7)**

## ⚙️ Environment Setup

Create a `.env.local` file in your project root with the following variables:

### Required API Keys

- **OpenSky Network API**: [https://opensky-network.org/data/api](https://opensky-network.org/data/api)
- **Nebius AI Studio**: [https://nebius.com/ai-studio](https://nebius.com/ai-studio)

```bash
OPENSKY_CLIENT_ID=
OPENSKY_CLIENT_SECRET=
NEBIUS_API_KEY=
```

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
