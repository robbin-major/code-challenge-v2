💬 Final Thoughts

One thing I also learned during this project is that I don’t always need a powerful local setup to build and debug applications.

In the past, I thought I needed to install everything (like Docker) directly on my computer. But because of storage limitations and my experience from coding bootcamp, I realized I could use cloud-based environments like GitHub Codespaces instead. That made it possible for me to fully run and complete this project without being blocked by my machine.

That was honestly empowering.

This project also reminded me that even though I don’t identify as a traditional coder, I am a developer. I’ve built products, I solve problems, and I find ways to bring ideas to life. Tools like AI helped me bridge gaps in syntax while still requiring me to think critically, debug, and understand what was happening.

I really appreciated that this challenge openly allowed the use of AI. It didn’t make the work easier, it made it more accessible, and it encouraged real problem-solving instead of memorization.

Working through this has inspired me to continue building my own app and explore how I can use AI tools to automate parts of my workflow, especially around event data. It made me realize that even without a big budget, I can still make progress by combining my ideas with the tools available to me.

It would truly be an honor to work for a company that sees everyone as a developer and is focused on building things that have a positive impact.


📍 2026 DataMade Code Challenge
🧠 Overview

This project visualizes restaurant permits across Chicago community areas using an interactive map. Users can filter by year, and each area is colored based on the number of permits issued.

🚀 How to Run the Project

Start the app
docker compose up --build

Restart if needed
docker compose restart app

Rebuild if things break
docker compose down
docker compose up --build

Build frontend manually
npm run build

⚠️ Important Ports Lesson (BIG ONE)

At one point, I kept switching everything to port 3000, but the app actually runs on:

http://localhost:8000

👉 This caused confusion because:

frontend and backend were mismatched
requests were failing silently

Fix: Always confirm the correct port before debugging anything else.

🗺️ Key Features Implemented

Year filter dropdown
GeoJSON map of Chicago community areas
Hover interaction with permit counts
Dynamic color scaling based on permit density
Data fetched from backend endpoint

🧩 Key Problems I Solved

1. ❌ return outside function
Cause: extra } closed the function too early
Fix: removed stray bracket so return stayed inside component

2. ❌ layer is not defined
Cause: using layer outside setAreaInteraction
Fix: moved all layer logic inside the function

3. ❌ All permits showing 0
Cause: data hadn’t loaded yet when map rendered
Fix:
key={`${year}-${currentYearData.length}`}

This forces React to re-render GeoJSON after data loads

4. ❌ Data matching failed
Fix:
(area) =>
  area.name?.trim().toUpperCase() ===
  feature.properties.community?.trim().toUpperCase()

5. ❌ OpenStreetMap “Access blocked”
Cause: tile server rejecting requests
Fix:
url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"


🧠 My Process (Important)

This did NOT take 2 hours.

It took closer to:

~16–24 hours total
including debugging, breaks, and real life

What helped me:

Taking screenshots of errors
Logging data (console.log)
Fixing ONE problem at a time
Not guessing — actually checking what data looked like


🤝 How I Used AI

I did not copy full solutions.

Instead:

I described what I was seeing
I shared screenshots
I was guided to:
check variables
inspect data
move code into correct scope

This helped me actually understand:

React state timing
GeoJSON rendering behavior
debugging strategies


🧠 Key Takeaways

Data timing matters (React renders before fetch completes)
Scope matters (layer only exists inside its function)
Logs are your best friend
Matching strings is trickier than it looks
Don’t assume, INSPECT!




This project was challenging but rewarding. The hardest part wasn’t writing code, it was debugging and understanding how everything connects.

