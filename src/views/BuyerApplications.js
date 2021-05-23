import React from "react";
import LeftMenu from "../components/LeftMenu.js";
import MiddleList from "../components/MiddleList.js";
import RightContents from "../components/RightContents.js";
import firebase from "../firebaseConfig";
import * as constant from "../Constant.js";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { withRouter } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import RefreshIcon from "@material-ui/icons/Refresh";
import { makeStyles, useTheme } from "@material-ui/core/styles";

let db = firebase.firestore();

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,

    flexWrap: "wrap",
    "& > *": {
      height: theme.spacing(16)
    }
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing(2)
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));
export default function BuyerApplications(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [spacing, setSpacing] = React.useState(0);
  const [applications, setApplications] = React.useState([]);
  const [application, setApplication] = React.useState(null);
  const [value, setValue] = React.useState(0);

  const reloadApplications = async () => {
    const ref = db
      .collection(constant.application.buyerApplication)
      .where("status", "!=", constant.applicationStatus.approved);
    const qs = await ref.get();
    const result = qs.docs.map((doc) => {
      console.log(doc.data());
      console.log(doc.id);
      return { id: doc.id, data: doc.data() };
    });
    setApplications(result);
    setApplication(null);
  };
  React.useEffect(() => {
    (async () => {
      console.log("하이", constant.application.buyerApplication);

      const ref = db
        .collection(constant.application.buyerApplication)
        .where("status", "!=", constant.applicationStatus.approved);
      const qs = await ref.get();
      const result = qs.docs.map((doc) => {
        console.log(doc.data());
        console.log(doc.id);
        return { id: doc.id, data: doc.data() };
      });
      setApplications(result);
    })();
    console.log("어플리케이션스", applications);
  }, []);

  // React.useEffect(() => {}, [applications]);
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit" onClick={() => window.location.reload()}>
            <RefreshIcon />
          </Button>
        </Toolbar>
      </AppBar>
      <div
        style={{
          display: "flex",
          height: "100vh",
          width: "100%",
          flexWrap: "wrap"
        }}
      >
        <LeftMenu>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Link
              href="#"
              onClick={() => {
                props.history.push("/");
              }}
            >
              구매자 신청서
            </Link>
            <Link
              href="#"
              onClick={() => {
                props.history.push("/station");
              }}
            >
              스테이션
            </Link>
          </div>
        </LeftMenu>

        <MiddleList>
          {applications &&
            applications.map((value) => {
              return (
                <>
                  {" "}
                  <Grid item xs={12} justify="center" spacing={spacing}>
                    <Paper
                      elevation={3}
                      style={{ marginTop: "10px" }}
                      onClick={() => {
                        console.log(value);
                        setApplication(value);
                      }}
                    >
                      <span> {value.id}</span>
                    </Paper>
                  </Grid>
                </>
              );
            })}
        </MiddleList>
        <RightContents>
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <span>{application && application.id}</span>
              <span>수량: {application && application.data.amount}</span>
              <span>금액: {application && application.data.totalPrice}</span>
              <span>은행: {application && application.data.bank}</span>
              <span>
                계좌번호: {application && application.data.bankAccount}
              </span>
              <span>입금자: {application && application.data.depositor}</span>
              <span>
                영업방법: {application && application.data.salesMethod}
              </span>

              {application && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={async () => {
                    try {
                      await db
                        .collection(constant.application.buyerApplication)
                        .doc(application.id)
                        .update({
                          status: constant.applicationStatus.approved
                        });

                      //여기에서 스테이션으로
                      //모디파이 데이터 할꺼 정리
                      const today = new Date();
                      for (let i = 0; i < application.data.amount; i++) {
                        let modifyData = application.data;
                        modifyData.confirmedBy = today;
                        await db.collection("Stations").doc().set(modifyData);
                      }

                      await reloadApplications();
                      alert("완료");
                    } catch (e) {
                      alert(e);
                    }
                  }}
                >
                  승인
                </Button>
              )}
            </div>
          </>
        </RightContents>
      </div>
    </>
  );
}
