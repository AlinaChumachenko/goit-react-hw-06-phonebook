import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm.jsx';
import ContactList from './ContactList/ContactList.jsx';
import Filter from './Filter/Filter.jsx';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const localData = window.localStorage.getItem('contacts');
    if (localData) {
      return JSON.parse(localData);
    } else {
      return [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ];
    }
  });
  const [filter, setFilter] = useState('');

  const addContact = contact => {
    const contactExist = contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (contactExist) {
      alert(`${contact.name} is already in the contacts!`);
      return;
    }

    setContacts(prev => {
      const updatedContacts = [{ id: nanoid(), ...contact }, ...prev];
      return updatedContacts;
    });
  };

  const filterContacts = e => {
    setFilter(e.target.value);
  };

  const showFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const removeContact = contactId => {
    setContacts(prev => prev.filter(({ id }) => id !== contactId));
  };

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      {contacts.length > 0 ? (
        <h2>Contacts</h2>
      ) : (
        <p>Your contact list is empty</p>
      )}
      <Filter value={filter} onFilterContacts={filterContacts} />
      <ContactList
        contacts={showFilteredContacts()}
        removeContact={removeContact}
      />
    </div>
  );
};
// export class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   addContact = contact => {
//     const contactExist = this.state.contacts.some(
//       ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
//     );

//     if (contactExist) {
//       alert(`${contact.name} is already in the contacts!`);
//       return;
//     }

//     this.setState(prevState => ({
//       contacts: [{ id: nanoid(), ...contact }, ...prevState.contacts],
//     }));
//   };

//   filterContacts = e => {
//     this.setState({ filter: e.target.value });
//   };

//   showFilteredContacts = () => {
//     const { filter, contacts } = this.state;
//     const FilterlowerCase = filter.toLowerCase();
//     if (filter === '') {
//       return contacts;
//     } else {
//       return contacts.filter(({ name }) =>
//         name.toLowerCase().includes(FilterlowerCase)
//       );
//     }
//   };

//   removeContact = contactId => {
//     this.setState(prevState => {
//       return {
//         contacts: prevState.contacts.filter(({ id }) => id !== contactId),
//       };
//     });
//   };

//   componentDidMount() {
//     const localData = localStorage.getItem('contacts');
//     if (localData) this.setState({ contacts: JSON.parse(localData) });
//   }

//   componentDidUpdate = (_, prevState) => {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   };

//   render() {
//     const filteredContacts = this.showFilteredContacts();

//     return (
//       <div>
//         <h1>Phonebook</h1>
//         <ContactForm onSubmit={this.addContact} />
//         {this.state.contacts.length > 0 ? (
//           <h2>Contacts</h2>
//         ) : (
//           <p>Your contact list is empty</p>
//         )}
//         <Filter
//           value={this.state.filter}
//           onFilterContacts={this.filterContacts}
//         />
//         <ContactList
//           contacts={filteredContacts}
//           removeContact={this.removeContact}
//         />
//       </div>
//     );
//   }
// }
