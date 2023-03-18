import * as PropTypes from 'prop-types';
import React from 'react';

import { ConvertKitFormType, TextAlignment, TextAlignmentEnum } from '../../types';

import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Text from '../atoms/Text';
import Toast from '../atoms/Toast';

import { convertKitPropTypes } from '../../modules/prop-types';

import styles from './ConvertKitForm.module.css';
import classNames from 'classnames';

const ConvertKitForm: React.FunctionComponent<{
  alignment?: TextAlignment;
  content: ConvertKitFormType;
}> = ({ alignment, content }) => {
  const [email, setEmail] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [toastState, setToastState] = React.useState<boolean>(false);
  const [errorState, setErrorState] = React.useState<boolean>(false);

  const onChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }, []);

  const onSubmit = React.useCallback(
    async (event: React.FormEvent) => {
      try {
        event.preventDefault();

        // show spinner
        setLoading(true);

        // get csrf token
        const csrfResponse = await fetch('/api/csrf');
        const csrfResult = await csrfResponse.json();

        // track event
        await fetch('/api/newsletter', {
          body: JSON.stringify({ email }),
          headers: { 'Content-Type': 'application/json', 'XSRF-TOKEN': csrfResult.CSRFToken },
          method: 'POST',
        });

        // reset state
        setErrorState(false);
        setToastState(true);
        setLoading(false);
        setEmail('');
      } catch (error) {
        setErrorState(true);
        setToastState(true);
        setLoading(false);
      }
    },
    [email],
  );

  return (
    <div className={styles['form-container']}>
      <form
        className={styles['form']}
        id="convertkit-form"
        method="post"
        name="convertkit-form"
        onSubmit={onSubmit}
      >
        <div className={styles['input-container']}>
          <Input
            customInputClasses={styles['input']}
            id="email"
            name="email"
            onChange={onChange}
            placeholderText={content.email.placeholder}
            type="email"
            value={email}
          />

          <Button
            color="gradient"
            isLoading={loading}
            size="medium"
            text={content.submit.label}
            type="submit"
          />
        </div>

        <div className={classNames(styles['privacy-container'], styles[`is-${alignment}`])}>
          <Text alignment={alignment} isHelpText size="small">
            {content.privacy.html}
          </Text>
        </div>
      </form>

      <Toast
        handleClose={() => setToastState(false)}
        isOpen={toastState}
        variant={errorState ? 'error' : 'success'}
      >
        {errorState ? content.submit.error : content.submit.success}
      </Toast>
    </div>
  );
};

ConvertKitForm.defaultProps = {
  alignment: 'left',
};

ConvertKitForm.propTypes = {
  alignment: PropTypes.oneOf(Object.values(TextAlignmentEnum)),
  content: convertKitPropTypes,
};

export default ConvertKitForm;
