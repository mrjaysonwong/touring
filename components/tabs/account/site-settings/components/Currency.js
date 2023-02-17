import { styled } from '@mui/system';
import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Button, TextField, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { DataContext } from '@pages/account/profile';
import { countryCurrency } from '@src/currency';
import { updateUser } from '@utils/apis/users/api';
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

export default function Currency() {
  const { data, session } = useContext(DataContext);
  const userData = data.result;

  const router = useRouter();

  const [editForm, setEditForm] = useState(false);
  const [isSave, setIsSave] = useState(false);

  const [selectedValue, setSelectedValue] = useState('');

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const handleClick = () => {
    setEditForm(true);
    setIsSave(false);
    setShowError(false);
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleCancel = () => {
    setEditForm(false);
  };

  const onSubmit = async (values) => {
    const userId = userData._id;

    try {
      const data = await updateUser(userId, values);

      setSelectedValue(data.currency);
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
              <Typography variant="body1">Currency</Typography>
              <Button variant="text" onClick={handleClick}>
                {!userData.currency ? 'Add' : 'Edit'}
              </Button>
            </SingleRow>

            {!userData.currency ? (
              <Typography variant="body1" sx={{ color: 'gray' }}>
                Not Provided
              </Typography>
            ) : (
              <Typography variant="body1">
                {isSave ? selectedValue : userData.currency}
              </Typography>
            )}
          </>
        )}

        {editForm && (
          <form>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Currency
            </Typography>

            <Box>
              <TextField
                select
                name="currency"
                defaultValue={userData.currency}
                onChange={handleSelectChange}
                {...register('currency')}
                sx={{ width: '100%' }}
              >
                {countryCurrency.map((country, index) => {
                  return (
                    <MenuItem key={index} value={country.currency}>
                      {country.currency}
                    </MenuItem>
                  );
                })}
              </TextField>
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
