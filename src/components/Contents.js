import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(4),
      width: "100%",
      height: "100%"
    }
  }
}));
export default function Contents({ children }) {
  const classes = useStyles();

  return (
    <>
      <Paper elevation={0} style={{ marginTop: "20px", height: "50%" }}>
        <Card className={classes.root}>
          <CardContent>{children}</CardContent>
        </Card>
      </Paper>
    </>
  );
}
