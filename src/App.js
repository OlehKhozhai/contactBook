import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import contactActions from './redux/contactAction';

import ContactModal from './components/ContactModal';
import ContactList from './components/ContactList';

class App extends Component {
  timeStamp = null;

  modalRef = createRef();

  componentDidUpdate(prevProps) {
    const { isModalOpen } = this.props;

    if (prevProps.isModalOpen !== isModalOpen) {
      const eventListener = isModalOpen
        ? 'addEventListener'
        : 'removeEventListener';
      document[eventListener]('mouseup', this.handleWindowClick, false);
    }
  }

  handleWindowClick = ({ target }) => {
    const { isModalOpen, closeModal } = this.props;
    const clickOnDropdown = this.modalRef.current.contains(target);

    if (isModalOpen && !clickOnDropdown) closeModal();
  };

  handleSortStart = () => {
    this.timeStamp = Date.now();
  };

  handleSortEnd = ({ oldIndex, newIndex }) => {
    const { orderList, editingContact } = this.props;
    const clickDuring = Date.now() - this.timeStamp;

    if (clickDuring > 250) {
      orderList(oldIndex, newIndex);
    } else {
      editingContact(oldIndex);
    }
  };

  render() {
    const { items, creatingNewContact, isModalOpen } = this.props;

    return (
      <div className="App">
        <ContactList
          items={items}
          axis="xy"
          shouldCancelStart={this.handleSortStart}
          onSortEnd={this.handleSortEnd}
        />

        <button
          type="button"
          onClick={creatingNewContact}
          className="add_contact_btn">
          Add Contact
        </button>

        <CSSTransition
          in={isModalOpen}
          timeout={300}
          classNames="modal"
          unmountOnExit>
          <ContactModal modalRef={this.modalRef} />
        </CSSTransition>
      </div>
    );
  }
}

const mapStateToProps = ({ contacts: { items, isModalOpen } }) => ({
  items,
  isModalOpen,
});

const mapDispatchToProps = {
  orderList: contactActions.orderList,
  editingContact: contactActions.editingContact,
  creatingNewContact: contactActions.creatingNewContact,
  closeModal: contactActions.closeModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
