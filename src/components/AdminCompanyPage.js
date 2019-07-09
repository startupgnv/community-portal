import React from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import { db } from '../firebase';
import { useAdminContainer } from './AdminPageContainer';
import UploadAvatar from './UploadAvatar';
import UploadCoverImage from './UploadCoverImage';

const useStyles = makeStyles({
  avatar: {
    transform: 'translate(30px, -70px)',
    position: 'absolute',
    '& .img': {
      border: '2px solid white'
    }
  }
});

const AdminCompanyPage = ({
  match: {
    params: { companyID }
  }
}) => {
  const [
    { name = 'UNNAMED COMPANY', coverImg = '', logoImg = '' } = {},
    loading
  ] = useDocumentData(db.doc(`companies/${companyID}`), {
    idField: 'companyID'
  });

  const classes = useStyles();

  const backTo = '/admin/companies';
  useAdminContainer({ backTo, loading });

  if (loading) {
    return false;
  }

  console.log('rendering again', coverImg);
  return (
    <Grid container justify="center">
      <Grid item md={8} xs={12}>
        <UploadCoverImage
          src={coverImg}
          onUploadComplete={coverImg => {
            console.log('uploaded', coverImg);
            db.doc(`companies/${companyID}`).update({ coverImg });
          }}
        />
        <UploadAvatar
          src={logoImg}
          className={classes.avatar}
          onUploadComplete={logoImg =>
            db.doc(`companies/${companyID}`).update({ logoImg })
          }
        />
        <Box display="flex" flexDirection="row-reverse">
          <IconButton
            component={Link}
            to={`/admin/companies/${companyID}/edit`}
          >
            <EditIcon />
          </IconButton>
        </Box>
        <Box m={2}>
          <Typography variant="h4">{name}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AdminCompanyPage;
