import { useState, useEffect, useContext } from 'react';
import { styled } from '@mui/system';
import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
  Autocomplete,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDebounce } from 'use-debounce';
import { DataContext } from '@pages/account/profile';
import { useForm } from 'react-hook-form';
import { homeTownSchema } from '@utils/yup/account-settings/PInfoSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { AlertBox } from '@utils/common/AlertBox';
import { patchUser } from '@utils/apis/users/patchUser';
import { getCities } from '@utils/apis/cities/getCities';

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

export default function HomeTown() {
  const { session } = useContext(DataContext);
  const userData = session.result;

  const router = useRouter();
  const [isSave, setIsSave] = useState(false);
  const [editForm, setEditForm] = useState(false);

  const [text, setText] = useState(null);
  const [value] = useDebounce(text, 1000);
  const [suggestions, setSuggestions] = useState([]);

  const uniqueCities = suggestions.filter(
    (option, index) =>
      suggestions.findIndex((i) => i.name === option.name) === index
  );

  const [isLoading, setIsLoading] = useState(false);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(homeTownSchema) });

  const getData = async () => {
    try {
      // return if suggestions value result is empty to avoid error
      if (!value) {
        return;
      }

      const data = await getCities(value);

      setSuggestions(data);
      setIsLoading(false);
      setShowError(false);
    } catch (error) {
      setShowError(true);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleClick = () => {
    setEditForm(true);
    setIsSave(false);
    setShowError(false);
  };

  const handleCancel = () => {
    setEditForm(false);
  };

  const handleChange = (event) => {
    setIsLoading(true);
    setText(event.target.value);
  };

  const onSubmit = async (values) => {
    const userId = userData._id;

    try {
      const data = await patchUser(userId, values);

      if (data && data.success) {
        setText(data.homeTown);
        setIsSave(true);
        setEditForm(false);

        router.replace(router.asPath, undefined, { scroll: false });
      } else {
        throw new Error(data.error);
      }
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
              <Typography variant="body1">Home Town</Typography>
              <Button variant="text" onClick={handleClick}>
                {!userData.homeTown ? 'Add' : 'Edit'}
              </Button>
            </SingleRow>

            {!userData.homeTown ? (
              <Typography variant="body1" sx={{ color: 'gray' }}>
                Not Provided
              </Typography>
            ) : (
              <Typography variant="body1">
                {isSave ? text : userData.homeTown}
              </Typography>
            )}
          </>
        )}

        {editForm && (
          <Box
            sx={{
              position: 'relative',
            }}
          >
            <form autoComplete="off">
              <Typography variant="body1" sx={{ mb: 1 }}>
                Home Town
              </Typography>

              <Autocomplete
                loading={Boolean(isLoading)}
                disableClearable
                noOptionsText={`Can't find it? Try a larger town or city nearby.`}
                defaultValue={userData.homeTown}
                isOptionEqualToValue={(option, value) =>
                  option.name === value.name
                }
                options={uniqueCities.map(
                  (option) => `${option.name}, ${option.country}`
                )}
                {...register('homeTown')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="homeTown"
                    value={text}
                    error={Boolean(errors.homeTown)}
                    onChange={handleChange}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <InputAdornment position="end" sx={{ mr: -3 }}>
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              <Typography variant="body2" color="error">
                {errors.homeTown?.message}
              </Typography>

              {showError && (
                <AlertBox severity="error">{errorMessage}</AlertBox>
              )}

              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleSubmit(onSubmit)}
                  disabled={showError || isSubmitting}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  sx={{ ml: 1 }}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          </Box>
        )}

        {isSave && <AlertBox severity="success">Success</AlertBox>}
      </Wrapper>
    </>
  );
}
