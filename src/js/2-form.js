// pre define data
let formData = { email: '', message: '' };

// form
const refs = {
  form: document.querySelector('.feedback-form'),
};

// field handler
const formFields = form => {
  try {
    const formDataFromLS = JSON.parse(
      localStorage.getItem('feedback-form-state')
    );

    if (formDataFromLS === null) {
      return;
    }

    formData = formDataFromLS;

    Object.keys(formDataFromLS).forEach(key => {
      form.elements[key].value = formDataFromLS[key];
    });
  } catch (err) {
    console.log(err);
  }
};
formFields(refs.form);

// change - handler
const fieldChangeHandler = ({ target: formField }) => {
  formData[formField.name] = formField.value.trim();
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};
// change - listener
refs.form.addEventListener('input', fieldChangeHandler);

// submit handler
const formSubmitHandler = e => {
  e.preventDefault();
  if (formData.email === '' || formData.message === '') {
    alert('All form field are required.');
    return;
  }
  e.target.reset();
  formData = { email: '', message: '' };
  localStorage.removeItem('feedback-form-state');
};
// submit - listener
refs.form.addEventListener('submit', formSubmitHandler);
