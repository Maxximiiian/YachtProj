import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import { red } from '@mui/material/colors';
import {
  Avatar, Box, Button, ButtonGroup, IconButton, SwipeableDrawer, TextField
} from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ToggleButton from '@mui/material/ToggleButton';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import DoubleArrowSharpIcon from '@mui/icons-material/DoubleArrowSharp';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import SendIcon from '@mui/icons-material/Send';
import './BlogPosts.css';

export default function BlogPosts() {
  const [state, setState] = React.useState({ right: false });
  const [addPost, setAddPost] = React.useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event
      && event.type === 'keydown'
      && (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        maxWidth: 500,
        backgroundColor: '#00000075 !important',
        opacity: '0.8',
        boxShadow: 'none',
        height: '100%',
        color: 'azure'

      }}
    >
      <Button sx={{ backgroundColor: 'transparent', color: 'burlywood' }} href="/points" onClick={() => setState((prev) => ({ ...prev, [anchor]: false }))}><DoubleArrowSharpIcon /></Button>
      <Box>
        <Button onClick={() => setAddPost(!addPost)} variant="h1" color="text.secondary" sx={{ marginLeft: '30%' }}>
          Добавить пост
        </Button>
      </Box>
      {!addPost ? null
        : (
          <Box>
            <CardContent>
              <TextField className="TextField" fullWidth size="small" placeholder="Заголовок" color="info" />
              <TextField className="TextField" fullWidth size="large" placeholder="Текст" sx={{ marginTop: '2rem', textColor: 'primary' }} />
            </CardContent>
            <Button sx={{ backgroundColor: 'transparent', color: 'azure', marginLeft: '40%' }} endIcon={<SendIcon />}>
              Добавить
            </Button>
          </Box>
        )}
      <Box sx={{
        backgroundColor: '#f8f9fa24',
        borderRadius: '25px',
        margin: '10px'
      }}
      >
        <Typography component="legend" sx={{ marginTop: '3rem' }} />
        <CardHeader
          sx={{
            color: 'azure'
          }}
          avatar={(
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
        )}
          action={(
            <IconButton aria-label="settings" />
        )}
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            A million voices
          </Typography>
          <Typography sx={{ color: 'azure' }} variant="body2">
            We are the worlds people
            Different yet were the same
            We believe
            We believe in a dream

            Praying for peace and healing
            I hope we can start again
            We believe
            We believe in a dream
          </Typography>
        </CardContent>
        <ButtonGroup>
          <IconButton color="primary" aria-label="add to shopping cart" fontSize="large">
            <ThumbUpOffAltIcon sx={{ marginLeft: '1rem' }} />
          </IconButton>
          <IconButton color="primary" aria-label="add to shopping cart" fontSize="large">
            <ThumbDownOffAltIcon sx={{ marginLeft: '1rem' }} />
          </IconButton>
        </ButtonGroup>
      </Box>
    </Box>
  );
  return (
    <div style={{ width: 'max-content', marginLeft: 'auto' }}>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <ToggleButton value="justify" key="justify">
              <FormatAlignJustifyIcon />
            </ToggleButton>
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
