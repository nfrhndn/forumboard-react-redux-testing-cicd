/* global cy, describe, it */

describe('Login flow', () => {
  it('should login and show discussion feed', () => {
    cy.intercept('GET', '**/users/me', (req) => {
      if (req.headers.authorization === 'Bearer token-123') {
        req.reply({
          status: 'success',
          data: {
            user: {
              id: 'user-1',
              name: 'Farhan',
              email: 'farhan@example.com',
              avatar: 'https://example.com/avatar.png'
            }
          }
        })
        return
      }

      req.reply({
        statusCode: 401,
        body: {
          status: 'fail',
          message: 'Missing authentication'
        }
      })
    }).as('getOwnProfile')

    cy.intercept('POST', '**/login', {
      status: 'success',
      data: {
        token: 'token-123'
      }
    }).as('login')

    cy.intercept('GET', '**/users', {
      status: 'success',
      data: {
        users: [
          {
            id: 'user-1',
            name: 'Farhan',
            avatar: 'https://example.com/avatar.png'
          }
        ]
      }
    }).as('getUsers')

    cy.intercept('GET', '**/threads', {
      status: 'success',
      data: {
        threads: [
          {
            id: 'thread-1',
            title: 'Bagaimana pengalamanmu belajar Redux?',
            body: '<p>Coba ceritakan pengalaman belajar Redux.</p>',
            category: 'redux',
            createdAt: '2026-06-23T00:00:00.000Z',
            ownerId: 'user-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 1
          }
        ]
      }
    }).as('getThreads')

    cy.clearLocalStorage()
    cy.visit('/')

    cy.get('input#email').type('farhan@example.com')
    cy.get('input#password').type('secret123')
    cy.contains('button', 'Masuk').click()

    cy.wait('@login')
    cy.wait('@getUsers')
    cy.wait('@getThreads')

    cy.contains('For you').should('be.visible')
    cy.contains("What's new?").should('be.visible')
    cy.contains('Bagaimana pengalamanmu belajar Redux?').should('be.visible')
  })
})
