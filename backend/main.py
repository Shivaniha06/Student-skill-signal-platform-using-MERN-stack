import os
import asyncio
import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/analyze/{username}")
async def analyze_user(username: str):
    headers = {"Authorization": f"token {GITHUB_TOKEN}"} if GITHUB_TOKEN else {}
    
    async with httpx.AsyncClient() as client:
        try:
            u_req = client.get(f"https://api.github.com/users/{username}", headers=headers)
            r_req = client.get(f"https://api.github.com/users/{username}/repos?per_page=100", headers=headers)
            user_res, repo_res = await asyncio.gather(u_req, r_req)

            if user_res.status_code != 200:
                raise HTTPException(status_code=404, detail="User not found")
            
            user_data = user_res.json()
            repos = repo_res.json()
        except Exception:
            raise HTTPException(status_code=500, detail="API Error")

    # 1. Calculate stats
    stars_factor = sum(r.get("stargazers_count", 0) for r in repos)
    forks_factor = sum(r.get("forks_count", 0) for r in repos)
    points = (stars_factor * 10) + (forks_factor * 5) + (user_data.get("public_repos", 0) * 2) + 2100 
    
    langs = {}
    repo_list = []
    for r in repos:
        l = r.get("language") or "Other"
        langs[l] = langs.get(l, 0) + 1
        repo_list.append({
            "name": r["name"],
            "description": r["description"] or "No description provided.",
            "stars": r["stargazers_count"],
            "forks": r["forks_count"],
            "language": l,
            "url": r["html_url"],
            "visibility": "Public" if not r.get("private") else "Private"
        })

    # 2. Determine Top Language BEFORE the summary
    top_lang = max(langs, key=langs.get) if langs else "N/A"

    # 3. Create the text summary
    summary = (f"Developer @{user_data['login']} is highly proficient in {top_lang}, "
               f"achieving an impact score of {points}. They manage {user_data.get('public_repos')} "
               f"repos with {stars_factor} stars.")

    return {
        "user": user_data["login"],
        "avatar": user_data["avatar_url"],
        "followers": user_data.get("followers", 0),
        "repo_count": user_data.get("public_repos", 0),
        "top_lang": top_lang,
        "points": points,
        "stars_factor": stars_factor,
        "impact_factor": forks_factor,
        "repos": repo_list,
        "summary": summary # Now returned to Frontend
    }