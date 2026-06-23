import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LeaderboardItem from '../components/LeaderboardItem'
import { asyncPopulateLeaderboards } from '../states/leaderboards/action'

function LeaderboardPage() {
  const { leaderboards } = useSelector((states) => states)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncPopulateLeaderboards())
  }, [dispatch])

  return (
    <section className="leaderboard-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Leaderboard</p>
          <h1>Pengguna Aktif</h1>
        </div>
        <p className="page-summary">{leaderboards.length} pengguna</p>
      </div>

      <section className="leaderboard-panel">
        <div className="leaderboard-head">
          <span>Rank</span>
          <span>Pengguna</span>
          <span>Skor</span>
        </div>

        {leaderboards.length === 0 ? (
          <div className="empty-state">
            <p>Leaderboard belum tersedia.</p>
          </div>
        ) : (
          <div className="leaderboards-list">
            {leaderboards.map((leaderboard, index) => (
              <LeaderboardItem key={leaderboard.user.id} rank={index + 1} {...leaderboard} />
            ))}
          </div>
        )}
      </section>
    </section>
  )
}

export default LeaderboardPage
