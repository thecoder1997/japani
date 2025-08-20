import React, { useState, useEffect, lazy, Suspense } from 'react'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { app } from './firebase'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link, NavLink, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'

const SignUpPage = lazy(() => import('./pages/signUpPage'))
const LoginPage = lazy(() => import('./pages/Login'))
const CombinedChart = lazy(() => import('./pages/CombinedChart'))
const TestHiragana = lazy(() => import('./components/TestHiragana'))
const TestKatakana = lazy(() => import('./components/TestKatakana'))
const RowTest = lazy(() => import('./pages/RowTest'))
const Landing = lazy(() => import('./pages/Landing'))

function Page({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

function AnimatedRoutes({ user }) {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="flex items-center justify-center py-10">Loading…</div>}>
        <Routes location={location} key={location.pathname}>
          {user ? (
            <>
              <Route path="/" element={<Page><CombinedChart /></Page>} />
              <Route path="/testhiragana" element={<Page><TestHiragana /></Page>} />
              <Route path="/testkatakana" element={<Page><TestKatakana /></Page>} />
              <Route path="/row-test" element={<Page><RowTest /></Page>} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Page><Landing /></Page>} />
              <Route path="/login" element={<Page><LoginPage /></Page>} />
              <Route path="/signup" element={<Page><SignUpPage /></Page>} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const auth = getAuth(app)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return unsubscribe
  }, [auth])

  const handleLogout = async () => {
    await signOut(auth)
    setMenuOpen(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        Loading...
      </div>
    )
  }

  const NavItem = ({ to, children }) => (
    <NavLink
      to={to}
      onClick={() => setMenuOpen(false)}
      className={({ isActive }) =>
        `px-3 py-2 rounded-md text-sm font-medium hover:text-indigo-600 hover:bg-indigo-50 ${
          isActive ? 'text-indigo-700 bg-indigo-100' : 'text-gray-700'
        }`
      }
    >
      {children}
    </NavLink>
  )

  const HamburgerButton = ({ open, onToggle }) => (
    <button
      onClick={onToggle}
      aria-label="Toggle menu"
      className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
    >
      <motion.span
        className="block h-0.5 w-6 bg-current rounded"
        initial={false}
        animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 26 }}
      />
      <motion.span
        className="block h-0.5 w-6 bg-current rounded my-1"
        initial={false}
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.span
        className="block h-0.5 w-6 bg-current rounded"
        initial={false}
        animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 26 }}
      />
    </button>
  )

  return (
    <Router>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to={user ? '/' : '/'} className="text-lg font-semibold text-indigo-600" onClick={() => setMenuOpen(false)}>
                KanaLearn
              </Link>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-2">
              {user && (
                <>
                  <NavItem to="/">Chart</NavItem>
                  <NavItem to="/testhiragana">Test Hiragana</NavItem>
                  <NavItem to="/testkatakana">Test Katakana</NavItem>
                </>
              )}
            </div>

            {/* Desktop actions */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <HamburgerButton open={menuOpen} onToggle={() => setMenuOpen((v) => !v)} />
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t bg-white/95 backdrop-blur"
            >
              <motion.div
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{ duration: 0.15, delay: 0.05 }}
                className="px-4 pb-4 pt-2 flex flex-col gap-2"
              >
                {user && (
                  <>
                    <NavItem to="/">Chart</NavItem>
                    <NavItem to="/testhiragana">Test Hiragana</NavItem>
                    <NavItem to="/testkatakana">Test Katakana</NavItem>
                  </>
                )}
                <div className="h-px bg-gray-200 my-2" />
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
                  >
                    Logout
                  </button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMenuOpen(false)}
                      className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatedRoutes user={user} />
    </Router>
  )
}