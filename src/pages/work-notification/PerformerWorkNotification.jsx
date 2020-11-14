import React from "react";
import compose from "components/hocs/compose";
import withLayout from "components/hocs/withLayout";
import { makeStyles, Container, Box } from "@material-ui/core";
import Page from "components/Page";
import PerformerWorkNotificationForm from "components/modules/work_notification/PerformerWorkNotificationForm";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const PerformerWorkNotification = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Manager Performer">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        alignItems="center"
      >
        <Container maxWidth="lg">
          <PerformerWorkNotificationForm />
        </Container>
      </Box>
    </Page>
  );
};

export default compose(withLayout("dashboard"))(PerformerWorkNotification);
