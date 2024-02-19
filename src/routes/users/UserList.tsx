import React, { useState } from 'react';
import { Link, useLoaderData } from "react-router-dom";
import { Avatar, Box, Button, ButtonGroup, Grid, LinearProgress, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FeedIcon from '@mui/icons-material/Feed';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { UserInterface, getUsers, ResponseData, deleteUser } from "../../models";
import { useTranslation } from "react-i18next";

export async function loader() {
  const users = await getUsers();
  return { users };
}

const UserList: React.FC = () => {
  const { t } = useTranslation();
  const { users } = useLoaderData() as { users: UserInterface[] };
  const [isVisible, setIsVisible] = useState(false);
  const [alertData, setAlertData] = useState<ResponseData<null>>({ success: '', message: '', data: null });
  const columns: GridColDef[] = [
    {
      field: 'imageUrl',
      headerName: '',
      width: 90,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Avatar alt="" src={params.value} />
      ),
    },
    {
      field: 'firstName',
      headerName: t('first_name'),
      flex: 1
    },
    {
      field: 'lastName',
      headerName: t('last_name'),
      flex: 1
    },
    {
      field: 'id',
      headerName: t('action'),
      width: 200,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <>
          <ButtonGroup variant="text" aria-label="Basic button group">
            <Button>
              <Link to={`/users/${params.value}`}>
                <FeedIcon fontSize="inherit" />
              </Link>
            </Button>
            <Button>
              <Link to={`/users/${params.value}/edit`}>
                <EditIcon fontSize="inherit" />
              </Link>
            </Button>
            <Button type="button" onClick={() => handleDelete(params.value!)}>
              <DeleteIcon fontSize="inherit" />
            </Button>
          </ButtonGroup>
        </>
      )
    }
  ];

  const handleDelete = async (id: string): Promise<void> => {
    setIsVisible(true);
    const response = await deleteUser(parseInt(id));
    setIsVisible(false);
    setAlertData(response);

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Grid container spacing={2}>
        <Grid item xs={11}></Grid>
        <Grid item xs={1}>
          <Link to="/user">
            <Button variant="outlined">{t('new')}</Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          {isVisible && <Box sx={{ width: '100%' }}><LinearProgress /></Box>}
          {alertData.success !== '' && <Alert variant="filled"> {alertData.message} {t('redirect')}</Alert>}
        </Grid>
      </Grid>

      <br/>

      <DataGrid
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          }
        }}
        pageSizeOptions={[5, 10, 15]}
        getRowId={(row: any) => row.id}
      />
    </Box>
  );
};

export default UserList;