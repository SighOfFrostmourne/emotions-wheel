import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Formik, Form, Field } from 'formik';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Button,
  Input,
  Flex,
  Text,
} from '@chakra-ui/core';

import SignupSchema from '@schemas/formValidations/signupFormValidations';
import Heading from '@components/shared/heading';
const SignupForm = ({ onSubmitSuccess, cancellable, onCancel, modal }) => {
  const [formErrorMessage, setFormErrorMessage] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  return (
    <>
      {submitSuccess ? (
        <>
          <Heading fontSize={modal ? 'xl' : '4xl'}>
            Thanks for signing up!
          </Heading>
          <Text fontSize={modal ? 'md' : '2xl'}>
            Check your inbox for a link to verify your email, then you'll be
            good to go
            {modal ? " – and don't worry, your entry is saved!" : '.'}
          </Text>
        </>
      ) : (
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validate={() => setFormErrorMessage(null)}
          validationSchema={SignupSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const res = await fetch('/api/user', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(values),
            });

            switch (res.status) {
              case 201:
                await onSubmitSuccess(res);
                setSubmitting(false);
                setSubmitSuccess(true);
                break;
              case 400:
                setSubmitting(false);
                setFormErrorMessage((await res.json()).message);
                break;
              default:
                setSubmitting(false);
                setFormErrorMessage('Something went wrong, please try again');
                break;
            }
          }}>
          {({ isSubmitting, isValidating, errors, dirty }) => (
            <Form>
              <Field name='name'>
                {({ field, form }) => (
                  <FormControl
                    mb={8}
                    isRequired
                    isInvalid={form.errors.name && form.touched.name}>
                    <Input
                      _invalid={{ boxShadow: 'none' }}
                      aria-label='Name'
                      variant='flushed'
                      {...field}
                      id='name'
                      type='text'
                      placeholder='Username'
                    />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='email'>
                {({ field, form }) => (
                  <FormControl
                    mb={8}
                    isRequired
                    isInvalid={form.errors.email && form.touched.email}>
                    <Input
                      _invalid={{ boxShadow: 'none' }}
                      aria-label='Email'
                      variant='flushed'
                      {...field}
                      id='email'
                      type='email'
                      placeholder='Email'
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    <FormHelperText fontSize='xs' id='email-helper-text'>
                      We won't share your email with anyone or send annoying
                      updates – this will only be used to help you manage your
                      account.
                    </FormHelperText>
                  </FormControl>
                )}
              </Field>
              <Field name='password'>
                {({ field, form }) => (
                  <FormControl
                    mb={8}
                    isRequired
                    isInvalid={form.errors.password && form.touched.password}>
                    <Input
                      _invalid={{ boxShadow: 'none' }}
                      aria-label='Password'
                      variant='flushed'
                      {...field}
                      id='password'
                      type='password'
                      placeholder='Password'
                    />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <FormControl isInvalid={formErrorMessage}>
                <FormErrorMessage>{formErrorMessage}</FormErrorMessage>
                <Flex justifyContent='space-between'>
                  <Button
                    mt={4}
                    variantColor='green'
                    isDisabled={
                      !dirty ||
                      Object.entries(errors).length ||
                      isSubmitting ||
                      isValidating
                    }
                    isLoading={isSubmitting}
                    loadingText='Signing up'
                    type='submit'>
                    Sign up
                  </Button>
                  {cancellable && (
                    <Button
                      mt={4}
                      variant='ghost'
                      isDisabled={isSubmitting || isValidating}
                      type='button'
                      onClick={onCancel}>
                      Cancel
                    </Button>
                  )}
                </Flex>
              </FormControl>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

SignupForm.propTypes = {
  onSubmitSuccess: PropTypes.func.isRequired,
  cancellable: PropTypes.bool,
  onCancel: PropTypes.func,
  modal: PropTypes.bool,
};

export default SignupForm;
