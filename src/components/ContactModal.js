import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import contactActions from '../redux/contactAction';
import { validateForm, inputs, emptyFormFields } from './helpers';

import UserIcon from '../assets/img/user.svg';

class ContactModal extends Component {
  state = {
    form: { ...emptyFormFields },
    warningMessage: false,
  };

  componentDidMount() {
    this.initializeForm();
  }

  componentDidUpdate(prevProps) {
    const { activeItem } = this.props;
    if (prevProps.activeItem !== activeItem) {
      this.initializeForm();
    }
  }

  onSubmit = event => {
    event.preventDefault();
    const { form } = this.state;
    const { createdNewContact, editedContact, activeItem } = this.props;
    const id = Date.now();

    if (!validateForm(form)) return this.setState({ warningMessage: true });

    activeItem !== null
      ? editedContact({ ...form })
      : createdNewContact({ ...form, id });

    this.setState({ form: { ...emptyFormFields } });
  };

  initializeForm = () => {
    const { activeItem, items } = this.props;
    this.setState({
      form: activeItem !== null ? items[activeItem] : this.state.form,
    });
  };

  handleOnChange = ({ target: { name, value } }) => {
    this.setState(state => ({
      form: { ...state.form, [name]: value },
    }));
  };

  render() {
    const { warningMessage, form } = this.state;
    const { activeItem, modalRef, isModalOpen } = this.props;

    return (
      <div className="modal_backdrop">
        <div className="modal" ref={modalRef}>
          <CSSTransition
            in={isModalOpen}
            timeout={300}
            classNames="modal_body"
            unmountOnExit>
            <div className="modal_body">
              <form onSubmit={this.onSubmit} className="form">
                <div className="form_input_block">
                  {inputs.map(({ name, label }) => (
                    <React.Fragment key={name}>
                      <div className="group_input">
                        <label>{label}</label>
                        <input
                          name={name}
                          value={form[name]}
                          type="text"
                          onChange={this.handleOnChange}
                          autoComplete="off"
                        />
                      </div>
                    </React.Fragment>
                  ))}
                </div>
                <div className="contact_img">
                  <img src={UserIcon} alt="user icon" />
                </div>
                <button type="submit" className="add_contact_btn">
                  {activeItem ? 'Save Contact' : 'Add Contact'}
                </button>
              </form>

              {warningMessage && (
                <p className="error_message">All Fields are require</p>
              )}
            </div>
          </CSSTransition>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ contacts: { items, isModalOpen, activeItem } }) => ({
  items,
  isModalOpen,
  activeItem,
});
const mapDispatchToProps = {
  createdNewContact: contactActions.createdNewContact,
  editedContact: contactActions.editedContact,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContactModal);
