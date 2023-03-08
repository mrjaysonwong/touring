import { styled } from '@mui/system';
import { useState, useContext } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  ListSubheader,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { DataContext } from '@pages/account/profile';
import {
  continentAmericas,
  continentAPAC,
  continentEurope,
  continentAfrica,
} from '@src/country_languages';
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

const StyledSubheader = styled(ListSubheader)({
  textTransform: 'uppercase',
});

export default function SiteLanguage() {
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

      setSelectedValue(data.languageCountry);
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
      <Wrapper>
        {!editForm && (
          <>
            <SingleRow>
              <Typography variant="body1">
                Language and Country
              </Typography>
              <Button variant="text" onClick={handleClick}>
                {!userData.languageCountry ? 'Add' : 'Edit'}
              </Button>
            </SingleRow>

            {!userData.languageCountry ? (
              <Typography variant="body1" sx={{ color: 'gray' }}>
                Not Provided
              </Typography>
            ) : (
              <Typography variant="body1">
                {isSave ? selectedValue : userData.languageCountry}
              </Typography>
            )}
          </>
        )}

        {editForm && (
          <form>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Language and Country
            </Typography>

            <Box>
              <TextField
                select
                name="languageCountry"
                defaultValue={userData.languageCountry}
                onChange={handleSelectChange}
                {...register('languageCountry')}
                sx={{ width: '100%' }}
              >
                <StyledSubheader>The Americas</StyledSubheader>

                {continentAmericas.map((country) => {
                  return (
                    <MenuItem key={country.id} value={country.language}>
                      {country.language}
                    </MenuItem>
                  );
                })}

                <StyledSubheader>Europe</StyledSubheader>

                {continentEurope.map((country) => {
                  return (
                    <MenuItem key={country.id} value={country.language}>
                      {country.language}
                    </MenuItem>
                  );
                })}

                <StyledSubheader>Asia Pacific</StyledSubheader>

                {continentAPAC.map((country) => {
                  return (
                    <MenuItem key={country.id} value={country.language}>
                      {country.language}
                    </MenuItem>
                  );
                })}

                <StyledSubheader>Africa</StyledSubheader>

                {continentAfrica.map((country) => {
                  return (
                    <MenuItem key={country.id} value={country.language}>
                      {country.language}
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
