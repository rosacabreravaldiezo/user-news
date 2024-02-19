import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { createUser, UserInterface, ResponseData } from "../../models";
import { TextField, Box, Paper, Button, Stack, LinearProgress, Alert } from '@mui/material';

const UserCreate: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserInterface>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    imageUrl: ''
  });
  const [isVisible, setIsVisible] = useState(false);
  const [alertData, setAlertData] = useState<ResponseData<null>>({ success: '', message: '', data: null });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSend = async (): Promise<void> => {
    setIsVisible(true);
    const response = await createUser(formData);
    setIsVisible(false);
    setAlertData(response);

    setTimeout(() => navigate('/users'), 1000);
  };

  return (
    <>
      {isVisible && <Box sx={{ width: '100%' }}><LinearProgress /></Box>}
      {alertData.success !== '' && <Alert variant="filled"> {alertData.message} {t('redirect')} </Alert>}
      <br />
      <Paper elevation={2} style={{ padding: '10px' }}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '98%' },
          }}
          autoComplete="off"
        >
          <div>
            <TextField
              required
              id="outlined-required"
              label={t('first_name')}
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <TextField
              required
              id="outlined-required"
              label={t('last_name')}
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <TextField
            required
            id="outlined-required"
            label={t('email')}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            required
            id="outlined-required"
            label={t('phone_number')}
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            fullWidth
          />
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="success" type="button" onClick={handleSend}>
              {t('save')}
            </Button>
            <Button variant="outlined" color="error" type="button" onClick={() => navigate(-1)}>
              {t('cancel')}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </>


  );
}

export default UserCreate;