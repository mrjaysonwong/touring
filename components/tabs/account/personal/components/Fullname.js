import { useState, useContext } from 'react';
import { styled } from '@mui/system';
import { Box, Button, Typography, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { nameSchema } from '@utils/yup/account-settings/PInfoSchema';
import { AlertBox } from '@utils/common/AlertBox';
import { useRouter } from 'next/router';
import { DataContext } from '@pages/account/profile';
import { patchUser } from '@utils/apis/users/patchUser';

const Wrapper = styled(Box)({
  '&:not(:last-child)': {
    borderBottom: '1px solid var(--dividerColor)',
  },
  padding: '1rem 0',
  '& .firstName, .lastName': {
    width: '100%',
  },
});

const SingleRowForm = styled(Box)({
  display: 'block',
  justifyContent: 'space-between',
  width: '100%',
  marginRight: 16,
});

const SingleRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
});

export default function Fullname() {
  const { data, session } = useContext(DataContext);
  const userData = data.result;

  const router = useRouter();

  const [isSave, setIsSave] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(nameSchema),
  });

  const handleClick = () => {
    setEditForm(true);
    setIsSave(false);
    setShowError(false);
  };

  const handleCancel = () => {
    setEditForm(false);
  };

  const handleFnameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLnameChange = (event) => {
    setLastName(event.target.value);
  };

  const onSubmit = async (values) => {
    const userId = userData._id;

    try {
      const data = await patchUser(userId, values);

      setFirstName(data.firstName);
      setLastName(data.lastName);
      setIsSave(true);
      setEditForm(false);

      router.replace(router.asPath, undefined, { scroll: false });
    } catch (error) {
      setShowError(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <Wrapper>
        {!editForm && (
          <>
            <SingleRow>
              <Typography variant="body1" sx={{ my: 1 }}>
                Full Name
              </Typography>
              <Button variant="text" onClick={handleClick}>
                Edit
              </Button>
            </SingleRow>
            <Typography variant="body1">
              {isSave ? `${firstName} ${lastName}` : session.user.name}
            </Typography>
          </>
        )}

        {editForm && (
          <form>
            <Box sx={{ display: { xs: 'block', md: 'flex' } }}>
              <SingleRowForm>
                <Typography variant="body1" sx={{ my: 1 }}>
                  First Name
                </Typography>

                <TextField
                  autoComplete="off"
                  id="firstName"
                  className="firstName"
                  name="firstName"
                  defaultValue={userData.firstName}
                  error={Boolean(errors.firstName)}
                  onChange={handleFnameChange}
                  {...register('firstName')}
                />

                <Typography variant="body2" color="error">
                  {errors.firstName?.message}
                </Typography>
              </SingleRowForm>
              <SingleRowForm>
                <SingleRow>
                  <Typography variant="body1" sx={{ my: 1 }}>
                    Last Name
                  </Typography>
                </SingleRow>

                <TextField
                  autoComplete="off"
                  id="lastName"
                  className="lastName"
                  name="lastName"
                  defaultValue={userData.lastName}
                  error={Boolean(errors.lastName)}
                  onChange={handleLnameChange}
                  {...register('lastName')}
                />

                <Typography variant="body2" color="error">
                  {errors.lastName?.message}
                </Typography>
              </SingleRowForm>
            </Box>

            {showError && <AlertBox severity="error">{errorMessage}</AlertBox>}

            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                type="button"
                onClick={handleCancel}
                sx={{ ml: 1 }}
              >
                Cancel
              </Button>
            </Box>
          </form>
        )}

        {isSave && <AlertBox severity="success">Success</AlertBox>}
      </Wrapper>
    </>
  );
}
