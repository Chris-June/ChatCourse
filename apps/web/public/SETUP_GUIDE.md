# IDE-First Setup Guide for the Chat App

This guide provides a streamlined setup process for the Chat App Monorepo, starting from your Integrated Development Environment (IDE). It is written for non‑technical learners: follow each step in order and copy/paste the commands exactly as shown.

---

## Step 1: Choose and Install Your IDE

First, download and install a modern code editor if you don't have one already. We recommend either:

- **[Visual Studio Code](https://code.visualstudio.com/)**: A popular, free, and open-source editor.
- **[Windsurf IDE](https://www.windsurf.dev/)**: An AI-native IDE designed for team collaboration. This is what I use.


## Step 2: Get the Project Code

Instead of downloading a ZIP file, we'll clone (copy) the project directly from your IDE. If your IDE asks to install Git, approve it.

1.  Launch your IDE.
2.  Open the Command Palette:
    *   **VS Code**: `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux)
    *   **Windsurf IDE**: `Cmd+K`
3.  Type `Git: Clone` and press Enter.
4.  Paste the repository URL when prompted:
    ```
    https://github.com/Chris-June/ChatCourse.git
    ```
5.  Choose a location on your computer to save the project.
6.  Once cloning is complete, open the `ChatCourse` project folder in your IDE.

---

## Step 3: Set Up Your Environment from the Terminal

Now, we'll install Node.js and `pnpm` using the IDE's built-in terminal. This keeps everything in one place. You only need to do this once on your computer.

1.  **Open the Integrated Terminal** in your IDE:
    *   **VS Code**: Go to `Terminal` > `New Terminal`.
    *   **Windsurf IDE**: The terminal is typically open by default at the bottom.

2.  **Install Node Version Manager (nvm)** (safe & recommended):
    This tool lets you manage multiple Node.js versions easily. Paste the following command into your terminal and press Enter:

    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    ```
    
    **Important**: After it finishes, you must **close and reopen your terminal** for the `nvm` command to become available.
    If `nvm` is still not found, fully quit and reopen your IDE, then open a fresh terminal.

3.  **Install and Use Node.js**:
    Now, use `nvm` to install the recommended Long-Term Support (LTS) version of Node.js.

    ```bash
    nvm install --lts
    nvm use --lts
    ```

4.  **Install pnpm** (our package manager):
    This project uses `pnpm` for efficient package management. Install it globally with this command:

    ```bash
    npm install -g pnpm
    ```

---

## Step 4: Install Project Dependencies

With all the tools in place, you can now install the project's libraries. In the same terminal, run:

```bash
pnpm install
```

This will download all the necessary packages for the web app and API. Wait for it to complete (it may take a minute or two). If you see errors about missing permissions on macOS, try running the same command again.

---

## Step 5: Configure Your API Key

To connect to the AI model, you need an API key.

1.  Get an API key from the OpenAI website: **[Create API Key](https://platform.openai.com/account/api-keys)**. Keep this secret.
2.  In your terminal, create a local environment file by copying the example file (the dot in `.env.local` is intentional):

    ```bash
    cp .env.example .env.local
    ```

3.  In the IDE's file explorer, find and open the newly created `.env.local` file.
4.  Paste your API key after `OPENAI_API_KEY=` (no spaces).

    ```
    OPENAI_API_KEY=sk-YourSecretKeyGoesHere
    ```

5.  Save the file. You do not need to restart anything for local development.

---

## Step 6: Run the Application

You're all set! To start the application, run the following command in your terminal:

```bash
pnpm dev
```

Wait for the process to finish. Once you see a message like `➜ Local: http://localhost:5173`, you can **Cmd+click** (or **Ctrl+click**) the link to open the chat application in your browser.
    If the page is blank, try a hard refresh (Shift + Reload) or open the link in a new tab.

🎉 **Happy coding!**
