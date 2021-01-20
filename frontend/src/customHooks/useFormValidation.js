import { useState, useEffect } from 'react'

export function useFormValidation() {
  const [formErrors, setFormErrors] = useState({primaryUserName: '', secondaryUserName: ''});
  const [btnDisabled, setBtnDisabled] = useState(true);

  useEffect(() => {
    if(validateForm(formErrors)){
        setBtnDisabled(false);
    } else {
        setBtnDisabled(true);
    }
    },[formErrors])

  const checkForFormErrors = ( name, value ) => {
    let errors = {...formErrors};
    switch (name) {
      case 'primaryUserName': 
        errors.primaryUserName = 
            value.length < 3
            ? 'Must be atleast 3 characters long'
            : '';
        break;
      case 'secondaryUserName': 
        errors.secondaryUserName = 
            value.length < 3
            ? 'Must be atleast 3 characters long'
            : '';
        break;
      default:
        break;
    }

    setFormErrors(errors);
  }

  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }


    return {
        formErrors,
        checkForFormErrors,
        validateForm,
        btnDisabled,
        setBtnDisabled,
        setFormErrors
    }
}