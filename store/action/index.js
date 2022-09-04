import axios from "axios";
import { CONTACTS_FETCH_SUCCESS, CONTACT_FETCH_SUCCESS } from "./actionType";

const baseUrl = "https://simple-contact-crud.herokuapp.com";

export const fetchContactsSuccess = (payload) => {
  return {
    type: CONTACTS_FETCH_SUCCESS,
    payload,
  };
};

export const fetchContactSuccess = (payload) => {
  return {
    type: CONTACT_FETCH_SUCCESS,
    payload,
  };
};

export const fetchContacts = () => {
  return async (dispatch) => {
    try {
      const resp = await axios.get(`${baseUrl}/contact`);
      dispatch(fetchContactsSuccess(resp.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchContact = (id) => {
  return async (dispatch) => {
    try {
      const resp = await axios.get(`${baseUrl}/contact/${id}`);
      dispatch(fetchContactSuccess(resp.data));
    } catch (error) {
      console.log("error");
    }
  };
};

export const createContact = (contactForm) => {
  return (dispatch, getState) => {
    // console.log(saveImage.name, "action");
    return new Promise(async (resolve, reject) => {
      try {
        await axios.post(`${baseUrl}/contact`, {
          firstName: contactForm.firstName,
          lastName: contactForm.lastName,
          age: contactForm.age,
          photo: contactForm.photo,
        });

        dispatch(fetchContacts());
        fetchContacts();
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  };
};

export const deleteContact = (id) => {
  return async (dispatch) => {
    try {
      const resp = await axios({
        method: "DELETE",
        url: `${baseUrl}/contact/${id}`,
      });

      console.log(resp);

      dispatch(fetchContacts());
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateContact = (id, contactForm) => {
  console.log(id);
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      try {
        await axios.put(`${baseUrl}/contact/${id}`, {
          firstName: contactForm.firstName,
          lastName: contactForm.lastName,
          age: contactForm.age,
          photo: contactForm.photo,
        });

        dispatch(fetchContacts());

        resolve();
      } catch (err) {
        reject(err);
      }
    });
  };
};
