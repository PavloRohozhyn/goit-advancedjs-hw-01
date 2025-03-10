let formData = { email: '', message: '' };

const refs = {
  form: document.querySelector('.feedback-form'),
};

const fillFormFields = form => {
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

fillFormFields(refs.form);

const fieldChangeHandler = ({ target: formField }) => {
  formData[formField.name] = formField.value.trim();
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

const formSubmitHandler = event => {
  event.preventDefault();

  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);

  event.target.reset();
  formData = { email: '', message: '' };
  localStorage.removeItem('feedback-form-state');
};

refs.form.addEventListener('input', fieldChangeHandler);
refs.form.addEventListener('submit', formSubmitHandler);
