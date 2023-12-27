import { useDispatch, useSelector } from 'react-redux';
import css from './ContactForm.module.css';
import { nanoid } from '@reduxjs/toolkit';
import { getContacts } from '../../redux/selectors.js';
import { addContact } from '../../redux/contactsSlice.js';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  console.log(contacts);

  const handleSubmit = e => {
    e.preventDefault();

    const newContactName = e.target.elements.name.value;

    const isContactExist =
      contacts &&
      contacts.some(
        contact => contact.name.toLowerCase() === newContactName.toLowerCase()
      );

    if (isContactExist) {
      alert('Contact with this name already exist!');
      e.target.reset();
      return;
    }
    const newContact = {
      id: nanoid(),
      name: e.target.elements.name.value,
      number: e.target.elements.number.value,
    };
    dispatch(addContact(newContact));
    e.target.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        Name
        <input className={css.input} type="text" name="name" required />
      </label>

      <label className={css.label}>
        Number
        <input
          className={css.input}
          type="tel"
          name="number"
          placeholder="000-00-00"
          pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}"
          required
        />
      </label>
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
};
export default ContactForm;
