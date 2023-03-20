import { Todo } from '../../types/Todo';

type Props = {
  onAdd: (todo: Todo) => void,
  isInputDisabled: boolean,
  inputTitle: string,
  setInputTitle: React.Dispatch<React.SetStateAction<string>>,
};

export const Form:React.FC<Props> = (
  {
    onAdd,
    isInputDisabled,
    inputTitle,
    setInputTitle,
  },
) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo = {
      id: 0,
      userId: 6686,
      title: inputTitle,
      completed: false,
    };

    onAdd(newTodo);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={inputTitle}
        onChange={(event) => setInputTitle(event.target.value)}
        disabled={!!isInputDisabled}
      />
    </form>
  );
};
