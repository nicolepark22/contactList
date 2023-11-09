import { useState, useEffect } from "react";
import ContactRow from "./ContactRow";

function ContactList({ setSelectedContactId }) {
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchContacts() {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/users");
                const result = await response.json();
                setContacts(result);
            } catch (error) {
                setError(error);
            }
        }
        fetchContacts();
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th colSpan="3">Contact List</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Phone</td>
                </tr>
                {error ? (
                    <tr>{error}</tr>
                ) : (
                    contacts.map((contact) => {
                        return <ContactRow key={contact.id} contact={contact} setSelectedContactId={setSelectedContactId} />;
                    })
                )}
            </tbody>
        </table>
    );
}
export default ContactList;
