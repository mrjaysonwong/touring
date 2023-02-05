import { useState, useContext, useEffect } from 'react';
import { styled } from '@mui/system';

import { Box, Typography, Switch, Divider, Alert } from '@mui/material';
import { DataContext } from '@pages/account/profile';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/router';
import { AlertBox } from 'helpers/utils/common/AlertBox';
import { patchUser } from 'helpers/utils/apis/users/patchUser';

const Wrapper = styled(Box)({
  '&:not(:last-child)': {
    borderBottom: '1px solid var(--dividerColor)',
  },
  padding: '1rem 0',
  '.typography': {
    display: 'flex',
    alignItems: 'center',
  },
});

const SingleRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0.5rem 0',
});

export default function Subscribe() {
  const { session } = useContext(DataContext);
  const userData = session.result;

  const router = useRouter();

  const [checked, setChecked] = useState(userData.subscribe);
  const [open, setOpen] = useState(true);
  const [toggle, setToggle] = useState('');

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // render error once navigate to other tabs
  useEffect(() => {
    return () => {
      setOpen(false);
    };
  }, []);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    const userId = userData._id;

    try {
      setToggle(true);
      const data = await patchUser(userId, values);

      setChecked(data.subscribe);
      setToggle(false);

      router.replace(router.asPath, undefined, { scroll: false });
    } catch (error) {
      setShowError(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <Wrapper>
        <Alert severity="info">
          <Typography variant="body1">
            Touring will send you weekly emails with travel inspirations, tips,
            recommendations and company updates
          </Typography>
        </Alert>

        <SingleRow>
          <Typography variant="body1" className="typography">
            Marketing emails
          </Typography>
          <form>
            <SingleRow>
              <Controller
                control={control}
                name="switch"
                render={() => {
                  return (
                    <Switch
                      disabled={isSubmitting}
                      checked={checked}
                      onChange={(event, val) => {
                        if (val) {
                          setValue('subscribe', true);
                        } else {
                          setValue('subscribe', false);
                        }
                        return handleSubmit(onSubmit)();
                      }}
                    />
                  );
                }}
              />
              <Typography
                variant="body1"
                className="typography"
                name="subscribe"
                {...register('subscribe')}
              >
                {`${userData.subscribe ? 'On' : 'Off'}`}
              </Typography>
            </SingleRow>
          </form>
        </SingleRow>

        <Divider />

        {toggle && showError && (
          <AlertBox severity="error" open={open}>
            {errorMessage}
          </AlertBox>
        )}
      </Wrapper>
    </>
  );
}
