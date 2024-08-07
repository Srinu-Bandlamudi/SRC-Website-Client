import React, { useEffect, useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CardContent from "@mui/material/CardContent";
import {
  Button,
  CardActions,
  CardMedia,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";

import { useFormik } from "formik";
import "../../styles/Login.css";
import { toast, Bounce } from "react-toastify";
import axios from "axios";

export default function CompletedEventForum() {
  // Calling getAllDomains in useEffect

  useEffect(() => {
    try {
      getAllDomains();
    } catch (e) {
      console.log(e);
    }
  }, []);

  // Getting Environment Variables

  const getDomainApi = process.env.REACT_APP_GET_DOMAINS;
  const addDomainApi = process.env.REACT_APP_CREATE_DOMAIN;
  const deleteDomainApi = process.env.REACT_APP_DELETE_DOMAIN_BY_ID;

  const updateDomainApi = process.env.REACT_APP_UPDATE_DOMAIN_BY_ID;

  //  Function to show Toast

  const showToast = (msg, msgType) => {
    if (msgType === "warn") {
      toast.warn(msg, {
        position: "top-right",
        autoClose: 3000,
        height: 100,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
    }
    if (msgType === "success") {
      toast.success(msg, {
        position: "top-right",
        autoClose: 3000,
        height: 100,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  // init of React Hooks

  const [domains, setDomains] = useState(null);
  const [update, setUpdate] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [carItem, setCarItem] = React.useState({});
  const nameRef = useRef("");
  const descRef = useRef("");

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validateOnMount: true,

    validate: (values) => {
      let errors = {};

      if (values.name === "") {
        errors.name = "Please enter the valid Domain Name";
      }

      if (values.description === "") {
        errors.description = "Description requried";
      }
      return errors;
    },
  });

  //  Functions for CRUD

  // Function to get All Domains

  const getAllDomains = () => {
    try {
      axios.get(getDomainApi).then((res) => {
        setDomains(res.data);
        console.log(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  // Function for Handling Form

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formik.errors);

    if (formik.errors.name) {
      document.getElementById("domain-name").style.border = "1px solid red";
    }
    if (formik.errors.description) {
      document.getElementById("domain-desc").style.border = "1px solid red";
    }
    if (!formik.errors.name && !formik.errors.description) {
      document.getElementById("domain-name").style.border = "none";
      document.getElementById("domain-desc").style.border = "none";

      addDomain(formik.values);
    }
  };

  // Function for Adding Domain

  const addDomain = async (e) => {
    console.log(e);
    try {
      const res = await axios.post(addDomainApi, e, {
        headers: {
          key: "Authorization",
          value: JSON.stringify(localStorage.getItem("authToken")),
          type: "text",
        },
      });
      showToast("Domain Created Successfully", "success");
      clearInputFields();

      formik.resetForm();
      getAllDomains();
    } catch (e) {
      console.log(e);
      showToast("Error in creating Domain", "warn");
    }
  };

  // Function for Updating Domain

  const updateDomain = async (e) => {
    e.preventDefault();
    console.log(carItem);
    if (
      nameRef.current.value !== "" &&
      nameRef.current.value !== "undefined" &&
      descRef.current.value !== "" &&
      descRef.current.value !== "undefined"
    ) {
      try {
        const update = {
          description: descRef.current.value,
        };
        console.log(update);
        const res = await axios.put(updateDomainApi + carItem._id, update, {
          headers: {
            key: "Authorization",
            value: JSON.stringify(localStorage.getItem("authToken")),
            type: "text",
          },
        });
        getAllDomains();
        setUpdate(false);
        clearInputFields();
      } catch (e) {
        console.log(e);
      }
    } else {
      showToast("Requried fields", "warn");
    }
  };

  // Function for Deleting Domains

  const deleteDomain = async (e) => {
    console.log(e);
    try {
      const res = await axios.delete(deleteDomainApi + e._id, {
        headers: {
          key: "Authorization",
          value: JSON.stringify(localStorage.getItem("authToken")),
          type: "text",
        },
      });
      showToast("Domain Deleted Successfully", "success");
      getAllDomains();
    } catch (e) {
      console.log(e);
      showToast("Error in Deleting Domain", "warn");
    }
  };

  // Function for setting text in input fields

  const setInputFields = () => {
    nameRef.current.value = carItem.name;
    descRef.current.value = carItem.description;
  };

  // Function to clear Input Fields

  const clearInputFields = () => {
    nameRef.current.value = "";
    descRef.current.value = "";
  };

  // Function for Handlnig Modal

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Custom Styles

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  const editCarousal = (item) => {
    setCarItem(item);
    handleOpen();
  };
  const carousalDetails = {
    0: {
      //   image: CarousalImg1,
      title: "Title of Image 1",
      description:
        "Main Page Component, sit amet consectetur adipisicing elit. Quasi reiciendis veritatis iure, aperiam vitae obcaecati consequatur at.Praesentium, asperiores facere ad repellendus voluptatibusconsequatur nisi commodi a? Incidunt odio magnam veritatis! Temporaconsectetur excepturi ipsam in! Nisi exercitationem, vel autemratione iusto fugiat esse labore! Enim earum vel accusamus hic ipsumdebitis aperiam praesentium eos necessitatibus facilis laudantiumquasi odit, deserunt cumque quas quae exercitationem soluta, cumdoloremque id! Dignissimos animi, id maxime autem provident quo consequatur rerum fugiat qui repellendus quam aliquid sequi doloressed placeat ea distinctio quasi?......",
    },
    1: {
      //   image: CarousalImg1,
      title: "Title of Image 2",
      description:
        "Main Page Component, sit amet consectetur adipisicing elit. Quasi reiciendis veritatis iure, aperiam vitae obcaecati consequatur at.Praesentium, asperiores facere ad repellendus voluptatibusconsequatur nisi commodi a? Incidunt odio magnam veritatis! Temporaconsectetur excepturi ipsam in! Nisi exercitationem, vel autemratione iusto fugiat esse labore! Enim earum vel accusamus hic ipsumdebitis aperiam praesentium eos necessitatibus facilis laudantiumquasi odit, deserunt cumque quas quae exercitationem soluta, cumdoloremque id! Dignissimos animi, id maxime autem provident quo consequatur rerum fugiat qui repellendus quam aliquid sequi doloressed placeat ea distinctio quasi?......",
    },
    2: {
      //   image: CarousalImg2,
      title: "Title of Image 3",
      description:
        "Main Page Component, sit amet consectetur adipisicing elit. Quasi reiciendis veritatis iure, aperiam vitae obcaecati consequatur at.Praesentium, asperiores facere ad repellendus voluptatibusconsequatur nisi commodi a? Incidunt odio magnam veritatis! Temporaconsectetur excepturi ipsam in! Nisi exercitationem, vel autemratione iusto fugiat esse labore! Enim earum vel accusamus hic ipsumdebitis aperiam praesentium eos necessitatibus facilis laudantiumquasi odit, deserunt cumque quas quae exercitationem soluta, cumdoloremque id! Dignissimos animi, id maxime autem provident quo consequatur rerum fugiat qui repellendus quam aliquid sequi doloressed placeat ea distinctio quasi?......",
    },
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid>
          <Typography
            sx={{ color: "white", mx: 3 }}
            variant="h5"
            component="div"
          >
            Current Carousel Items
          </Typography>
          <Demo sx={{ borderRadius: "0.5rem", margin: "10px" }}>
            <List sx={{ padding: "0px" }}>
              {Object.entries(carousalDetails).map((item) => {
                return (
                  <ListItem
                    key={item[1].title}
                    sx={{ borderBottom: "1px solid grey", padding: "14px" }}
                    secondaryAction={
                      <>
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          sx={{ marginRight: "0.5rem" }}
                        >
                          <EditNoteRoundedIcon
                            onClick={() => {
                              editCarousal(item[1]);
                            }}
                          />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{ width: 75, height: 75, marginRight: "10px" }}
                      >
                        <img
                          src={"" + item[1].image}
                          alt=""
                          height={"75px"}
                          width={"75px"}
                          srcSet=""
                        />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item[1].title} />
                  </ListItem>
                );
              })}
            </List>
          </Demo>
        </Grid>
        <div className="sub-contact-container" style={{ margin: ".5rem" }}>
          <div className="contact-head">
            <div>
              <h3>{update ? "Update Domain" : "Add Domain"}</h3>
              {update && (
                <button
                  onClick={() => {
                    setUpdate(false);
                    clearInputFields();
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
          <div className="contact-fields">
            <form onSubmit={update ? updateDomain : handleSubmit}>
              <input
                type="text"
                id="event-name"
                required
                ref={nameRef}
                name="name"
                placeholder="Event Name"
                onChange={formik.handleChange}
              />

              <textarea
                style={{ resize: "none" }}
                placeholder="Description about Event"
                ref={descRef}
                name="description"
                id="domain-desc"
                required
                cols={30}
                rows={7}
                onChange={formik.handleChange}
              ></textarea>
              <button className="submit-message">
                {update ? "Update Domain" : "Add Domain"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
