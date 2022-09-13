import axios from 'axios';
import { ADD_LOCATION, GET_LOCATIONS } from '../types/types';

export const addLocationAC = (payload) => ({ type: ADD_LOCATION, payload });
export const getLocationsAC = (payload) => ({ type: GET_LOCATIONS, payload });

export const AddLocationThunk = (input) => (dispatch) => {
  axios.post(`${process.env.REACT_APP_BASEURL}/api/v1/locations`, input)
    .then((res) => dispatch(addLocationAC(res.data)))
    .catch((error) => console.log(error));
};

export const getAllLocationsThunk = () => (dispatch) => {
  axios.get(`${process.env.REACT_APP_BASEURL}/api/v1/locations`)
    .then((res) => dispatch(getLocationsAC(res.data)))
    .catch((err) => console.log(err));
};
