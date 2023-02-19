import { useState, useContext } from 'react';
import { styled } from '@mui/system';
import { Box, Typography, Button, TextField, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { languageSchema } from '@utils/yup/account-settings/PreferencesSchema';
import { AlertBox } from '@utils/common/AlertBox';
import { DataContext } from '@pages/account/profile';
import { LoadSkeleton } from '@components/placeholder/skeleton/LoadingSkeleton';
import { updateUser } from '@utils/apis/users/api';
import { tourLanguages } from '@src/tour_languages';

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

export default function Language() {
  const { data, routerReplace } = useContext(DataContext);
  const userData = data.result;

  const [editForm, setEditForm] = useState(false);
  const [isSave, setIsSave] = useState(false);

  const [selectedValue, setSelectedValue] = useState('');

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(languageSchema) });

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

      setSelectedValue(data.tourLanguage);
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
              <Typography variant="body1">Tour Guide Language</Typography>
              <Button variant="text" onClick={handleClick}>
                {!userData.tourLanguage ? 'Add' : 'Edit'}
              </Button>
            </SingleRow>
            {!userData.tourLanguage ? (
              <Typography variant="body1" sx={{ color: 'gray' }}>
                Not Provided
              </Typography>
            ) : (
              <Typography variant="body1">
                {isSave ? selectedValue : userData.tourLanguage}
              </Typography>
            )}
          </>
        )}

        {editForm && (
          <form>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Tour Guide Language
            </Typography>

            <Box>
              <TextField
                select
                name="tourLanguage"
                label="Select a language"
                defaultValue={userData.tourLanguage}
                onChange={handleSelectChange}
                error={Boolean(errors.tourLanguage)}
                {...register('tourLanguage')}
                sx={{ width: '100%' }}
              >
                <MenuItem value="" disabled>
                  Select a language
                </MenuItem>

                {tourLanguages.map((country, index) => {
                  return (
                    <MenuItem key={index} value={country.language}>
                      {country.language}
                    </MenuItem>
                  );
                })}
              </TextField>

              <Typography variant="body2" color="error">
                {errors.tourLanguage?.message}
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
