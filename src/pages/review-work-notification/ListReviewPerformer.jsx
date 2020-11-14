import React from "react";
import compose from "components/hocs/compose";
import withLayout from "components/hocs/withLayout";
import { makeStyles, Container, Box } from "@material-ui/core";
import Page from "components/Page";
import ListReviewPerformerWork from "components/modules/review_work_notification/ListReviewPerformer";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ListReviewPerformer = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="List Review Performer Work Notification">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        alignItems="center"
      >
        <Container maxWidth="lg">
          <ListReviewPerformerWork />
        </Container>
      </Box>
    </Page>
  );
};

export default compose(withLayout("dashboard"))(ListReviewPerformer);