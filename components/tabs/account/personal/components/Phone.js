import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { styled } from '@mui/system';
import { Box, Button, Typography, TextField, MenuItem } from '@mui/material';
import { countryCodes } from '@src/country_codes';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { phoneSchema } from '@utils/yup/account-settings/PInfoSchema';
import { AlertBox } from '@utils/common/AlertBox';
import { DataContext } from '@pages/account/profile';
import { formatNum, formatPatternNum } from '@utils/common/Format';
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

export default function Phone() {
  const { data, session } = useContext(DataContext);
  const userData = data.result;

  const router = useRouter();

  const phoneCode = userData.phone.areaCode;
  const phoneNum = userData.phone.phoneNumber;

  const [editForm, setEditForm] = useState(false);
  const [isSave, setIsSave] = useState(false);

  const [selectedValue, setSelectedValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(phoneSchema),
  });

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const numericValue = formatNum(inputValue);
    setInputValue(numericValue);
  };

  const handleKeyPress = (event) => {
    formatPatternNum(event);
  };

  const handleClick = () => {
    setEditForm(true);
    setIsSave(false);
    setShowError(false);
  };

  const handleCancel = () => {
    setEditForm(false);
  };

  const onSubmit = async (values) => {
    const userId = userData._id;

    try {
      const data = await updateUser(userId, values);

      setSelectedValue(data.phone.areaCode);
      setInputValue(data.phone.phoneNumber);
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
              <Typography variant="body1">Phone Number</Typography>
              <Button variant="text" onClick={handleClick}>
                {!phoneNum ? 'Add' : 'Edit'}
              </Button>
            </SingleRow>
            {!phoneNum ? (
              <Typography variant="body1" sx={{ color: 'gray' }}>
                Not Provided
              </Typography>
            ) : (
              <Typography variant="body1">
                {isSave
                  ? `+${formatNum(selectedValue)} ${inputValue}`
                  : `+${formatNum(phoneCode)} ${phoneNum}`}
              </Typography>
            )}
          </>
        )}

        {editForm && (
          <form>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Phone Number
            </Typography>

            <Box sx={{ display: 'flex' }}>
              <Box sx={{ display: 'block', width: '50%', mr: 2 }}>
                <TextField
                  select
                  name="phone.areaCode"
                  defaultValue={phoneCode}
                  label="Select a country"
                  onChange={handleSelectChange}
                  error={Boolean(errors.phone && errors.phone.areaCode)}
                  {...register('phone.areaCode')}
                  sx={{ width: '100%', mr: 2 }}
                >
                  <MenuItem value="" disabled>
                    Select a country
                  </MenuItem>

                  {countryCodes.map((country, index) => {
                    return (
                      <MenuItem
                        key={index}
                        value={`${country.dial_code} ${country.name}`}
                      >
                        {`${country.dial_code} ${country.name}`}
                      </MenuItem>
                    );
                  })}
                </TextField>

                <Typography variant="body2" color="error">
                  {errors.phone && errors.phone.areaCode?.message}
                </Typography>
              </Box>

              <Box sx={{ display: 'block', width: '50%' }}>
                <TextField
                  autoComplete="off"
                  name="phone.phoneNumber"
                  type="text"
                  defaultValue={phoneNum}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  error={Boolean(errors.phone && errors.phone.phoneNumber)}
                  {...register('phone.phoneNumber')}
                  sx={{ width: '100%' }}
                />

                <Typography variant="body2" color="error">
                  {errors.phone && errors.phone.phoneNumber?.message}
                </Typography>
              </Box>
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
