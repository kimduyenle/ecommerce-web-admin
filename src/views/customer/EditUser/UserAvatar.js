import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import useNotification from "utils/hooks/notification";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles,
} from "@material-ui/core";
import routes from "app/app.routes";
import userAPI from "api/user";

const useStyles = makeStyles(() => ({
  root: {},
  button: {
    backgroundColor: "#122230",
    "&:hover": {
      backgroundColor: "#122230ed",
    },
  },
  cardActions: {
    justifyContent: "space-between",
  },
  input: {
    display: "none",
  },
  avatar: {
    height: 200,
    width: 200,
    marginBottom: 8,
  },
}));

const UserAvatar = ({ className, user, id, ...rest }) => {
  const { showError, showSuccess } = useNotification();
  const history = useHistory();
  const classes = useStyles();
  const [image, setImage] = useState({});

  const onFileUpload = async () => {
    // e.preventDefault();
    console.log(image);
    try {
      if (image !== "") {
        // Creating a FormData object
        let fileData = new FormData();
        // Setting the 'image' field and the selected file
        fileData.set("image", image, `${image.lastModified}-${image.name}`);
        // await axios({
        //   method: "put",
        //   url: "http://localhost:3000/users/5/avatar",
        //   data: fileData,
        //   headers: { "Content-Type": "multipart/form-data" },
        // });
        await userAPI.uploadAvatar(fileData, id);
        showSuccess("Editted successfully.");
        history.push(routes.users.path);
      }
      console.log(user);
    } catch (error) {
      console.log("Failed to edit user: ", error);
    }
    console.log(image);
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{}}
      validationSchema={Yup.object().shape({
        //   username: Yup.string()
        //     .max(255)
        //     .required("Username is required"),
        //     email: Yup.string().email().required("Email is required"),
        // password: Yup.string().max(255).required("Password is required"),
      })}
      onSubmit={onFileUpload}
    >
      {({ isSubmitting }) => (
        <Form>
          <Card className={clsx(classes.root, className)} {...rest}>
            <CardContent>
              <Box alignItems="center" display="flex" flexDirection="column">
                <Avatar className={classes.avatar} src={user.avatar} />
                <Typography color="textPrimary" gutterBottom variant="h3">
                  {user.username}
                </Typography>
              </Box>
            </CardContent>
            <Divider />
            <CardActions className={classes.cardActions}>
              <input
                name="image"
                className={classes.input}
                id="contained-button-file"
                type="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
              <label
                htmlFor="contained-button-file"
                style={{ marginLeft: 0, flexBasis: "45%" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  size="large"
                  className={classes.button}
                >
                  Choose file
                </Button>
              </label>

              {/* <input name="image" type="file"
					onChange={(e) => {
						setImage(e.target.files[0]);
					}}
					style={{width: 200}}
				/> */}

              <Button
                color="primary"
                disabled={isSubmitting}
                size="large"
                type="submit"
                variant="contained"
                style={{ marginLeft: 0, flexBasis: "45%" }}
                className={classes.button}
              >
                Upload
              </Button>
            </CardActions>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

UserAvatar.propTypes = {
  className: PropTypes.string,
};

export default UserAvatar;
