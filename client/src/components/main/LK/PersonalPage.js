import React, { useState } from 'react';
import { Container, Avatar, IconButton } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import './PersPage.css';
// import { useSelector } from 'react-redux';

export default function PersonalPage() {
  const [editFormState, setEditFormState] = useState(false);
  const clickEditForm = () => {
    setEditFormState(!editFormState);
    console.log('!!', editFormState);
  };
  //   const user = useSelector((state) => state);
  //   const photoUser = useSelector((state) => state);

  return (
    <Container
      maxWidth="sm"
      sx={{
        padding: 15,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <div className="name">
        <IconButton onClick={clickEditForm} className="EditIconButton" aria-label="add an alarm">
          <EditIcon className="EditIcon" />
        </IconButton>

        <Avatar alt="photo" src="https://ca.slack-edge.com/T03HY1ND24T-U03NZMCVA0P-0ce633728288-512" sx={{ width: 250, height: 250 }} />

        <h3>Andrey Baranov</h3>

      </div>

      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Мои локации</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className="Typography">
              <HighlightOffIcon focused className="HighlightOffIcon" />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
            <Typography
              className="Typography"
            >
              <HighlightOffIcon focused className="HighlightOffIcon" />

              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>

          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Мои маршруты</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              className="Typography"
            >
              <HighlightOffIcon focused className="HighlightOffIcon" />

              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>

      </div>

    </Container>

  );
}
