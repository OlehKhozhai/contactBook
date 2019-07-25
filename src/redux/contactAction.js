import {
  CREATING_NEW_CONTACT,
  CREATED_NEW_CONTACT,
  EDITING_CONTACT,
  EDITED_CONTACT,
  REORDER_CONTACT_LIST,
  CLOSE_MODAL,
} from './types';

const contactActions = {
  creatingNewContact: () => ({ type: CREATING_NEW_CONTACT }),

  createdNewContact: newContact => ({
    type: CREATED_NEW_CONTACT,
    payload: { newContact },
  }),

  editingContact: index => ({
    type: EDITING_CONTACT,
    payload: { index },
  }),

  editedContact: editedContact => ({
    type: EDITED_CONTACT,
    payload: { editedContact },
  }),

  orderList: (oldIndex, newIndex) => ({
    type: REORDER_CONTACT_LIST,
    payload: { oldIndex, newIndex },
  }),

  closeModal: () => ({ type: CLOSE_MODAL }),
};

export default contactActions;
