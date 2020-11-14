import React from "react";
import compose from "components/hocs/compose";
import withLayout from "components/hocs/withLayout";
import { makeStyles, Container, Box, Typography } from "@material-ui/core";
import Page from "components/Page";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ListReviewCopyrightOwnerWorkNotificationContent from "components/modules/review_work_notification/ListReviewCopyrightOwnerWorkNotificationContent";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const ListReviewCopyrightOwnerWorkNotification = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="List Review Copyright Owner Work Notification"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        alignItems="center"
      >
        <Container maxWidth="sm">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Box mb={3}>
              <Typography color="textPrimary" variant="h1">
                List Review Copyright Owner Work Notification
              </Typography>
            </Box>
            <ListReviewCopyrightOwnerWorkNotificationContent />
          </MuiPickersUtilsProvider>
        </Container>
      </Box>
    </Page>
  );
};

export default compose(withLayout("dashboard"))(
  ListReviewCopyrightOwnerWorkNotification
);
