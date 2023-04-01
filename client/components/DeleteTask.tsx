import { useAppDispatch } from '../hooks'
import { deleteTask } from '../actions/task'

interface Props {
  id: number
  onTaskAdded: () => void
}

function DeleteTask(props: Props) {
  const dispatch = useAppDispatch()
  const buttonId = String(props.id)

  function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault()
    const id = event.currentTarget.id
    const button = document.getElementById(id)
    button?.classList.add('fade-out')
    dispatch(deleteTask(id))
    props.onTaskAdded()
  }

  return (
    <>
      <button id={buttonId} className="destroy" onClick={handleClick}></button>
    </>
  )
}
export default DeleteTask
