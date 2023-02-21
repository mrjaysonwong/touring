import { useState, useContext, useEffect } from 'react';
import { styled } from '@mui/system';
import { Box, Typography, Switch, Divider, Alert } from '@mui/material';
import { DataContext } from '@pages/account/profile';
import { useForm, Controller } from 'react-hook-form';
import { AlertBox } from '@utils/common/AlertBox';
import { updateUser } from '@utils/apis/users/api';

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
  const { data, routerReplace } = useContext(DataContext);
  const userData = data.result;

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
      const data = await updateUser(userId, values);

      setChecked(data.subscribe);
      setToggle(false);
      routerReplace();
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
            Touring will send you weekly emails, new tours and company updates
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
