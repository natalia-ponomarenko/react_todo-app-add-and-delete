/* eslint-disable jsx-a11y/control-has-associated-label */
import classnames from 'classnames';
import { Form } from '../Form';

type Props = {
  activeTodos: number,
};

export const Header: React.FC<Props> = ({ activeTodos }) => {
  return (
    <header className="todoapp__header">
      {activeTodos > 0 && (
        <button
          type="button"
          className={classnames({
            'todoapp__toggle-all': true,
            active: activeTodos,
          })}
        />
      )}

      {/* Add a todo on form submit */}
      <Form />
    </header>
  );
};
