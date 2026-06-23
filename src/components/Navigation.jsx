import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import {
  BiArchive,
  BiBarChartAlt2,
  BiBookmark,
  BiCog,
  BiFlag,
  BiHeart,
  BiHomeAlt,
  BiLogOut,
  BiMenu,
  BiPalette,
  BiPlus,
  BiSearch,
  BiSend,
  BiUser
} from 'react-icons/bi'

function Navigation({ authUser, signOut, openComposer }) {
  const { pathname } = useLocation()
  const [isMoreOpen, setIsMoreOpen] = useState(false)

  const isActive = (path) => pathname === path

  return (
    <aside className="app-sidebar">
      <Link to="/" className="brand" aria-label="ForumBoard home">
        <span className="brand-mark">F</span>
        <span>ForumBoard</span>
      </Link>

      {authUser && (
        <>
          <nav className="sidebar-nav" aria-label="Main navigation">
            <Link to="/" className={`sidebar-link ${isActive('/') ? 'active' : ''}`}>
              <BiHomeAlt />
              <span>For you</span>
            </Link>

            <button type="button" className="sidebar-link" onClick={openComposer}>
              <BiPlus />
              <span>New thread</span>
            </button>

            <Link to="/search" className={`sidebar-link ${isActive('/search') ? 'active' : ''}`}>
              <BiSearch />
              <span>Search</span>
            </Link>

            <Link
              to="/messages"
              className={`sidebar-link ${isActive('/messages') ? 'active' : ''}`}
            >
              <BiSend />
              <span>Messages</span>
            </Link>

            <Link
              to="/activity"
              className={`sidebar-link ${isActive('/activity') ? 'active' : ''}`}
            >
              <BiHeart />
              <span>Activity</span>
            </Link>

            <Link to="/profile" className={`sidebar-link ${isActive('/profile') ? 'active' : ''}`}>
              <BiUser />
              <span>Profile</span>
            </Link>

            <Link to="/saved" className={`sidebar-link ${isActive('/saved') ? 'active' : ''}`}>
              <BiBookmark />
              <span>Saved</span>
            </Link>

            <Link
              to="/leaderboards"
              className={`sidebar-link ${isActive('/leaderboards') ? 'active' : ''}`}
            >
              <BiBarChartAlt2 />
              <span>Leaderboards</span>
            </Link>
          </nav>

          <div className="sidebar-footer">
            <div className="more-menu-wrap">
              {isMoreOpen && (
                <div className="more-popover">
                  <button type="button" className="more-item">
                    <BiPalette />
                    <span>Appearance</span>
                  </button>
                  <button type="button" className="more-item">
                    <BiCog />
                    <span>Settings</span>
                  </button>
                  <button type="button" className="more-item">
                    <BiArchive />
                    <span>Archive</span>
                  </button>
                  <button type="button" className="more-item">
                    <BiFlag />
                    <span>Report a problem</span>
                  </button>
                  <button type="button" className="more-item danger" onClick={signOut}>
                    <BiLogOut />
                    <span>Logout</span>
                  </button>
                </div>
              )}

              <button
                type="button"
                className={`sidebar-link more-trigger ${isMoreOpen ? 'active' : ''}`}
                onClick={() => setIsMoreOpen((current) => !current)}
              >
                <BiMenu />
                <span>More</span>
              </button>
            </div>
          </div>
        </>
      )}
    </aside>
  )
}

Navigation.propTypes = {
  authUser: PropTypes.object,
  signOut: PropTypes.func,
  openComposer: PropTypes.func
}

export default Navigation
