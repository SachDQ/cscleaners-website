#!/usr/bin/env python3
"""
Central Sea Cleaning — Automated Blog Post Generator
Usage:
  python3 scripts/generate-blog-post.py
  python3 scripts/generate-blog-post.py --topic "Spring cleaning tips for Melbourne homes"
  python3 scripts/generate-blog-post.py --topic "..." --push   # auto-commit and push

Requires: ANTHROPIC_API_KEY environment variable (or set inline below)
"""

import os, sys, json, re, urllib.request, urllib.error, datetime, subprocess, argparse

# ── Config ────────────────────────────────────────────────────────────────────
ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")
REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
POSTS_DIR = os.path.join(REPO_ROOT, "content", "posts")
GITHUB_PAT = os.environ.get("GITHUB_PAT", "")  # Set via: export GITHUB_PAT=ghp_...

CATEGORIES = ["Bond Cleaning", "Guides", "Eco Cleaning", "Home Tips",
               "Specialist Cleaning", "Commercial", "Spring Cleaning",
               "Deep Cleaning", "Seasonal"]

BLOG_IMAGES = {
    "Bond Cleaning":       "/images/06_end_of_lease.png",
    "Guides":              "/images/10_cleaner_portrait.png",
    "Eco Cleaning":        "/images/20_blog_eco_products.png",
    "Home Tips":           "/images/17_blog_home_habits.png",
    "Specialist Cleaning": "/images/21_blog_carpet.png",
    "Commercial":          "/images/19_blog_commercial.png",
    "Spring Cleaning":     "/images/22_blog_spring_clean.png",
    "Deep Cleaning":       "/images/24_service_bathroom_sparkle.png",
}

SYSTEM_PROMPT = """You are a content writer for Central Sea Cleaning, a Melbourne-based cleaning company.
Write factual, useful blog posts that help Melbourne residents and businesses with cleaning.
Always write in Australian English. Always mention Melbourne or Victoria where relevant.
Never use US spellings. Never be salesy — be genuinely helpful.
Central Sea Cleaning offers: residential, end-of-lease (bond), commercial, deep, builders, and specialist cleaning.
Contact: 0404 378 911 | info@cscleaners.com.au | cscleaners.com.au
"""

# ── Slug generator ────────────────────────────────────────────────────────────
def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_]+", "-", text)
    return re.sub(r"-+", "-", text)[:80]

# ── Anthropic call ────────────────────────────────────────────────────────────
def generate_post(topic: str) -> dict:
    if not ANTHROPIC_API_KEY:
        raise ValueError("ANTHROPIC_API_KEY not set. Export it before running.")

    prompt = f"""Write a comprehensive, SEO-optimised blog post for Central Sea Cleaning's website about:

TOPIC: {topic}

Return ONLY valid JSON with this exact structure (no markdown fences, no extra text):
{{
  "title": "The full SEO title",
  "slug": "url-slug-no-spaces",
  "excerpt": "2-sentence compelling summary under 160 characters",
  "category": "One of: {', '.join(CATEGORIES)}",
  "readTime": "X min",
  "htmlContent": "<p class=\\"lead\\">Opening paragraph...</p><h2>Section</h2><p>...</p>..."
}}

Rules for htmlContent:
- First paragraph MUST have class="lead"
- Use <h2> for main sections, <h3> for sub-sections
- Use <ul><li> for lists, <ol><li> for numbered steps
- Use <strong> for emphasis
- Minimum 600 words of actual content
- Include practical Melbourne-specific advice
- End with a gentle mention of Central Sea Cleaning services
- No inline styles, no div tags — just semantic HTML
"""

    payload = {
        "model": "claude-opus-4-5",
        "max_tokens": 4096,
        "system": SYSTEM_PROMPT,
        "messages": [{"role": "user", "content": prompt}]
    }

    req = urllib.request.Request(
        "https://api.anthropic.com/v1/messages",
        data=json.dumps(payload).encode(),
        headers={
            "x-api-key": ANTHROPIC_API_KEY,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
        },
        method="POST"
    )

    with urllib.request.urlopen(req) as r:
        resp = json.loads(r.read())

    raw = resp["content"][0]["text"].strip()
    # Strip any accidental markdown fences
    raw = re.sub(r"^```(?:json)?\n?", "", raw)
    raw = re.sub(r"\n?```$", "", raw)
    return json.loads(raw)

# ── Save post ─────────────────────────────────────────────────────────────────
def save_post(post: dict) -> str:
    os.makedirs(POSTS_DIR, exist_ok=True)

    # Add metadata
    now = datetime.datetime.now()
    months = ["January","February","March","April","May","June",
              "July","August","September","October","November","December"]
    post["date"] = f"{months[now.month - 1]} {now.year}"

    # Pick a relevant image
    post["image"] = BLOG_IMAGES.get(post.get("category", ""), "/images/17_blog_home_habits.png")

    slug = post.get("slug") or slugify(post["title"])
    post["slug"] = slug
    path = os.path.join(POSTS_DIR, f"{slug}.json")

    with open(path, "w", encoding="utf-8") as f:
        json.dump(post, f, indent=2, ensure_ascii=False)

    print(f"✓ Saved: content/posts/{slug}.json")
    return path

# ── Git push ──────────────────────────────────────────────────────────────────
def git_push(post: dict):
    slug = post["slug"]
    title = post["title"]

    # Update remote with GITHUB_PAT
    subprocess.run(
        ["git", "remote", "set-url", "origin",
         f"https://{GITHUB_PAT}@github.com/SachDQ/cscleaners-website.git"],
        cwd=REPO_ROOT, check=True
    )

    subprocess.run(["git", "add", f"content/posts/{slug}.json"], cwd=REPO_ROOT, check=True)
    subprocess.run(
        ["git", "commit", "-m", f"blog: add '{title}'\n\nAuto-generated by blog generator\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"],
        cwd=REPO_ROOT, check=True
    )
    subprocess.run(["git", "push"], cwd=REPO_ROOT, check=True)
    print(f"✓ Pushed to GitHub → Cloudflare Pages will deploy automatically")

# ── Main ──────────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description="Generate a blog post for Central Sea Cleaning")
    parser.add_argument("--topic", type=str, help="Blog topic (prompted interactively if omitted)")
    parser.add_argument("--push", action="store_true", help="Auto-commit and push to GitHub")
    args = parser.parse_args()

    topic = args.topic
    if not topic:
        topic = input("Blog topic: ").strip()
    if not topic:
        print("No topic provided. Exiting.")
        sys.exit(1)

    print(f"\n🤖 Generating blog post about: {topic}")
    print("   (calling Claude API...)\n")

    try:
        post = generate_post(topic)
    except urllib.error.HTTPError as e:
        print(f"API error: {e.read().decode()}")
        sys.exit(1)

    print(f"   Title:    {post['title']}")
    print(f"   Category: {post.get('category')}")
    print(f"   Est read: {post.get('readTime')}")

    path = save_post(post)

    if args.push:
        print("\n📤 Committing and pushing...")
        git_push(post)
        print("\n✅ Done! The post will be live in ~2 minutes after Cloudflare deploys.")
    else:
        print(f"\n✅ Post saved. Run with --push to deploy, or commit manually:\n   git add {path}\n   git commit -m 'blog: add post'\n   git push")

if __name__ == "__main__":
    main()
