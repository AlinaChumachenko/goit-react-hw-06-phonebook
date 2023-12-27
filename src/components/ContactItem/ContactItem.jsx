import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';
import css from './ContactItem.module.css';

const ContactItem = ({ name, id, number }) => {
  const dispatch = useDispatch();
  return (
    <li className={css.item} key={id}>
      {name + ': ' + number}
      <button
        className={css.button}
        type="button"
        onClick={() => dispatch(deleteContact(id))}
      >
        Delete
      </button>
    </li>
  );
};

export default ContactItem;
