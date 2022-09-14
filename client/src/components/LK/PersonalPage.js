import React, { useEffect, useState } from 'react';
import { Container, Avatar, IconButton } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import './PersPage.css';
import { useDispatch, useSelector } from 'react-redux';
import EditForm from './EditForm';
import { getUserPhotoThunk } from '../../redux/actions/photoActions';
import LocAndTrip from './LocAndTrip';
// import { useSelector } from 'react-redux';

export default function PersonalPage() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  const [editFormState, setEditFormState] = useState(false);
  const clickEditForm = () => {
    setEditFormState(!editFormState);
    console.log('!!', editFormState);
  };
  const { photoUser } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getUserPhotoThunk(auth.id));
  }, []);
  console.log('redux photoUser in pers page', photoUser);

  //   const user = useSelector((state) => state);
  //   const photoUser = useSelector((state) => state);

  return (
    <div className="globalpersonal">
      <Container
        maxWidth="sm"
        sx={{
          padding: 7,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <div className="name">
          <IconButton onClick={clickEditForm} className="EditIconButton" aria-label="add an alarm">
            <EditIcon className="EditIcon" />
          </IconButton>

          <Avatar alt="photo" src={photoUser[0]?.image || ''} sx={{ width: 250, height: 250 }} />

          <h3>{auth.name || 'User Name'}</h3>

        </div>
        {editFormState ? <EditForm /> : null}
      </Container>
      <LocAndTrip />
    </div>
  );
}
