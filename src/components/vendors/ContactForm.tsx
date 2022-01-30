// import node_modules
import * as React from 'react';
// import * as PropTypes from 'prop-types';

// import types
// import { RevueFormType } from '../../types';

// import components
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Text from '../atoms/Text';
import Textarea from '../atoms/Textarea';

// import modules
// import { revueFormPropTypes } from '../../modules/prop-types';

// import styles
import styles from './ContactForm.module.css';

const content = {
  name: {
    labelText: 'Your name *',
    placeholderText: 'Enter name …',
  },
  email: {
    labelText: 'Your email address *',
    placeholderText: 'Enter email …',
  },
  message: {
    labelText: 'How can I help? *',
    placeholderText: 'Enter message …',
  },
  submit: {
    labelText: 'Send message',
  },
  availability: {
    noteText: "I'm available for new projects from March 2022.",
  },
  privacy: {
    text: 'By sending the form, you agree to the transfer and storage of your data within the scope of our <a href="https://www.michaelschmitt.io/privacy-policy/">privacy policy</a>.',
  },
};

// define components
const ContactForm: React.FunctionComponent<{
  // content: RevueFormType;
}> = () => {
  // init states
  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [message, setMessage] = React.useState<string>('');

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

      const res = await fetch('/api/contact', {
        body: JSON.stringify({ name, email, message }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      });

      const result = await res.json();
      console.log(result);
    },
    [name, email, message],
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

      <div className={styles.privacyContainer}>
        <Text customClasses={styles.privacyText} size="small">
          {content.privacy.text}
        </Text>
      </div>
    </form>
  );
};

ContactForm.propTypes = {
  // content: revueFormPropTypes,
};

export default ContactForm;
