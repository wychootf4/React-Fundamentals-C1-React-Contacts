import { useState, useEffect } from "react";
import "../css/App.css";
import ListContacts from "./ListContacts";
import * as ContactAPI from "../utils/ContactsAPI";

const App = () => {
  const deleteContact = (contact) => {
    setContacts(contacts.filter((c) => c.id !== contact.id));
  };

  useEffect(() => {
    const getContacts = async () => {
      const res = await ContactAPI.getAll();
      setContacts(res);
    };

    getContacts();
  }, []);

  const [contacts, setContacts] = useState([]);

  return (
    <div>
      <ListContacts contacts={contacts} onDeleteContact={deleteContact} />
    </div>
  );
};

export default App;
