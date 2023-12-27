import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { getContacts, getFilter } from '../../redux/selectors.js';

import ContactItem from 'components/ContactItem/ContactItem.jsx';
import css from './ContactList.module.css';

const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const listOfContact = useMemo(() => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().trim().includes(filter.toLowerCase().trim())
    );
  }, [contacts, filter]);

  return listOfContact.length > 0 ? (
    <ul className={css.list}>
      {listOfContact.map(({ name, id, number }) => (
        <ContactItem key={id} name={name} id={id} number={number} />
      ))}
    </ul>
  ) : (
    <p>No contact exists</p>
  );
};

export default ContactList;
