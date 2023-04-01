import { screen, render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import nock from 'nock'

import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './App'
import { initaliseStore } from '../store'

describe('AddTask component', () => {

  it.todo('should add a new task to the list')
  //it('should add a new task to the list', async () => {

    // nock('http://localhost')
    //   .get('/api/v1/task/list')
    //   .reply(200, {
    //     tasks: [
    //       {
    //         id: 1,
    //         description: 'Task',
    //         createdAt: '2023-03-22T05:03:29.776Z',
    //         completedAt: null,
    //         taskListId: 1,
    //       },
    //     ],
    //   })

    // nock('http://localhost')
    //   .post('/api/v1/task/')
    //   .reply(200, {
    //     task: {
    //       description: 'New Task',
    //       createdAt: '2023-03-22T05:03:29.776Z',
    //       completedAt: null,
    //       taskListId: 1,
    //     },
    //   })


    // render(
    //   <MemoryRouter initialEntries={['/list']}>
    //     <Provider store={initaliseStore()}>
    //       <App />
    //     </Provider>
    //   </MemoryRouter>
    // )

    // const input = screen.getByPlaceholderText('What needs to be done?')
    // fireEvent.change(input, { target: { value: 'New Task' } })
    // fireEvent.keyDown(input, { key: 'Enter' })

    // await waitFor(() => {  
    //   expect(screen.findByText('New Task')).toBeInTheDocument()
    // });
  //})
})