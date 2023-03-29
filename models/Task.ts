export interface NewTask {
  description: string
  createdAt: string
  completedAt: string
  taskListId: number
}

export interface Task extends NewTask {
  id: number
}

export interface UpdatedTask extends Partial<Task> {
  description?: string
  completedAt?: string
  createdAt?: never
  taskListId?: never
}

export interface TaskList {
  id: number
  Tasks: Task[]
}
