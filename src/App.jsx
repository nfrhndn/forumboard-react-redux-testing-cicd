import React, { Suspense, lazy, useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import LoadingBar from 'react-redux-loading-bar'
import Navigation from './components/Navigation'
import ThreadInput from './components/ThreadInput'
import { asyncPreloadProcess } from './states/isPreload/action'
import { asyncUnsetAuthUser } from './states/authUser/action'
import { asyncAddThread } from './states/threads/action'

const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const HomePage = lazy(() => import('./pages/HomePage'))
const DetailPage = lazy(() => import('./pages/DetailPage'))
const LeaderboardPage = lazy(() => import('./pages/LeaderboardPage'))
const MessagesPage = lazy(() => import('./pages/MessagesPage'))
const FeaturePage = lazy(() => import('./pages/FeaturePage'))

function PageFallback() {
  return <div className="route-loading">Memuat halaman...</div>
}

function App() {
  const { authUser, isPreload } = useSelector((states) => states)
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const [isComposerOpen, setIsComposerOpen] = useState(false)

  useEffect(() => {
    dispatch(asyncPreloadProcess())
  }, [dispatch])

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser())
  }

  const openComposer = () => {
    setIsComposerOpen(true)
  }

  const closeComposer = () => {
    setIsComposerOpen(false)
  }

  const onAddThread = ({ title, category, body }) => {
    return dispatch(asyncAddThread({ title, category, body }))
  }

  if (isPreload) {
    return <LoadingBar className="loading-bar" />
  }

  if (authUser === null) {
    return (
      <>
        <Navigation authUser={null} />
        <LoadingBar className="loading-bar" />
        <main>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/*" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </Suspense>
        </main>
      </>
    )
  }

  return (
    <>
      <Navigation authUser={authUser} signOut={onSignOut} openComposer={openComposer} />
      <LoadingBar className="loading-bar" />
      <main className={`app-container ${pathname === '/messages' ? 'messages-container' : ''}`}>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<HomePage openComposer={openComposer} />} />
            <Route path="/threads/:id" element={<DetailPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route
              path="/search"
              element={
                <FeaturePage
                  title="Search"
                  description="Search experience belum menjadi bagian dari kriteria submission, jadi halaman ini disiapkan sebagai placeholder portfolio."
                />
              }
            />
            <Route
              path="/activity"
              element={
                <FeaturePage
                  title="Activity"
                  description="Aktivitas vote dan reply bisa dikembangkan di sini setelah fitur utama submission selesai."
                />
              }
            />
            <Route
              path="/profile"
              element={
                <FeaturePage
                  title="Profile"
                  description="Profil pengguna disiapkan sebagai area lanjutan tanpa mengubah data dari Dicoding Forum API."
                />
              }
            />
            <Route
              path="/saved"
              element={
                <FeaturePage
                  title="Saved"
                  description="Halaman arsip thread tersimpan disiapkan untuk pengembangan berikutnya."
                />
              }
            />
            <Route path="/leaderboards" element={<LeaderboardPage />} />
          </Routes>
        </Suspense>
      </main>
      {isComposerOpen && (
        <div className="modal-backdrop" role="presentation">
          <div className="composer-modal" role="dialog" aria-modal="true" aria-label="New thread">
            <ThreadInput addThread={onAddThread} onClose={closeComposer} />
          </div>
        </div>
      )}
    </>
  )
}

export default App
