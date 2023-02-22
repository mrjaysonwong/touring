import { useState, useContext } from 'react';
import { styled } from '@mui/system';
import { Box, Typography, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { specialReqSchema } from '@utils/yup/account-settings/PreferencesSchema';
import { AlertBox } from '@utils/common/AlertBox';
import { DataContext } from '@pages/account/profile';
import { LoadSkeleton } from '@components/loaders/skeleton/LoadingSkeleton';
import { updateUser } from '@utils/apis/users/api';

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

export default function SpecialRequirements() {
  const { data, routerReplace } = useContext(DataContext);
  const userData = data.result;

  const [editForm, setEditForm] = useState(false);
  const [isSave, setIsSave] = useState(false);

  const [inputValue, setInputValue] = useState('');

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(specialReqSchema) });

  const handleClick = () => {
    setEditForm(true);
    setIsSave(false);
    setShowError(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCancel = () => {
    setEditForm(false);
  };

  const onSubmit = async (values) => {
    const userId = userData._id;

    try {
      const data = await updateUser(userId, values);

      setInputValue(data.specialReq);
      setIsSave(true);
      setEditForm(false);
      routerReplace();
    } catch (error) {
      setShowError(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      {/* <LoadSkeleton loading /> */}

      <Wrapper>
        {!editForm && (
          <>
            <SingleRow>
              <Typography variant="body1" sx={{ my: 1 }}>
                Special Requirements
              </Typography>
              <Button variant="text" onClick={handleClick}>
                {!userData.specialReq ? 'Add' : 'Edit'}
              </Button>
            </SingleRow>
            {!userData.specialReq ? (
              <Typography variant="body1" sx={{ color: 'gray' }}>
                Not Provided
              </Typography>
            ) : (
              <Typography variant="body1">
                {isSave ? inputValue : userData.specialReq}
              </Typography>
            )}
          </>
        )}

        {editForm && (
          <form>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Special Requirements
            </Typography>

            <Box>
              <TextField
                type="text"
                name="specialReq"
                multiline
                defaultValue={userData.specialReq}
                placeholder="Dietary restrictions, allergy, accessibility needs, etc."
                rows={4}
                onChange={handleInputChange}
                error={Boolean(errors.specialReq)}
                {...register('specialReq')}
                sx={{ width: '100%' }}
              />

              <Typography variant="body2" color="error">
                {errors.specialReq?.message}
              </Typography>
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
