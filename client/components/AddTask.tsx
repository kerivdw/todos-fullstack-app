
function AddTask() {
  function handleSubmit() {}  

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus={true}
      />
    </form>
  )
}

export default AddTask
