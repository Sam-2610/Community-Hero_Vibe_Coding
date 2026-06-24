# Community Hero - Hyperlocal Problem Solver 🦸‍♂️🦸‍♀️

## Vibe2Ship Hackathon Submission

Community Hero is an AI-powered platform that enables citizens to identify, report, validate, track, and resolve community issues (potholes, water leaks, damaged streetlights) through collaboration and intelligent automation. 

### 🚀 Features
* **Snap & Solve (AI-Powered Form):** Upload an image of an issue and let Gemini 1.5 Flash categorize, title, and assess its severity automatically.
* **Interactive Geo-Map:** View all community issues in real-time on a geographic map.
* **Community Feed:** Verify and track the status of local infrastructure problems.
* **Gamification:** Upvote/verify issues to increase their visibility and community validation.

### 🛠️ Tech Stack
* **Frontend:** React, Vite, Tailwind CSS, React-Leaflet
* **Backend:** Node.js, Express
* **Database & Storage:** Supabase (PostgreSQL)
* **AI Engine:** Google AI Studio (Gemini 1.5 Flash API)

---

## ⚙️ Local Setup Instructions

### 1. Clone the Repository
\`\`\`bash
git clone <your-github-repo-link>
cd community-hero
\`\`\`

### 2. Backend Setup
\`\`\`bash
cd backend
npm install
\`\`\`
* Create a `.env` file in the `backend/` directory:
\`\`\`env
PORT=5000
GEMINI_API_KEY=your_google_ai_studio_key_here
\`\`\`
* Start the server:
\`\`\`bash
npm start
\`\`\`

### 3. Frontend Setup
\`\`\`bash
cd ../frontend
npm install
\`\`\`
* Create a `.env.local` file in the `frontend/` directory:
\`\`\`env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`
* Start the Vite development server:
\`\`\`bash
npm run dev
\`\`\`

### 4. Database Setup
* Run the SQL statements found in `supabase/schema.sql` in your Supabase SQL Editor to generate the `issues` and `issue_verifications` tables.

---
*Built for the Vibe2Ship Hackathon 2026*