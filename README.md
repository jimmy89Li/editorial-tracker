# Editorial Tracker

A lightweight editorial workflow system for managing content.

## Getting Started

### Clone the repository

```bash
git https://github.com/jimmy89Li/editorial-tracker
cd editorial-tracker
```

### Start the backend

```bash
cd server
npm install
npm run dev
```

The backend will be running at `http://localhost:3000`

### Start the frontend

```bash
cd client
npm install
npm run dev
```

The frontend can be found at `http://localhost:5173`

## Hardcoded Users

- **Editor**
  - Email: `editor@example.com`
  - Password: `EditorPassword!`
- **Contributor**
  - Email: `contributor@example.com`
  - Password: `ContributorPassword!`

## Content Model

```json
{
  "id": 1,
  "title": "Breaking news",
  "status": "Draft",
  "authors": ["editor@example.com"],
  "deadline": "2025-04-24",
  "type": "Article"
}
```

## Assumptions & Notes

- No real database used (all content is hardcoded and mocked)
- Authentication is purely simulated

## To Do

- Replace mocked data with real DB
- Add user management
