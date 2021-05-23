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
import * as common from "../Common.js";
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
export default function PreStations(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [spacing, setSpacing] = React.useState(0);
  const [applications, setApplications] = React.useState([]);
  const [application, setApplication] = React.useState(null);
  const [value, setValue] = React.useState(0);

  const reloadApplications = async () => {
    const ref = db
      .collection(constant.application.salesApplication)
      .where("status", "==", constant.applicationStatus.waiting);
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
      const ref = db
        .collection(constant.application.salesApplication)
        .where("status", "==", constant.applicationStatus.waiting);
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
        <LeftMenu></LeftMenu>

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
              <span>가맹점: {application && application.data.storeName}</span>
              <span>
                가맹점 주소: {application && application.data.storeMainAddress}
              </span>
              <span>
                가맹점 나머지주소:{" "}
                {application && application.data.storeRestAddress}
              </span>
              <span>
                가맹점 전화번호:{" "}
                {application && application.data.storePhoneNumber}
              </span>
              <span>
                세일즈 수익: {application && application.data.storePortion}
              </span>
              <span>
                세일즈ID: {application && application.data.salesManager}
              </span>

              <span>
                가맹점주님ID: {application && application.data.storeOwner}
              </span>
              <span>
                가맹점주님 전화번호:{" "}
                {application && application.data.storeOwnerPhoneNumber}
              </span>

              <span>
                스테이션 아이디: {application && application.data.stationId}
              </span>

              {application && (
                <>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={async () => {
                      try {
                        await db
                          .collection(constant.application.salesApplication)
                          .doc(application.id)
                          .update({
                            status: constant.applicationStatus.approved
                          });

                        //여기에서 프렌차이즈로 저장
                        //모디파이 데이터 할꺼 정리
                        const today = new Date();
                        const franchiseId = common.shuffleId(20);
                        let modifyData = application.data;
                        modifyData.confirmedBy = today;
                        await db
                          .collection(constant.dbCollection.franchise)
                          .doc(franchiseId)
                          .set(modifyData);

                        //스테이션 업데이트 시키기
                        await db
                          .collection(constant.dbCollection.station)
                          .doc(application.data.stationDoc)
                          .update({
                            franchiseDoc: franchiseId,
                            bReserved: true,
                            bNeedToSend: true,
                            bNeedToRetrieve: false,
                            retrievingAskedBy: "",
                            salesManager: application.data.salesManager,
                            salesPortion: application.data.salesPortion,
                            storeOwner: application.data.storeOwner,
                            storePortion: application.data.storePortion,
                            storeBonusPortion:
                              application.data.storeBonusPortion,
                            registeredBy: today
                          });

                        await reloadApplications();
                        alert("완료");
                      } catch (e) {
                        alert(e);
                      }
                    }}
                  >
                    승인
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={async () => {
                      try {
                        await db
                          .collection(constant.application.salesApplication)
                          .doc(application.id)
                          .update({
                            status: constant.applicationStatus.rejected
                          });

                        //스테이션 업데이트 시키기
                        await db
                          .collection(constant.dbCollection.station)
                          .doc(application.data.stationDoc)
                          .update({
                            bReserved: false
                          });

                        await reloadApplications();
                        alert("완료");
                      } catch (e) {
                        alert(e);
                      }
                    }}
                  >
                    거절
                  </Button>
                </>
              )}
            </div>
          </>
        </RightContents>
      </div>
    </>
  );
}
