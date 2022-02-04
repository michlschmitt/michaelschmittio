// import node_modules
import * as React from 'react';
import * as PropTypes from 'prop-types';

// import types
import { RevueFormType, TextAlignment, TextAlignmentEnum } from '../../types';

// import components
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Text from '../atoms/Text';

// import modules
import { revueFormPropTypes } from '../../modules/prop-types';

// import styles
import styles from './RevueForm.module.css';

// define components
const RevueForm: React.FunctionComponent<{ alignment?: TextAlignment; content: RevueFormType }> = ({
  alignment,
  content,
}) => {
  // init states
  const [email, setEmail] = React.useState<string>('');

  // init methods
  const onChange = React.useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  const onTrackSubmission = React.useCallback(async () => {
    try {
      // get csrf token
      const csrfResponse = await fetch('/api/csrf');
      const csrfResult = await csrfResponse.json();

      // track event
      await fetch('/api/newsletter', {
        body: JSON.stringify({}),
        headers: { 'Content-Type': 'application/json', 'XSRF-TOKEN': csrfResult.CSRFToken },
        method: 'POST',
      });
    } catch (error) {
      // TODO: implement Sentry or similar to log in production
      console.error(error);
    }
  }, []);

  // render form
  return (
    <div className={styles.formContainer}>
      <form
        action={content.action}
        className={styles.form}
        id="revue-form"
        method="post"
        name="revue-form"
        target="_blank"
      >
        <div className={styles.inputContainer}>
          <Input
            customInputClasses={styles.input}
            id="member_email"
            name="member[email]"
            onChange={onChange}
            placeholderText={content.email.placeholder}
            type="email"
            value={email}
          />

          <Button
            color="gradient"
            id="member_submit"
            name="member[subscribe]"
            onClick={onTrackSubmission}
            size="medium"
            text={content.submit.label}
            type="submit"
          />
        </div>

        <div className={styles.privacyContainer}>
          <Text alignment={alignment} isHelpText size="small">
            {content.privacy.html}
          </Text>
        </div>
      </form>
    </div>
  );
};

RevueForm.defaultProps = {
  alignment: 'left',
};

RevueForm.propTypes = {
  alignment: PropTypes.oneOf(Object.values(TextAlignmentEnum)),
  content: revueFormPropTypes,
};

export default RevueForm;
