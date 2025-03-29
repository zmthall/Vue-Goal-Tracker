# 📈 Vue Goal Tracker

A personal productivity and project tracking tool built with Vue 3, Pinia, and Tailwind CSS. This app allows users to manage full-stack projects with interactive checklists, modals, task tracking, notes, and more—all wrapped in a clean, dynamic interface.

## 🔧 Features

- 🎯 Track progress of multiple projects with weighted checklists
- 📋 Add tasks with weights, completion toggles, and progression
- 🧠 Notes and comments for each project
- 🪟 Modal system powered by `<dialog>` and Pinia
- 🧩 Modular architecture with reactivity, stores, and composables
- 🧾 Persistent project data via `pinia-plugin-persistedstate`
- 🖥 Deployed on GitHub Pages

## 📁 Tech Stack

- [Vue 3.5+](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [GitHub Pages](https://pages.github.com/) (Deployment)

## 🚀 Setup Instructions

```bash
# Clone the repository
git clone https://github.com/zmthall/Vue-Goal-Tracker.git
cd Vue-Goal-Tracker

# Install dependencies
npm install

# Start the dev server
npm run dev
```

## 🏗 Project Structure

```
Vue-Goal-Tracker/
├── src/
│   ├── assets/              # Global styles (Tailwind)
│   ├── components/          # Vue components (Base + Feature-specific)
│   ├── composables/         # Custom composable functions
│   ├── stores/              # Pinia stores
│   ├── types/               # TypeScript models and enums
│   └── views/               # Route-level views or layout components
├── public/
├── index.html
└── vite.config.ts
```

## 💾 State Persistence

Pinia is enhanced with `pinia-plugin-persistedstate` for saving project data to `localStorage`. This keeps your progress even after closing or refreshing the app.

```ts
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
```

To persist a store:

```ts
export const useProjectStore = defineStore(
  'project',
  () => {
    // ...
  },
  {
    persist: true,
  },
);
```

## 🌐 Deployment to GitHub Pages

1. Set the base path in `vite.config.ts`:

```ts
export default defineConfig({
  base: '/Vue-Goal-Tracker/',
  // ...
});
```

2. Run the deploy command:

```bash
npm run build
npm run deploy
```

3. Confirm deployment: [https://zmthall.github.io/Vue-Goal-Tracker](https://zmthall.github.io/Vue-Goal-Tracker)

## 🙌 Author

Built with 💻 by [@zmthall](https://github.com/zmthall)

## 📦 Static Project Setup Instructions

This app does not currently use a backend. All project/task data is handled statically using Pinia with persistence. To add your own projects and tasks, follow the structure below:

### 🛠 Project + Task Interfaces

```ts
export interface Project {
  id: string;
  name: string;
  tech: string[];
  description: string;
  tasks: Task[];
  progress: number; // 0–100
}

export interface Task {
  id: string;
  projectId: string;
  content: string;
  isComplete: boolean;
}
```

### 🗃 How to Load Static Projects

1. Open `App.vue`.
2. Import your `Projects.json` file or paste in your project data using the interfaces above.
3. Manually assign the data to the Pinia store like so:

```ts
import { useProjectStore } from './stores/projectStore';
import Projects from './assets/Projects.json';

const projectStore = useProjectStore();
projectStore.projects = Projects;
```

4. Refresh the site once to persist the data via localStorage.
5. **Important:** After the first load, remove or comment out the `projectStore.projects = Projects` line to avoid resetting persisted data.

## 🔮 Future Implementation

While this goal tracker currently uses a predefined set of projects, a key future feature will be:

- 🆕 Dynamic Project Management
  - Add new projects via a form-based modal
  - Remove or archive completed projects
  - Edit existing project names, descriptions, and goals
  - Optional: Reorder project list with drag-and-drop UI

This project was initially created to track the author’s own learning goals, so projects are statically defined for now. As it evolves, this feature will help make the tracker fully scalable and reusable for other developers and teams.

## 📄 License

[MIT](LICENSE)
