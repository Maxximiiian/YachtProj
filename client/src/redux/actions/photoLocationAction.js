import axios from 'axios';
import { ADD_PHOTO_LOCATION, GET_PHOTO_LOCATION } from '../types/types';

export const addLocationPhoto = (payload) => ({ type: ADD_PHOTO_LOCATION, payload });

export const getLocationPhoto = (payload) => ({ type: GET_PHOTO_LOCATION, payload });

export const getPhotoLocationThunk = () => (dispatch) => {
  axios.get(`${process.env.REACT_APP_BASEURL}/api/v1/photo/getPhotoLocation`)
    .then((res) => dispatch(getLocationPhoto(res.data)))
    .catch((err) => console.log(err));
};
