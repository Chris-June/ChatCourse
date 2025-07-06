# Chat App Monorepo

This is a monorepo for a chat application, consisting of a web-based frontend and a backend API. This guide will walk you through setting up the project, even if you are new to development.

## Project Structure

This project is a monorepo managed with pnpm workspaces. The structure is as follows:

```
.
├── api
├── apps
│   └── web
├── packages
├── .env.example
├── package.json
└── pnpm-workspace.yaml
```

-   `api`: Contains the backend API service.
-   `apps/web`: Contains the frontend web application.
-   `packages`: Intended for shared code between the applications (currently empty).

## Getting Started: A Beginner's Guide

This guide will walk you through the entire setup process, from installing the necessary tools to running the application.

### 1. Install Prerequisites

First, you need to install a few tools on your computer.

-   **Node.js:** This is a JavaScript runtime that lets you run JavaScript code outside of a web browser. 
    -   [Download and install Node.js (LTS version is recommended)](https://nodejs.org/en/download/)

-   **pnpm:** This is a fast and efficient package manager for Node.js projects.
    -   After installing Node.js, open your terminal (on Mac, you can find it in `Applications/Utilities/Terminal`) and run the following command to install pnpm:
        ```bash
        npm install -g pnpm
        ```

-   **Visual Studio Code (VSCode):** This is a free and popular code editor that will help you work with the project files.
    -   [Download and install VSCode](https://code.visualstudio.com/download)

### 2. Set Up the Project

Now that you have the tools, let's get the project code and set it up.

1.  **Clone the Repository:**
    -   Open VSCode.
    -   Go to the "Source Control" tab on the left-hand side (it looks like a branching icon).
    -   Click on "Clone Repository" and paste the following URL:
        ```
        git@github.com:Chris-June/Chat.git
        ```
    -   Choose a location on your computer to save the project.

2.  **Open the Project in VSCode:**
    -   Once cloning is complete, VSCode will ask if you want to open the cloned repository. Click "Open".

3.  **Open the Integrated Terminal:**
    -   In VSCode, go to the top menu and select `Terminal > New Terminal`.
    -   This will open a command line at the bottom of the VSCode window, already in your project's directory.

4.  **Install Dependencies:**
    -   In the integrated terminal, type the following command and press Enter. This will download all the necessary libraries for the project.
        ```bash
        pnpm install
        ```

### 3. Configure Environment Variables

Environment variables are used to store sensitive information like API keys.

1.  **Create the `.env.local` file:**
    -   In the VSCode terminal, run this command to copy the example environment file:
        ```bash
        cp .env.example .env.local
        ```
    -   You will see a new file named `.env.local` appear in the file explorer on the left side of VSCode.

2.  **Add your API Key:**
    -   Click on the `.env.local` file to open it.
    -   You will need an API key from OpenAI. If you don't have one, you can get it from the [OpenAI Platform](https://platform.openai.com/account/api-keys).
    -   In the `.env.local` file, replace `your-openai-api-key` with your actual OpenAI API key.

    ```
    # .env.local

    # Required
    OPENAI_API_KEY=your-openai-api-key

    # Optional
    OPENAI_ORG_ID=
    OPENAI_MODEL=gpt-4.1-nano
    DEFAULT_TEMPERATURE=0.7
    DEFAULT_TOP_P=0.9
    MAX_TOKENS=512
    ```

### 4. Run the Application

Now you are ready to start the application!

-   In the VSCode integrated terminal, run the following command:
    ```bash
    pnpm dev
    ```
-   This will start both the frontend and backend servers. You will see some output in the terminal. Once it's ready, you can open your web browser and navigate to the local address provided in the terminal (usually `http://localhost:5173`) to see the chat application running.

## Available Scripts

In the root of the project, you can run the following scripts:

-   `pnpm dev`: Starts the development servers for both the `web` app and the `api` concurrently.
-   `pnpm build`: Builds the `web` app for production.
-   `pnpm lint`: Lints the codebase using ESLint.
-   `pnpm format`: Formats the code using Prettier.

## Packages and Applications

### `apps/web`

This is the frontend application built with React (Vite). It provides the user interface for the chat application.

### `api`

This is the backend API that handles the chat logic, likely by interacting with the OpenAI API. It is a Node.js service, likely a serverless function, as suggested by the `handler.ts` file.

## Contributing

Contributions are welcome! This is an open-source project, and I welcome any contributions you may have. For creating your very own version of this project, please follow the instructions in this `README.md` file.

### System Prompt

The system prompt is stored in the `api` package in the `handler.ts` file. You can modify it there. The "System Prompt" is the place to set the AI model overall behavior and gives the user control over the AI model. You can test this by making small modification to the existing system prompt and then running the application. 

Current system prompt found in `api/handler.ts` on line 129:

```
You are Intelli-Chat, a helpful and friendly AI assistant. Your responses should be concise, informative, and aim to assist the user with their requests.
```

### Custom Instructions

Custom Instructions let you define a **standing system prompt** that is automatically injected into every new conversation. They’re split into two persistent fields:

| Field | Purpose | Typical content |
|-------|---------|-----------------|
| **What would you like your AI model to know about you?** | this gives the AI model context that rarely changes. | Name, role, current projects, brand voice, recurring goals |
| **How would you like your AI model to respond?** | this gives the AI model constraints on:
- style, 
- tone, 
- format, 
- depth, 
- length, etc. | “Answer like a serious friend, keep humour subtle, prefer bullet lists, cite sources.” |

Because these 2 Prompts *System Prompt and Custom Instructions* sit high in the prompt stack (right after the platform’s own system prompts), they influence every reply unless you override them later.

### Prompt Stack Order

1. OpenAI policy / safety prompt  **Cannot be modified or changed**
2. Default model persona / System Prompt **Can be modified or changed in the code `handler.ts`file**
3. **Your Custom Instructions** Can be found in the User Interface **Settings > Custom Instructions** and Can be modified or changed in the User Interface **Settings > Custom Instructions**
4. Any stored Memories  **Not yet implemented**
5. Conversation history  **Conversation history uses local storage (your browser) if your clear your browser data the conversation history will be lost** Data persistence is not yet implemented and will be added in the future learning by integration with a database or cloud storage using Supabase (Free) or Firebase (Paid). Both versions have a VectorDB (Qdrant) integration for data persistence and semantic search. 
6. Your latest user message  

### Practical Effects

| Influence | Mechanics | Result |
|-----------|-----------|--------|
| **Conditioning** | The model is conditioned on the text, raising the probability of tokens that match your requested style and lowering conflicting ones. | Responses automatically match your preferred tone and format. |
| **Constraint satisfaction** | Instruction‑tuning makes the model favour higher‑level directives. | You don’t have to repeat formatting or persona instructions every time. |
| **Long‑term consistency** | Custom Instructions persist across sessions. | Every new chat starts “in character.” |
| **Token cost** | Custom Instructions counts toward the context window. | Extremely long Custom Instructions reduces space for conversation. |
| **Conflict resolution** | Newer Custom Instructions override older ones (except safety). | You can change tone mid‑chat by giving a new explicit instruction. |

### Crafting Effective Custom Instructions

1. **Be concise** – aim for ≤ 150 words per field.  
2. **Separate facts from style** – keep stable info in the first field, presentation rules in the second.  
3. **Avoid contradictions** – e.g., don’t ask for both “terse” and “500‑word minimum.”  
4. **Use clear imperatives** – “Use APA citations” works better than polite requests.  
5. **Iterate** – tweak wording if the assistant drifts from the desired behaviour.  

> **Tip:** Custom Instructions can’t override platform policy. Requests that violate policy will still be blocked regardless of your instructions.

### Changing Models

Models can be changed in the UI by modifying the `DEFAULT_MODEL` environment variable in the `.env.local` file. The `ALLOWED_MODELS` environment variable in the `.env.local` file can be used to limit the models that are available in the UI. The `DEFAULT_MODEL` environment variable in the `.env.local` file can be used to set the default model.

## License

This project is licensed under the MIT License.

# Intelli‑Chat Community Build (No‑Code Edition)

**Welcome!** This guide is written for absolute beginners—people who have *never* coded before and have only a fuzzy idea of what “AI” is. Follow the steps below and you’ll have your own private AI chat website running on your computer in less than 30 minutes.

---

## 1. What You’re Getting

- A **chat website** (like ChatGPT) that runs locally on your machine.  
- A **private build space** where you can experiment without the whole internet watching.  
- The freedom to **fork** (make your own copy) and share ideas with friends.

No complex maths, no mysterious jargon—just clear instructions.

---

## 2. Three Tools to Install (All Free)

| Tool | Why you need it | How to install |
|------|-----------------|----------------|
| **Node.js** | Lets your computer run the chat program. | [Download Node.js (LTS)](https://nodejs.org/en/download/) and run the installer—click “Next” until it finishes. |
| **pnpm** | Fetches the extra bits the project needs. | After Node installs, open **Terminal** (Mac) or **Command Prompt** (Windows) and type:<br>`npm install -g pnpm` |
| **Visual Studio Code (VS Code)** | A friendly text editor to open the project. | [Download VS Code](https://code.visualstudio.com/) and install it. |

*Tip: “Terminal” is just a text window where you can type commands. Don’t panic—we’ll tell you exactly what to type.*

---

## 3. Get the Project Code

### Option A – The Simple Download

1. Visit the project page and click **“Download ZIP.”**  
   `https://github.com/Chris-June/Chat`
2. Un‑zip the file. You’ll get a folder called **`Chat`**.

### Option B – Use Git (skip if that word means nothing to you)

1. In VS Code choose **Source Control → Clone Repository**.  
2. Paste `git@github.com:Chris-June/Chat.git` when asked.

Either way, remember where you put the folder—you’ll need it soon.

---

## 4. Open the Project in VS Code

1. Launch VS Code.  
2. Select **File → Open Folder…** and pick the **`Chat`** folder.  
3. VS Code will ask “**Do you trust the authors?**” Click **Yes**.

---

## 5. Install the Project’s Libraries

1. In VS Code choose **Terminal → New Terminal**.  
2. A panel appears at the bottom. Copy‑paste this and press **Enter**:

```bash
pnpm install
```

Wait until the scrolling stops (≈1 minute).

---

## 6. Add Your AI Key

1. Get a free key on the OpenAI website → **[Create API Key](https://platform.openai.com/account/api-keys)**.  
2. Copy the key (looks like `sk-…`).  
3. In VS Code’s terminal, run:

```bash
cp .env.example .env.local
```

4. Open **`.env.local`** (left‑hand file list).  
5. Find `OPENAI_API_KEY=` and paste your key after the `=` sign:  

```
OPENAI_API_KEY=sk-1234567890abcdef
```

Save the file (**⌘S** or **Ctrl+S**).

---

## 7. Start Chatting!

Still in the terminal, run:

```bash
pnpm dev
```

- First start takes ~20 seconds.  
- When you see `http://localhost:5173`, **click it** (or paste it in your browser).

🎉 **That’s it!** Type a message and watch the AI reply.

---

## 8. What’s Next?

| Want to… | Do this |
|----------|---------|
| **Change the AI’s personality** | Open `api/handler.ts`, scroll to the *System Prompt* near the end, and rewrite the text inside quotes. |
| **Tweak responses (tone, format)** | In the chat site, click **Settings → Custom Instructions**. |
| **Invite friends to play** | Send them this README. |
| **Learn the techy stuff** | Expand the **Advanced Section** below (totally optional). |

---

## 9. Glossary (Plain‑English)

| Term | Simple meaning |
|------|----------------|
| **AI** | Software that predicts text responses. |
| **API key** | Secret password that lets your app talk to OpenAI. |
| **Terminal / Command Prompt** | A text box for giving your computer instructions. |
| **Install** | Put new software on your computer. |
| **pnpm install** | Download all the pieces the project needs. |
| **Localhost** | Fancy word for “my own computer.” |
| **Fork** | Make your own copy of someone’s project on GitHub. |

---

## 10. Advanced Section (Developers & Curious Cats)

<details>
<summary>Click to expand</summary>

### Project Structure
```
/ (root)
├─ api          – backend chat logic
├─ apps/web     – the React website
├─ packages     – shared code (empty for now)
└─ …
```

### Available Scripts
| Command | What it does |
|---------|--------------|
| `pnpm dev` | Starts the site in development mode. |
| `pnpm build` | Creates an optimized production build. |
| `pnpm lint` | Checks code style. |

### Custom Instructions & Prompt Stack
See **Settings → Custom Instructions** in the website for a friendly editor. Internally the prompt order is:

1. Safety rules  
2. Default system prompt  
3. **Your Custom Instructions**  
4. Memory (if enabled)  
5. Chat history  
6. Your new message  

</details>

---

## License

MIT — do whatever you like, just keep this notice.

---

**Need help?** Open an [issue](https://github.com/Chris-June/Chat/issues) or say hi in the community Discord. Everyone started somewhere. 🙌