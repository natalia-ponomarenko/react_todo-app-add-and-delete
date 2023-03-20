import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  loadingTodo: Todo | null,
};

export const TodoList: React.FC<Props> = ({ todos, loadingTodo }) => {
  return (
    <section className="todoapp__main">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      {loadingTodo && (
        <div className="todo">
          <label className="todo__status-label">
            <input type="checkbox" className="todo__status" />
          </label>

          <span className="todo__title">{loadingTodo.title}</span>
          <button type="button" className="todo__remove">×</button>

          <div className="modal overlay is-active">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      )}

    </section>
  );
};
