import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import ContactItem from './ContactItem';

const ContactList = SortableContainer(({ items }) => (
  <ul className="contact_list">
    {items.length > 0 &&
      items.map((item, index) => (
        <ContactItem key={item.id} item={item} index={index} />
      ))}
  </ul>
));

export default ContactList;
