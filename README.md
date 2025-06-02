# Language Tracker

**Language Tracker** is a lightweight React + TypeScript application for tracking language‑learning courses (English & French) and their lectures. It uses **Firebase** for Google authentication and Firestore as a realtime backend.

![Language Tracker Screenshot](public/logo.png)

---

## ✨ Key Features

| Category      | Feature                                                                                                                                      |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Auth**      | Google Sign‑In (OAuth2)                                                                                                                      |
| **Courses**   | • Add / edit / delete courses<br>• *Accordion* view – one course expanded at a time<br>• **Drag & Drop** re‑ordering (powered by `@dnd-kit`) |
| **Lectures**  | Add / edit / delete lectures inside each course                                                                                              |
| **UI / UX**   | Light / Dark themes, saved to `localStorage`                                                                                                 |
| **Data Sync** | All changes are stored instantly in Firestore and reflected in real‑time on every device                                                     |

---

## 🚀 Live Demo

👉 [https://ltracker.vercel.app](https://ltracker.vercel.app)

---

## 🛠 Installation

### Prerequisites

* **Node.js** ≥ 14<br>
* **npm** ≥ 6

### Steps

```bash
# 1. Clone the repo
$ git clone https://github.com/<your‑username>/language-tracker.git
$ cd language-tracker

# 2. Install dependencies (incl. drag‑and‑drop libs)
$ npm install

# 3. Add Firebase credentials
#    → copy your config into src/firebase.ts

# 4. Run dev server
$ npm start
```

> **New packages** (added for drag & drop)
>
> ```bash
> npm i @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities @dnd-kit/modifiers
> ```

---

## 🔧 Firebase Setup

1. In the [Firebase Console](https://console.firebase.google.com/) create or select a project.
2. Register a **Web App** and copy the configuration object into `src/firebase.ts`.
3. Enable **Google** authentication.
4. Create collections:

   * `courses`
   * `lectures`

---

## 📂 Project Structure (excerpt)

```
src
├── components
│   ├── CourseForm.tsx          # add a course
│   ├── CoursesList.tsx         # accordion + drag‑and‑drop
│   ├── LectureForm.tsx
│   └── LecturesList.tsx
├── services
│   ├── firestoreCourseService.ts # includes `order` field
│   └── firestoreLectureService.ts
└── …
```

---

## 📝 Contributing

Pull requests are welcome – please follow the existing code style and include tests where relevant.

---

## License

MIT © 2025
