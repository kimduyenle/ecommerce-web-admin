import React from "react";
import compose from "components/hocs/compose";
import withLayout from "components/hocs/withLayout";
import { makeStyles, Container, Box } from "@material-ui/core";
import Page from "components/Page";
import PerformerApplicationForm from "components/modules/member_application/PerformerForm";
import withAuth from "components/hocs/withAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const MemberApplicationPerformerPage = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Member Application Performer">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        alignItems="center"
      >
        <Container maxWidth="lg">
          <PerformerApplicationForm />
        </Container>
      </Box>
    </Page>
  );
};

export default compose(
  withAuth,
  withLayout("dashboard")
)(MemberApplicationPerformerPage);
