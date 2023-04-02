import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { addNewTask } from '../actions/taskActions'
import { Task, NewTask } from '../../models/task'

interface Props {
  onTaskAdded: () => void
}

function AddTask(props: Props) {
  const { loading, error, data } = useAppSelector((state) => state.tasks)
  const [newDescription, setNewDescription] = useState('')
  const dispatch = useAppDispatch()

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const description = event.target.value
    setNewDescription(description)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const task: NewTask = {
      description: newDescription,
      createdAt: new Date().toISOString(),
      completedAt: null,
      taskListId: 1,
    }
    console.log(task)
    dispatch(addNewTask(task))
    setNewDescription('')
    props.onTaskAdded()
  }

  return (
    <form onSubmit={handleSubmit} data-testid="add-task-form">
      <input
        role="text"
        type="text"
        name="add-task"
        id="add-task"
        className="new-todo"
        value={newDescription || ''}
        placeholder="What needs to be done?"
        autoFocus={true}
        onChange={handleChange}
      />
    </form>
  )
}

export default AddTask
