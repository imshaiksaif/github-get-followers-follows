import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import {useFormValidation} from '../customHooks/useFormValidation';
import FormInput from './FormInput';

import '../styles/UserForm.scss';

export const UserForm = () => {
  const [ formData, setFormData ] = useState({primaryUserName: '', secondaryUserName: ''});
  const [btnText, setBtnText] = useState('Get Result');
  const { formErrors, setFormErrors, validateForm, checkForFormErrors, btnDisabled, setBtnDisabled } = useFormValidation();
  const history = useHistory();

  const handleChange = (e) => {
    const {name, value} = e.target;
    checkForFormErrors(name, value);
    setFormData(prevData => {
      return {
        ...prevData,
        [name]: value
      }
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {primaryUserName, secondaryUserName} = formData;
    if(validateForm(formErrors)) {
      setBtnDisabled(true);
      setBtnText('Please Wait...');
      const [primaryUser, secondaryUser] = await Promise.all([validateUser(primaryUserName), validateUser(secondaryUserName)]);
      if(primaryUser && secondaryUser) {
        history.push(`/result/${primaryUserName}/${secondaryUserName}`);
      } else {
        setBtnText("Try Again");
        setBtnDisabled(true);
        setFormErrors(prevData => {
          return {
            ...prevData,
            primaryUserName: primaryUser ? '' : "invalid username",
            secondaryUserName: secondaryUser ? '' : "invalid username"
          }
        })
      }
    } else {
      setBtnDisabled(true);
    }
  }

  const validateUser = async (userName) => {
    try {
      const user = await fetch(`https://api.github.com/users/${userName}`).then(res => res.json());
      if (user.message) {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  }
  
  
  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <FormInput type='text' name='primaryUserName' value={formData.primaryUserName} onChange={handleChange} label='Enter the primary username' required />
      {formErrors.primaryUserName && <span className='error'>{formErrors.primaryUserName}</span>}
      <FormInput type='text' name='secondaryUserName' value={formData.secondaryUserName} onChange={handleChange} label='Enter the secondary username' required />
      {formErrors.secondaryUserName && <span className='error'>{formErrors.secondaryUserName}</span>}
      <div className="btn-holder">
      <button className="submit-btn" disabled={btnDisabled} type="submit">{btnText}</button>      
      </div>
    </form>
  )
}
