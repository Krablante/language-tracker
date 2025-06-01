# Language Tracker

**Language Tracker** is a simple React + TypeScript application that helps you keep track of language courses and associated lectures. It uses Firebase for authentication (Google Sign-In) and Firestore as a backend to store data. The app supports light/dark theming and toggling between English and French tabs for organizing courses.

## Features

* **Google Authentication**: Secure sign-in with Google accounts.
* **Course Management**: Create, read, update, and delete language courses.
* **Lecture Management**: For each course, create, read, update, and delete individual lectures with optional descriptions.
* **Dynamic Tabs**: Switch between English and French language tabs to filter courses by language.
* **Theme Toggle**: Switch between light and dark modes; the preference is saved to `localStorage` and applied on reload.
* **Responsive Design**: Works well on desktop and mobile devices.

## Demo

The application is deployed to Vercel and can be accessed at: [https://ltracker.vercel.app](https://ltracker.vercel.app)

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

* Node.js (v14 or later)
* npm (v6 or later)

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/<your-username>/language-tracker.git
   cd language-tracker
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Firebase**

   * Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project or use an existing one.
   * In the Project Settings, under **Your apps**, register a new web app and copy the Firebase configuration object.
   * Open `src/firebase.ts` and replace the placeholder `firebaseConfig` object with your own credentials:

     ```ts
     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
     };
     ```
   * Enable **Google** sign-in in the **Authentication** section of the Firebase Console.
   * Create two Firestore collections: `courses` and `lectures`.

4. **Run the development server**

   ```bash
   npm start
   ```

   The app will open in development mode at [http://localhost:3000](http://localhost:3000).

### Available Scripts

* `npm start` - Runs the app in development mode.
* `npm run build` - Builds the app for production into the `build` folder.
* `npm test` - Runs the test runner.
* `npm run eject` - Ejects the CRA configuration (irreversible).

## Project Structure

```
language-tracker
├── public
│   ├── index.html       # HTML template
│   ├── logo.png         # App logo/icon
│   ├── manifest.json    # PWA manifest (optional)
│   └── robots.txt       # Robots.txt file
├── src
│   ├── components       # Reusable UI components
│   │   ├── CourseForm.tsx
│   │   ├── CoursesList.tsx
│   │   ├── LectureForm.tsx
│   │   ├── LecturesList.tsx
│   │   └── Tabs.tsx
│   ├── contexts         # React context providers
│   │   ├── AuthContext.tsx
│   │   ├── CourseServiceContext.tsx
│   │   └── LectureServiceContext.tsx
│   ├── hooks            # Custom React hooks
│   │   ├── useCourses.ts
│   │   └── useLectures.ts
│   ├── services         # Abstraction for Firestore operations
│   │   ├── courseService.ts
│   │   ├── firestoreCourseService.ts
│   │   ├── lectureService.ts
│   │   └── firestoreLectureService.ts
│   ├── types.ts         # Shared TypeScript interfaces and types
│   ├── firebase.ts      # Firebase initialization/configuration
│   ├── App.tsx          # Root component (contains AuthProvider)
│   ├── MainApp.tsx      # Main application UI after login
│   ├── index.tsx        # ReactDOM entry point
│   └── index.css        # Global and theme styles
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md            # This file
```

## Styling and Theming

* Uses CSS variables to define both light and dark theme values in `src/index.css`.
* The `data-theme` attribute on the `<html>` element toggles between `"light"` and `"dark"`.
* Components use `var(--variable-name)` throughout for colors, backgrounds, and borders.

## Deployment to Vercel

1. **Push your code to GitHub** (or another Git provider).
2. **Connect your repository** on [Vercel](https://vercel.com/) (select the Git provider and the project).
3. **Configure Environment Variables** on Vercel (if any).
4. **Deploy** using the default build command `npm run build` and output directory `build`.

That's it! Your app will be live at `https://<your-project-name>.vercel.app`.

## Contributing

Feel free to open issues or submit pull requests. Ensure your code follows the existing style, and include any relevant tests.

## License

This project is open source and available under the [MIT License](LICENSE).
