# Go-to! — Personal Dashboard

[![Build and Deploy](https://github.com/priyadarsanmahendiran/Goto-Web-/actions/workflows/build.yml/badge.svg)](https://github.com/priyadarsanmahendiran/Goto-Web-/actions/workflows/build.yml)

A personal web dashboard for managing your daily thoughts, tasks, and expenses — built as a single-page application with Vue 3, Firebase v9, and a dark glassmorphic UI.

## Features

- **Authentication** — Email/password sign-in, registration, and password reset via Firebase Auth
- **Personal Diary** — Write encrypted diary entries (AES-256-GCM) with photo and video uploads
- **Collaborative Diary** — Create or join shared books for group journaling with encrypted entries
- **To-Do / Events** — Track upcoming and pending events with due dates
- **Expense Tracker** — Set budgets, add categorized expenses, and view spending history
- **Responsive Dark UI** — Glassmorphic design with Bootstrap 5 and custom CSS

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Vue 3 (Composition API) |
| Build Tool | Vite |
| Router | Vue Router 4 |
| Backend | Firebase v9 (Auth, Realtime Database, Storage) |
| Styling | Bootstrap 5 + Custom CSS |
| CI/CD | GitHub Actions |

## Project Structure

```
├── src/
│   ├── views/           # Page components (18 pages)
│   ├── components/      # Reusable components (Navbar, Snackbar)
│   ├── composables/     # Shared logic (useAuth, useSnackbar)
│   ├── utils/           # Crypto utilities (AES-256-GCM)
│   ├── firebase.js      # Firebase v9 modular config
│   ├── router.js        # Vue Router configuration
│   └── main.js          # App entry point
├── public/              # Static assets (images, icons)
├── dist/                # Production build output
├── index.html           # SPA entry HTML
├── vite.config.js       # Vite configuration
├── firebase.json        # Firebase Hosting configuration
└── .github/workflows/   # GitHub Actions CI/CD
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Firebase CLI](https://firebase.google.com/docs/cli) (for local deploy testing)

### Installation

```bash
# Clone the repository
git clone https://github.com/priyadarsanmahendiran/Goto-Web-.git
cd Goto-Web-

# Install dependencies
npm install
```

### Local Development

```bash
# Create local environment file from template
cp .env.example .env
# Edit .env with your Firebase project credentials

# Start dev server
npm run dev
```

The dev server will start at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder.

### Deploy

```bash
# Deploy dist/ to Firebase Hosting
firebase deploy --only hosting
```

Or let GitHub Actions handle it automatically on every push to `master`.

## Firebase Configuration

This project uses environment variables for Firebase configuration. The values are injected at build time.

### Required Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_FIREBASE_API_KEY` | Firebase API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth domain |
| `VITE_FIREBASE_DATABASE_URL` | Realtime Database URL |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Cloud Storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Cloud Messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |
| `VITE_FIREBASE_MEASUREMENT_ID` | Google Analytics measurement ID |

### GitHub Actions Secrets

For CI/CD deployment, add these as **Repository Secrets** in:

`Settings → Secrets and variables → Actions → New repository secret`

| Secret | Value |
|--------|-------|
| `FIREBASE_API_KEY` | Your Firebase API key |
| `FIREBASE_AUTH_DOMAIN` | `your-project.firebaseapp.com` |
| `FIREBASE_DATABASE_URL` | `https://your-project.firebaseio.com` |
| `FIREBASE_PROJECT_ID` | Your project ID |
| `FIREBASE_STORAGE_BUCKET` | `your-project.appspot.com` |
| `FIREBASE_MESSAGING_SENDER_ID` | Sender ID |
| `FIREBASE_APP_ID` | App ID |
| `FIREBASE_MEASUREMENT_ID` | Measurement ID |
| `FIREBASE_TOKEN` *(optional)* | CI token from `firebase login:ci` |

## Routes

| Route | Page | Auth Required |
|-------|------|---------------|
| `/login` | Sign In | No |
| `/register` | Create Account | No |
| `/forgot-password` | Reset Password | No |
| `/dashboard` | Home Dashboard | Yes |
| `/diary` | Diary Hub | Yes |
| `/diary/personal` | Personal Diary | Yes |
| `/diary/personal/write` | Write Entry | Yes |
| `/diary/personal/memories` | View Memories | Yes |
| `/diary/collab` | Collaborative Diary | Yes |
| `/diary/collab/book` | Book Login | Yes |
| `/diary/collab/write` | Write Collab Entry | Yes |
| `/diary/collab/display` | View Collab Book | Yes |
| `/todo` | View Tasks | Yes |
| `/todo/add` | Add Task | Yes |
| `/expenses` | Expense Hub | Yes |
| `/expenses/budget` | Set Budget | Yes |
| `/expenses/add` | Add Expense | Yes |
| `/expenses/view` | View Expenses | Yes |

## Security Notes

- Diary entries are encrypted client-side using **AES-256-GCM** with a key derived from the user's UID via PBKDF2 (100k iterations)
- Collaborative book entries are encrypted with a key derived from `bookId + bookPassword`
- The Firebase API key and configuration are injected at build time from GitHub Secrets — never committed to the repository
- `.env` and `dist/` are listed in `.gitignore`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

## License

This project is licensed under the [MIT License](LICENSE).

## Author

**Priyadarsan Mahendiran**
