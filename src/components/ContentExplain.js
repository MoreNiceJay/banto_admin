import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
      height: theme.spacing(2)
    }
  }
}));
export default function ContentExplain(props) {
  const classes = useStyles();

  return (
    <>
      <Paper elevation={0}>
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="body2" component="p">
              {props.title}
            </Typography>
          </CardContent>
        </Card>
      </Paper>
    </>
  );
}
