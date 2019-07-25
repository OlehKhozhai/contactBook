import React from 'react';
import { SortableElement } from 'react-sortable-hoc';

const ContactItem = SortableElement(
  ({ item: { firstName, lastName, phoneNumber, email, dob } }) => {
    return (
      <li className="contact_item">
        <h4>{firstName} {lastName}</h4>
        <p>{phoneNumber}</p>
        <p>{email}</p>
        <p>{dob}</p>
      </li>
    );
  },
);

export default ContactItem;
