# ForumBoard

ForumBoard adalah aplikasi forum diskusi berbasis React dan Redux yang dibuat untuk submission Dicoding course **Menjadi React Developer Expert** pada proyek **Membangun Aplikasi React dengan Redux**.

Aplikasi ini menggunakan Dicoding Forum API dan dirancang dengan tampilan dark social feed yang terinspirasi dari aplikasi Threads, tanpa menggunakan UI framework tambahan.

## Fitur

- Registrasi dan login pengguna.
- Menampilkan daftar thread.
- Menampilkan detail thread beserta komentar.
- Membuat thread baru.
- Membuat komentar pada thread.
- Loading indicator saat memuat data API.
- Votes pada thread dan komentar dengan optimistic update.
- Leaderboard pengguna aktif.
- Filter daftar thread berdasarkan kategori.
- Layout responsive untuk desktop dan mobile.

## Teknologi

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
- ESLint dengan StandardJS
- Prettier
- Dicoding Forum API

## Menjalankan Project

Install dependency:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Build production:

```bash
npm run build
```

Jalankan lint:

```bash
npm run lint
```

Rapikan format kode:

```bash
npm run format
```

Cek format kode:

```bash
npm run format:check
```

Jalankan unit dan component test:

```bash
npm test
```

Jalankan test dalam mode watch:

```bash
npm run test:watch
```

Jalankan end-to-end test login:

```bash
npm run e2e
```

Jalankan Storybook:

```bash
npm run storybook
```

Build Storybook:

```bash
npm run build-storybook
```

## Automation Testing dan CI/CD

Project ini disiapkan untuk submission **Menerapkan Automation Testing dan CI/CD pada Aplikasi Forum Diskusi**.

- Reducer test tersedia untuk state thread dan detail thread.
- Thunk test menggunakan mock Dicoding Forum API agar stabil di lokal dan CI.
- Component test menggunakan React Testing Library.
- E2E test menggunakan Cypress dengan intercept API untuk alur login.
- GitHub Actions menjalankan lint, test, build aplikasi, build Storybook, dan E2E test.
- Branch utama yang disiapkan untuk branch protection adalah `master`.

Untuk submission final, deploy project melalui Vercel dari repository GitHub dan lampirkan URL deployment pada catatan submission.

## Catatan Submission

Folder `node_modules` dan `dist` tidak perlu disertakan saat membuat berkas ZIP submission. Dependency dapat dipasang kembali menggunakan `npm install`.

Untuk submission final testing/CI-CD, sertakan screenshot asli di folder `screenshot`:

- `1_ci_check_error.png`
- `2_ci_check_pass.png`
- `3_branch_protection.png`
