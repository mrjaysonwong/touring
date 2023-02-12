import { useState, useContext } from 'react';
import { styled } from '@mui/system';
import { useRouter } from 'next/router';
import { Box, Button, Typography, TextField } from '@mui/material';
import dayjs from 'dayjs';
import { DataContext } from '@pages/account/profile';
import { dateOfBirthSchema } from '@utils/yup/account-settings/PInfoSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { patchUser } from '@utils/apis/users/patchUser';
import { AlertBox } from '@utils/common/AlertBox';

const Wrapper = styled(Box)({
  '&:not(:last-child)': {
    borderBottom: '1px solid var(--dividerColor)',
  },
  padding: '1rem 0',
});

const SingleRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
});

export default function DateOfBirth() {
  const { session } = useContext(DataContext);
  const userData = session.result;

  const router = useRouter();

  const [editForm, setEditForm] = useState(false);
  const [isSave, setIsSave] = useState(false);

  const [date, setDate] = useState(null);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(dateOfBirthSchema),
  });

  const handleClick = () => {
    setEditForm(true);
    setIsSave(false);
    setShowError(false);
  };

  const handleChange = (newValue) => {
    setDate(newValue);
  };

  const handleCancel = () => {
    setEditForm(false);
  };

  const onSubmit = async (values) => {
    const userId = userData._id;

    try {
      const data = await patchUser(userId, values);

      setDate(data.dateOfBirth);
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
              <Typography variant="body1">Date of Birth</Typography>
              <Button variant="text" onClick={handleClick}>
                {!userData.dateOfBirth ? 'Add' : 'Edit'}
              </Button>
            </SingleRow>

            {!userData.dateOfBirth ? (
              <Typography variant="body1" sx={{ color: 'gray' }}>
                Not Provided
              </Typography>
            ) : (
              <Typography variant="body1">
                {isSave
                  ? dayjs(date).format('MM/DD/YYYY')
                  : dayjs(userData.dateOfBirth).format('MM/DD/YYYY')}
              </Typography>
            )}
          </>
        )}

        {editForm && (
          <form>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Date of Birth
            </Typography>

            <TextField
              name="dateOfBirth"
              type="date"
              defaultValue={userData.dateOfBirth}
              onChange={handleChange}
              error={Boolean(errors.dateOfBirth)}
              {...register('dateOfBirth')}
            />

            <Typography variant="body2" color="error">
              {errors.dateOfBirth?.message}
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
              >
                Save
              </Button>
              <Button variant="outlined" onClick={handleCancel} sx={{ ml: 1 }}>
                Cancel
              </Button>
            </Box>

            {showError && <AlertBox severity="error">{errorMessage}</AlertBox>}
          </form>
        )}
        {isSave && <AlertBox severity="success">Success</AlertBox>}
      </Wrapper>
    </>
  );
}
