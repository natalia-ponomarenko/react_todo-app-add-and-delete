import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { getTodos, addNewTodo } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Filter } from './components/Filter';
import { Header } from './components/Header/Header';
import { Notification } from './components/Notification';
import { Filter as FilterType } from './types/Filter';
import { UserWarning } from './UserWarning';
import { Error as ErrorType } from './types/Error';

const USER_ID = 6686;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState(FilterType.ALL);
  const [errorType, setErrorType] = useState(ErrorType.NONE);
  const [isHidden, setIsHidden] = useState(false);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [inputTitle, setInputTitle] = useState('');

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setErrorType(ErrorType.NONE);
        const todosFromServer = await getTodos(USER_ID);

        setTodos(todosFromServer);
      } catch {
        setErrorType(ErrorType.LOAD);
      }
    };

    loadTodos();
  }, []);

  const activeTodos = useMemo(() => {
    return todos.filter((todo) => !todo.completed).length;
  }, [todos]);
  const completedTodos = useMemo(() => {
    return todos.filter((todo) => todo.completed).length;
  }, [todos]);

  const changeFilter = useCallback(
    (filter: FilterType) => {
      setFilterType(filter);
    },
    [filterType],
  );

  const filterTodos = useCallback(
    (todosList: Todo[], filter: FilterType) => {
      switch (filter) {
        case FilterType.ALL:
          return todosList;
        case FilterType.ACTIVE:
          return todosList.filter((todo) => !todo.completed);
        case FilterType.COMPLETED:
          return todosList.filter((todo) => todo.completed);
        default:
          return todosList;
      }
    },
    [todos],
  );

  const visibleTodos = useMemo(
    () => filterTodos(todos, filterType),
    [filterTodos, filterType],
  );

  const addTodo = async (newTodo: Todo) => {
    const { title } = newTodo;

    if (title === '') {
      setErrorType(ErrorType.TITLE);

      return;
    }

    setIsInputDisabled(true);

    try {
      const temporaryTodo: Todo = { ...newTodo };

      setTempTodo(temporaryTodo);

      const todoSuccessfullyAdded = await addNewTodo(USER_ID, newTodo);

      if (todoSuccessfullyAdded) {
        setIsInputDisabled(false);
        setTodos(prevTodos => [...prevTodos, todoSuccessfullyAdded]);
        setTempTodo(null);
        setInputTitle('');
      }
    } catch {
      setErrorType(ErrorType.ADD);
    }
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          activeTodos={activeTodos}
          onAdd={addTodo}
          isInputDisabled={isInputDisabled}
          inputTitle={inputTitle}
          setInputTitle={setInputTitle}
        />
        {!!todos.length && (
          <>
            <TodoList
              todos={visibleTodos}
              loadingTodo={tempTodo}
            />
            <Filter
              notCompleted={activeTodos}
              completed={completedTodos}
              changeFilter={changeFilter}
            />
          </>
        )}
      </div>
      {!!errorType && (
        <Notification
          errorType={errorType}
          closeNotification={() => setIsHidden(true)}
          isHidden={isHidden}
        />
      )}
    </div>
  );
};
