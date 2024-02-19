import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { UserInterface, ResponseData, getUser, deleteUser } from "../../models";
import type { Params } from "react-router-dom";
import { Avatar, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Card, CardHeader, CardActions, CardContent, Box, LinearProgress, Alert } from '@mui/material';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';


export async function loader({ params }: { params: Params<"userId"> }) {
  const user = await getUser(params.userId || '');
  return { user };
}

const UserDetail = () => {
  const nav = useNavigate();
  const { user } = useLoaderData() as { user: UserInterface };
  const [isVisible, setIsVisible] = useState(false);
  const [alertData, setAlertData] = useState<ResponseData<null>>({ success: '', message: '', data: null });

  const handleDelete = async (): Promise<void> => {
    setIsVisible(true);
    const response = await deleteUser(user.id!);
    setIsVisible(false);
    setAlertData({ success: response.success, message: response.message, data: null });

    setTimeout(() => nav('/users'), 1000);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={10}></Grid>
        <Grid item xs={2}>
          <Button variant="outlined" onClick={() => nav(-1)}>&larr; Go back</Button>
        </Grid>
        <Grid item xs={12}>
          {isVisible && <Box sx={{ width: '100%' }}><LinearProgress /></Box>}
          {alertData.success !== '' && <Alert variant="filled"> {alertData.message}</Alert>}
        </Grid>
      </Grid>
      
      <br />

      <Card >
        <CardHeader
          avatar={
            <Avatar alt="" src={user.imageUrl} />
          }
          title={`${user.firstName} ${user.lastName}`}
        />
        <CardContent>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PhoneAndroidIcon />
                </ListItemIcon>
                <ListItemText primary={user.phoneNumber} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AlternateEmailIcon />
                </ListItemIcon>
                <ListItemText primary={user.email} />
              </ListItemButton>
            </ListItem>
          </List>
        </CardContent>
        <CardActions>
          <Button size="small">
            <Link to={`/users/${user.id}/edit`}>Edit</Link>
          </Button>
          <Button size="small" type="button" onClick={handleDelete}>Delete</Button>
        </CardActions>
      </Card>
    </>
  );
}

export default UserDetail;