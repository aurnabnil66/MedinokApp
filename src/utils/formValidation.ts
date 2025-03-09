/* All form validations will resides here */

import * as yup from 'yup';
import { parse, isValid } from 'date-fns';
// import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';

export const mobileSignInFormValidation = yup.object().shape({
  mobile: yup
    .string()
    .required('Mobile Number is required')
    .matches(/^\d+$/, 'Mobile Number must contain only digits') // Allow only numeric characters
    .min(11, 'Mobile Number must contain at least 11 Digits'),
  password: yup
    .string()
    .required('Password is required')
    .min(4, 'Password must contain at least 8 characters')
});

export const createAccountFormValidation = yup.object().shape({
  fullName: yup
    .string()
    .required('Full Name is required')
    .matches(/^[a-zA-Z\s]+$/, 'Full Name must only contain letters and spaces'), // Only allow letters and spaces,
  mobile: yup
    .string()
    .required('Mobile Number is required')
    .matches(/^\d+$/, 'Mobile Number must contain only digits') // Allow only numeric characters
    .min(11, 'Mobile Number must contain at least 11 Digits'),
  email: yup
    .string()
    .required('Email Address is required')
    .test(
      'starts-with-lowercase',
      'Email must start with a lowercase letter',
      value => (value ? /^[a-z]/.test(value) : true) // Check if it starts with a lowercase letter
    )
    .test(
      'contains-at',
      'Email must contain "@"',
      value => (value ? /@/.test(value) : true) // Check if it contains the "@" symbol
    )
    .test(
      'valid-email-format',
      'Invalid email format',
      value => (value ? /^[a-z][a-z0-9._%+-]*@[a-z0-9.-]+\.[a-z]{2,}$/.test(value) : true) // Full email format validation as a fallback
    ),

  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must contain at least 8 characters'), // Changed from 4 to 8 to match the message
  confirmPassword: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password'), ''], 'The password is not matched'), // Check if it matches the password
  gender: yup.string().required('Gender is required'),
  birthDate: yup
    .string()
    .required('Birth Date is required')
    .test('is-not-future-date', 'Birth Date cannot be in the future', value => {
      if (!value) return true;
      const selectedDate = parse(value, 'EEE, MMMM dd, yyyy', new Date());
      if (!isValid(selectedDate)) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate <= today;
    })
});

// export const OTPFormValidation = Yup.object({
//   otp: Yup.string()
//     .required('Otp is required')
//     .max(6, 'Otp must be at least 6 characters')
//     .min(6, 'Otp must be at more 6 characters')
// });
