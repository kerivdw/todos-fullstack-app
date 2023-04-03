import { useCallback, useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks'
import { fetchTasks } from '../actions/tasks'
import AddTask from './AddTask'
import Footer from './Footer'
import TaskList from './TaskList'

function App() {
  const { loading, error, data } = useAppSelector((state) => state.tasks)
  const dispatch = useAppDispatch()
  const [taskCount, setTaskCount] = useState<string>('')

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  useEffect(() => {
    const activeTaskCount = data.filter((task) => !task.isComplete).length
    setTaskCount(String(activeTaskCount))
  }, [data])

  const handleTaskAdded = useCallback(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <AddTask onTaskAdded={handleTaskAdded} />
      </header>
      <section className="main">
        <input className="toggle-all" type="text" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TaskList tasks={data} onTaskAdded={handleTaskAdded} />
      </section>
      <Footer activeTaskCount={taskCount} />
    </>
  )
}
export default App
