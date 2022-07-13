import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "../css/App.css";
import ListContacts from "./ListContacts";
import CreateContact from "./CreateContact";
import * as ContactAPI from "../utils/ContactsAPI";

const App = () => {
  let navigate = useNavigate();

  const deleteContact = (contact) => {
    ContactAPI.remove(contact);
    setContacts(contacts.filter((c) => c.id !== contact.id));
  };

  const createContact = (contact) => {
    const create = async () => {
      const res = await ContactAPI.create(contact);
      setContacts([...contacts, res]);
    };

    create();
    navigate("/");
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
    <Routes>
      <Route
        exact
        path="/"
        element={
          <ListContacts contacts={contacts} onDeleteContact={deleteContact} />
        }
      />
      <Route
        path="/create"
        element={
          <CreateContact
            onCreateContact={(contact) => {
              createContact(contact);
            }}
          />
        }
      />
    </Routes>
  );
};

export default App;
