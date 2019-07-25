import arrayMove from 'array-move';
import {
  CREATING_NEW_CONTACT,
  CREATED_NEW_CONTACT,
  EDITING_CONTACT,
  EDITED_CONTACT,
  REORDER_CONTACT_LIST,
  CLOSE_MODAL,
} from './types';

const initialState = {
  activeItem: null,
  isModalOpen: false,
  items: [],
};

const contactReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case '@@INIT':
      return {
        ...state,
        activeItem: null,
        isModalOpen: false,
      };

    case CREATING_NEW_CONTACT:
      return {
        ...state,
        isModalOpen: true,
      };

    case CREATED_NEW_CONTACT:
      return {
        ...state,
        items: [...state.items, payload.newContact],
        isModalOpen: false,
      };

    case EDITING_CONTACT:
      return {
        ...state,
        activeItem: payload.index,
        isModalOpen: true,
      };

    case EDITED_CONTACT:
      return {
        ...state,
        isModalOpen: false,
        activeItem: null,
        items: state.items.map(item =>
          item.id === payload.editedContact.id ? payload.editedContact : item,
        ),
      };

    case REORDER_CONTACT_LIST:
      return {
        ...state,
        isModalOpen: false,
        items: arrayMove(state.items, payload.oldIndex, payload.newIndex),
        activeItem: null,
      };

    case CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
        activeItem: null,
      };

    default:
      return state;
  }
};

export default contactReducer;
