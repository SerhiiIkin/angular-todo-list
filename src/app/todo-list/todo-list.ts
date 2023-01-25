export interface INewTodo {
  description: string;
  isDone: boolean;
}

export interface ITodo extends INewTodo {
  id: string;
}

export interface IDialogTodo {
  window: boolean;
  id: string;
}
