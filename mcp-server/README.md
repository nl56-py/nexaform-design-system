# Nexaform CMS MCP Server

A Model Context Protocol (MCP) server for the **Nexaform CMS**, enabling AI agents (Antigravity, Claude, Codex, Cursor, Continue) to manage content, leads, job listings, and media assets stored in Supabase.

---

## Capabilities & Available Tools

### 1. Media & Photo Management (`admin-media` Bucket)
- **`cms_upload_media`**: Upload an image/asset from a local computer file path, a remote URL, or base64 data to Supabase Storage. Returns the public CDN URL to attach to articles or projects.
- **`cms_list_media`**: List uploaded assets stored in a specific folder (e.g., `blogs`, `projects`).

### 2. Blog Posts (`blog_posts`)
- **`cms_list_blogs`**: List posts with status filters (`all`, `published`, `draft`), category, search, and pagination.
- **`cms_get_blog`**: Fetch full content (HTML or Markdown) and metadata by post `id` or `slug`.
- **`cms_create_blog`**: Draft or publish an article with title, excerpt, content, tags, and cover image.
- **`cms_update_blog`**: Update existing post fields, edit content, replace cover image, or toggle publish state.
- **`cms_delete_blog`**: Permanently remove a blog post by ID.

### 3. Portfolio & Case Studies (`case_studies`)
- **`cms_list_projects`**: List showcase projects and case studies ordered by `display_order`.
- **`cms_get_project`**: Retrieve detailed project write-up by `id` or `slug`.
- **`cms_create_project`**: Create a new showcase item with outcome metrics, industry, tags, and mockup image.
- **`cms_update_project`**: Update project details, order, or publish status.

### 4. Careers & Job Applications (`job_positions` & `job_applications`)
- **`cms_list_jobs`**: List open career positions.
- **`cms_create_job`**: Create and publish a new job opening.
- **`cms_list_applications`**: Review candidate applications with filter by position or status.
- **`cms_update_application_status`**: Update applicant status (`reviewing`, `interview`, `rejected`, `offered`) and append internal evaluation notes.

### 5. Leads & Inquiries
- **`cms_list_contact_submissions`**: List contact form leads and project inquiries.
- **`cms_update_contact_status`**: Mark leads as `new`, `contacted`, or `archived`.
- **`cms_list_audit_requests`**: View submitted free design/UX audit requests.
- **`cms_update_audit_status`**: Update audit request status and notes.

---

## Setup & Configuration

### Prerequisites
1. **Node.js** 18+ (tested on Node v22).
2. **Supabase Service Role Key** (required for writing content and uploading to storage).
   - Go to [Supabase Dashboard](https://supabase.com/dashboard) → **Project Settings** → **API**.
   - Copy the **`service_role` (secret)** key.

---

### Connecting to Clients

#### 1. Google Antigravity
Already pre-configured in `.agents/mcp_config.json` at your project root:
```json
{
  "mcpServers": {
    "nexaform-cms": {
      "command": "node",
      "args": ["g:/nexaform-design-system/mcp-server/dist/index.js"],
      "env": {
        "SUPABASE_URL": "https://ljjlopuelwbwpwxtzhpa.supabase.co",
        "SUPABASE_SERVICE_ROLE_KEY": "YOUR_SERVICE_ROLE_KEY"
      }
    }
  }
}
```

#### 2. Claude Desktop
Add to `%APPDATA%\Claude\claude_desktop_config.json` (Windows) or `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS):
```json
{
  "mcpServers": {
    "nexaform-cms": {
      "command": "node",
      "args": ["G:\\nexaform-design-system\\mcp-server\\dist\\index.js"],
      "env": {
        "SUPABASE_URL": "https://ljjlopuelwbwpwxtzhpa.supabase.co",
        "SUPABASE_SERVICE_ROLE_KEY": "YOUR_SERVICE_ROLE_KEY"
      }
    }
  }
}
```

#### 3. Cursor
1. Go to **Settings** → **Features** → **MCP**.
2. Click **Add New MCP Server**.
3. Name: `nexaform-cms`
4. Type: `command`
5. Command: `node g:/nexaform-design-system/mcp-server/dist/index.js`
6. Add environment variables:
   - `SUPABASE_URL`: `https://ljjlopuelwbwpwxtzhpa.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY`: `<YOUR_KEY>`

#### 4. Continue (VS Code)
Configured in `.continue/mcpServers/nexaform-cms.yaml`.

---

## Building & Developing

From the `mcp-server` directory:

```bash
# Install dependencies
npm install

# Compile TypeScript to dist/
npm run build

# Start server directly
npm start

# Run in dev mode with hot reload
npm run dev
```

Or from the project root:
```bash
npm run mcp:build
npm run mcp:start
```

---

## Remote Cloud Deployment & Multi-Device Access (SSE / HTTP)

You can deploy this MCP server to **Railway**, **Render**, **Fly.io**, or any VPS using Docker or Node.js.

### 1. Run Remotely
```bash
# Start the HTTP/SSE remote server on port 3001
npm run start:remote
```

### 2. Endpoints
- **SSE Stream**: `GET /sse` (Supports `Authorization: Bearer <MCP_API_KEY>` or `?apiKey=<MCP_API_KEY>`)
- **JSON-RPC Message**: `POST /message?sessionId=<SESSION_ID>`
- **Health Check**: `GET /health`

### 3. Deploy to Railway or Render
1. Connect your repository to [Railway.app](https://railway.app) or [Render.com](https://render.com).
2. Set the build and start commands (or use the included `Dockerfile`):
   - **Root directory**: `mcp-server`
   - **Build Command**: `npm ci && npm run build`
   - **Start Command**: `npm run start:remote`
3. Configure Environment Variables in the cloud dashboard:
   - `SUPABASE_URL`: `https://ljjlopuelwbwpwxtzhpa.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY`: `<YOUR_SERVICE_ROLE_KEY>`
   - `MCP_API_KEY`: `<CREATE_A_SECURE_PASSWORD_OR_TOKEN>`
   - `PORT`: `3001` (or leave default for Railway/Render)

### 4. Connect from Any Device
Once deployed (e.g. `https://your-cms-mcp.up.railway.app`), you can point:
- **Cursor / Continue**: URL `https://your-cms-mcp.up.railway.app/sse?apiKey=YOUR_KEY`
- **Mobile Chat / Telegram Bot**: Connect an AI assistant that can call the SSE or HTTP tools.
- **GitHub Actions Cron**: Trigger automated publication workflows on a schedule.

---

## Example Chat Prompts for LLMs

Once connected, you can manage your website through conversational prompts:

- **Create a blog with a photo**:
  > *"Upload the image at `C:\Users\Dell\Pictures\design-tokens.png` as a blog cover, then create a published article titled 'Mastering Design Tokens in 2026' explaining color token hierarchies."*

- **Update content**:
  > *"Find the blog post with slug 'mastering-design-tokens-2026', append a troubleshooting section about CSS custom properties, and update it."*

- **Screen candidates**:
  > *"List all recent applications for the Senior Frontend Engineer opening and summarize their experience levels."*

- **Lead triage**:
  > *"Show me all contact submissions from this week. For any inquiry with budget > $10,000, draft a suggested reply email."*
