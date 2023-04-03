import { screen, render, within, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import nock from 'nock'

import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { fetchTasks } from '../../actions/tasks'

import App from '../App'
import { initaliseStore } from '../../store'

describe('thunk fetch task actions', () => {
  it('should show a list of tasks', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/task/list')
      .reply(200, {
        tasks: [
          {
            id: 1,
            description: 'Head to the gym',
            createdAt: '2023-03-22T05:03:29.776Z',
            completedAt: null,
            taskListId: 1,
          },
          {
            id: 2,
            description: 'Watch a bad movie',
            createdAt: '2023-03-22T05:03:29.776Z',
            completedAt: null,
            taskListId: 1,
          },
        ],
      })

    render(
      <MemoryRouter initialEntries={['/list']}>
        <Provider store={initaliseStore()}>
          <App />
        </Provider>
      </MemoryRouter>
    )

    await waitFor(() => {
      const list = screen.getAllByRole('list')
      const items = within(list[0]).getAllByRole('text')
      expect(items).toHaveLength(2)
      expect(items[0]).toHaveTextContent('Head to the gym')
      expect(items[1]).toHaveTextContent('Watch a bad movie')
    })
  })
})
