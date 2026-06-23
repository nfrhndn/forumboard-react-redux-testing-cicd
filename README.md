# ForumBoard

ForumBoard adalah aplikasi forum diskusi berbasis React dan Redux yang menggunakan Dicoding Forum API. Project ini dikembangkan untuk submission Dicoding **Menjadi React Web Developer Expert** dan sudah dilengkapi automation testing, Storybook, CI dengan GitHub Actions, serta deployment melalui Vercel.

Live demo:

```text
https://forumboard-react-redux-testing-cicd.vercel.app/
```

Repository:

```text
https://github.com/nfrhndn/forumboard-react-redux-testing-cicd
```

## Fitur Utama

- Registrasi dan login pengguna.
- Menampilkan daftar thread dan detail thread.
- Membuat thread dan komentar.
- Votes pada thread dan komentar dengan optimistic update.
- Leaderboard pengguna.
- Filter thread berdasarkan kategori.
- Loading indicator saat memuat data API.
- Tampilan responsive dengan dark social feed layout.

## Automation Testing

Project ini menyediakan pengujian otomatis untuk memenuhi kriteria submission final:

- Reducer test untuk state thread dan detail thread.
- Thunk test per modul state dengan mock Dicoding Forum API.
- React component test menggunakan React Testing Library.
- End-to-end login flow menggunakan Cypress.
- Storybook stories untuk komponen forum utama.

## CI/CD

Continuous Integration dijalankan menggunakan GitHub Actions pada branch `master`. Workflow menjalankan:

- Install dependencies.
- Verify Cypress binary.
- ESLint.
- Unit dan component test.
- Production build.
- Storybook build.
- Cypress E2E test.

Continuous Deployment dilakukan melalui Vercel yang terhubung dengan repository GitHub.

## Tech Stack

- React
- Redux Toolkit
- React Redux
- React Router
- Vite
- Vitest
- React Testing Library
- Cypress
- Storybook
- GitHub Actions
- Vercel
- ESLint StandardJS
- Prettier

## Menjalankan Project

Install dependencies:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Jalankan lint:

```bash
npm run lint
```

Jalankan unit dan component test:

```bash
npm test
```

Jalankan E2E test:

```bash
npm run e2e
```

Build aplikasi:

```bash
npm run build
```

Jalankan Storybook:

```bash
npm run storybook
```

Build Storybook:

```bash
npm run build-storybook
```

## Bukti Submission

Folder `screenshot` berisi bukti yang diminta pada submission:

- `1_ci_check_error.png`
- `2_ci_check_pass.png`
- `3_branch_protection.png`

Saat membuat ZIP submission, jangan sertakan folder berikut:

- `node_modules`
- `dist`
- `storybook-static`
