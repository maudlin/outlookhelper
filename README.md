# Outlook Helper – Outlook Add-in + wrapper for AI agents

An experimental Outlook add-in that reads the body of a selected email and proposes AI-generated reply suggestions using a custom backend or Azure AI Foundry.

Check pattern.md for more on the Office + AI Orchestrator Pattern we're introducing

Check the Microsoft site for more information on developing devcontainers: https://learn.microsoft.com/en-us/office/dev/add-ins/outlook/one-outlook
---

## 🔧 Features

- Outlook task pane add-in
- Reads email subject and body (and metadata where appropriate)
- Sends to AI endpoint for response suggestions
- Secure HTTPS dev server via Yeoman + Webpack
- Runs inside a VS Code devcontainer (with manual sideloading)
- Basic custom UI scaffold with Tailwind styling

---

## 🚀 Getting Started (in Devcontainer)

We use a devcontainer to make this demo easy and self contained to work with. It can run inside VS Code

### 1. Clone and Open in VS Code

```bash
git clone https://github.com/yourname/smart-reply-assistant.git
cd smart-reply-assistant
code .
```

VS Code will prompt you to reopen in the devcontainer.

### 2. Open in Devcontainer

From the Command Palette:
```
Dev Containers: Reopen in Container
```

Once the container is built and open, continue below.

### 3. Start the Dev Server (in devcontainer terminal)

```bash
cd office-helper
npm install
npm run dev-server
```

This serves your add-in via Webpack + HTTPS at:
```
https://localhost:3000/taskpane.html
```
Confirm it loads correctly in a **Windows browser**.

---

## 🧩 Sideload into Outlook Web (Manual Step Required)

Since sideloading via CLI isn't supported in Linux containers (the devcontainer), do the following manually:

1. Open [https://outlook.office.com](https://outlook.office.com)
2. Click ⚙️ Settings → **View all Outlook settings**
3. Navigate to:
   - Mail → Customize actions → Add-ins
4. Scroll to **Custom Add-ins**
5. Click **Add a custom add-in > Add from file...**
6. Browse to and select the `manifest.xml` inside `office-helper/`

> Your add-in should now appear when reading a message, if the activation rules match.

---

## 📁 Project Structure

```
.
├── .devcontainer/            # VS Code container config
└── office-helper/
    ├── manifest.xml          # Outlook manifest
    ├── package.json          # Yeoman-generated server + scripts
    ├── webpack.config.js
    └── src/                  # The actual source served by the dev web server
        ├── taskpane/
        │   ├── taskpane.html  # Add-in interface
        │   ├── taskpane.js    # JS logic (TBD)
        │   └── taskpane.css   # Tailwind-enabled styling
        └── commands/
            ├── commands.html
            └── commands.js
```

---

## 🧠 To-Do / Next Steps

- Confirm basic task pane loads inside Outlook
- Customize placeholder UI using Tailwind CSS
- Add MSAL authentication (optional)
- Connect to Azure AI Foundry agent
- Call external case management APIs for enriched replies

---

## 🛡️ Security Notes

- This dev server uses auto-trusted HTTPS via `dev-certs`
- Production deployments must use valid TLS certificates and CSP headers

## Product Principles
- Invite Collaboration, Not Automation

Frame the AI as a helpful assistant, not a decision-maker.

- Progressive Trust

Start with suggestions, not actions. Let users opt-in to deeper automation.

- Zero-Effort Interaction

If it’s not helpful in <3 seconds, it’s a failure.

- Default to Visibility

Always show what’s happening and why, especially if you enrich from external data.


