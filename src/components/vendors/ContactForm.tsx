// import node_modules
import * as React from 'react';

// import types
import { ContactFormType } from '../../types';

// import components
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Text from '../atoms/Text';
import Textarea from '../atoms/Textarea';

// import modules
import { contactFormPropTypes } from '../../modules/prop-types';

// import styles
import styles from './ContactForm.module.css';

// define components
const ContactForm: React.FunctionComponent<{
  content: ContactFormType;
}> = ({ content }) => {
  // init states
  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [message, setMessage] = React.useState<string>('');
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  // init methods
  const onChange = React.useCallback((event) => {
    if (event.target.name === 'name') {
      setName(event.target.value);
    }
    if (event.target.name === 'email') {
      setEmail(event.target.value);
    }
    if (event.target.name === 'message') {
      setMessage(event.target.value);
    }
  }, []);

  const onSubmit = React.useCallback(
    async (event) => {
      // prevent default
      event.preventDefault();

      try {
        const res = await fetch('/api/contact', {
          body: JSON.stringify({ name, email, message }),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
        });

        const result = await res.json();

        // set error message
        if (!result?.success) {
          throw new Error('Something went wrong');

          // show success message
        } else {
          setName('');
          setEmail('');
          setMessage('');
          setErrorMessage(content.submit.success);
        }
      } catch (error) {
        setErrorMessage(content.error.submit);
      }
    },
    [content, name, email, message],
  );

  return (
    <form className={styles.form} id="contact-form" onSubmit={onSubmit}>
      <div className={styles.inputContainer}>
        <Input
          customInputClasses={styles.input}
          form="contact-form"
          id="name"
          labelText={content.name.labelText}
          name="name"
          onChange={onChange}
          placeholderText={content.name.placeholderText}
          type="text"
          value={name}
        />
      </div>

      <div className={styles.inputContainer}>
        <Input
          customInputClasses={styles.input}
          form="contact-form"
          labelText={content.email.labelText}
          name="email"
          onChange={onChange}
          placeholderText={content.email.placeholderText}
          type="email"
          value={email}
        />
      </div>
      <div className={styles.inputContainer}>
        <Textarea
          customInputClasses={styles.input}
          form="contact-form"
          labelText={content.message.labelText}
          name="message"
          onChange={onChange}
          placeholderText={content.message.placeholderText}
          value={message}
        />
      </div>

      <div className={styles.buttonContainer}>
        <Button
          color="black"
          form="contact-form"
          size="medium"
          text={content.submit.labelText}
          type="submit"
        />
      </div>

      <Text customClasses={styles.noteText} size="small">
        {content.availability.noteText}
      </Text>

      {errorMessage && (
        <div className={styles.errorContainer}>
          <Text>{errorMessage}</Text>
        </div>
      )}

      <div className={styles.privacyContainer}>
        <Text customClasses={styles.privacyText} size="small">
          {content.privacy.text}
        </Text>
      </div>
    </form>
  );
};

ContactForm.propTypes = {
  content: contactFormPropTypes,
};

export default ContactForm;
