import { useEffect, useState } from 'react'
import AddTask from './AddTask'
import Footer from './Footer'
import TaskList from './TaskList'
import { useAppDispatch, useAppSelector } from '../hooks'
import { setTaskSuccess } from '../actions/task'

function App() {
  const { loading, error, data } = useAppSelector((state) => state.tasks)

  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <AddTask />
      </header>
      <section className="main">
        <input className="toggle-all" type="text" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TaskList tasks={data} />
      </section>
      <Footer />
    </>
  )
}

export default App
