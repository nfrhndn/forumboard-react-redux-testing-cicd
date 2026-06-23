/**
 * Skenario pengujian:
 * - LeaderboardItem component
 *   - should render rank, user name, avatar, and score
 */

import React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import LeaderboardItem from './LeaderboardItem'

describe('LeaderboardItem component', () => {
  it('should render rank, user name, avatar, and score', () => {
    render(
      <LeaderboardItem
        rank={1}
        score={120}
        user={{
          id: 'user-1',
          name: 'Farhan',
          avatar: 'https://example.com/avatar.png'
        }}
      />
    )

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('Farhan')).toBeInTheDocument()
    expect(screen.getByAltText('Farhan')).toHaveAttribute('src', 'https://example.com/avatar.png')
    expect(screen.getByText('120')).toBeInTheDocument()
  })
})
