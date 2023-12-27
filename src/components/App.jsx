import { useSelector } from 'react-redux';
import { getContacts } from '../redux/selectors.js';
import ContactForm from './ContactForm/ContactForm.jsx';
import Filter from './Filter/Filter.jsx';
import ContactList from './ContactList/ContactList.jsx';


export const App = () => {
  const listOfContacts = useSelector(getContacts);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      {listOfContacts && listOfContacts.length > 0 ? (
        <>
          <h2>Contacts</h2>
          <Filter />
          <ContactList />
        </>
      ) : (
        <p>Your contact list is empty</p>
      )}
    </div>
  );
};
