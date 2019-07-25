export const validateForm = form => {
  if (
    !form.firstName ||
    !form.lastName ||
    !form.phoneNumber ||
    !form.email ||
    !form.dob
  )
    return false;
  return true;
};

export const inputs = [
  { name: 'firstName', label: 'First Name' },
  { name: 'lastName', label: 'Last Name' },
  { name: 'phoneNumber', label: 'Phone Number' },
  { name: 'email', label: 'email' },
  { name: 'dob', label: 'dob' },
];

export const emptyFormFields = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  dob: '',
};
