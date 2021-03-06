import React from "react";
import LeftMenu from "../../components/LeftMenu.js";
import MiddleList from "../../components/MiddleList.js";
import RightContents from "../../components/RightContents.js";
import ContentExplain from "../../components/ContentExplain";
import Contents from "../../components/Contents";
import AdminTextField from "../../components/AdminTextField";

import firebase from "../../firebaseConfig";
import * as constant from "../../Constant.js";
import * as common from "../../Common.js";
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
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const reloadApplications = async () => {
    const ref = db
      .collection(constant.dbCollection.contract)
      .where("status", "==", constant.applicationStatus.waiting)
      .where("approvedBy", "==", "")
      .where("contractType", "==", "SALES");

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
        .collection(constant.dbCollection.contract)
        .where("status", "==", constant.applicationStatus.waiting)
        .where("approvedBy", "==", "")
        .where("contractType", "==", "SALES");
      const qs = await ref.get();
      const result = qs.docs.map((doc) => {
        console.log(doc.data());
        console.log(doc.id);
        return { id: doc.id, data: doc.data() };
      });
      setApplications(result);
    })();
    console.log("?????????????????????", applications);
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
            <ContentExplain title="???????????? ????????? ???????????????" />
            <Contents>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <span>{application && application.id}</span>
                <span>?????????: {application && application.data.storeName}</span>
                <span>
                  ????????? ??????:{" "}
                  {application && application.data.storeMainAddress}
                </span>
                <span>
                  ????????? ???????????????:{" "}
                  {application && application.data.storeRestAddress}
                </span>
                <span>
                  ????????? ????????????:{" "}
                  {application && application.data.storePhoneNumber}
                </span>
                <span>
                  ????????? ??????: {application && application.data.storePortion}
                </span>
                <span>
                  ?????????ID: {application && application.data.salesManager}
                </span>

                <span>
                  ???????????????ID: {application && application.data.storeOwner}
                </span>
                <span>
                  ??????????????? ????????????:{" "}
                  {application && application.data.storeOwnerPhoneNumber}
                </span>

                <span>
                  ???????????? ?????????: {application && application.data.stationId}
                </span>

                {application && (
                  <>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={async () => {
                        try {
                          const today = String(new Date());

                          // ???????????? ????????????
                          //????????????
                          //????????????
                          //???????????????
                          await db
                            .collection(constant.dbCollection.contract)
                            .doc(application.id)
                            .update({
                              approvedBy: today,
                              status: constant.applicationStatus.approved,
                              bNeedToSend: true
                            });

                          //???????????? ?????????????????? ????????????
                          //??????????????? ??????
                          //??????????????? ??????

                          //???????????? ?????????????????? ????????????
                          //??????????????? ??????
                          //??????????????? ??????

                          await db
                            .collection(constant.dbCollection.franchise)
                            .doc(application.data.franchiseDoc)
                            .update({
                              contractDocs: firebase.firestore.FieldValue.arrayUnion(
                                {
                                  [application.data.stationId]: application.id
                                }
                              ),
                              stationDocs: firebase.firestore.FieldValue.arrayUnion(
                                {
                                  [application.data.stationId]:
                                    application.data.stationDoc
                                }
                              )
                            });

                          //???????????? ???????????? ?????????
                          //???????????????
                          //???????????? ???????????????
                          await db
                            .collection(constant.dbCollection.station)
                            .doc(application.data.stationDoc)
                            .update({
                              contractDoc: application.id,
                              bReserved: false,
                              status: constant.applicationStatus.approved
                            });

                          await reloadApplications();
                          alert("??????");
                        } catch (e) {
                          alert(e);
                        }
                      }}
                    >
                      ??????
                    </Button>
                    <div>
                      <span>?????? ??????</span>

                      <AdminTextField value={value} onChange={handleChange} />
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={async () => {
                          try {
                            await db
                              .collection(constant.dbCollection.contract)
                              .doc(application.id)
                              .update({
                                status: constant.applicationStatus.rejected,
                                rejectedReason: value
                              });
                            //????????? ????????? ?????????
                            //???????????? ???????????? ?????????
                            await db
                              .collection(constant.dbCollection.station)
                              .doc(application.data.stationDoc)
                              .update({
                                bReserved: false
                              });

                            await reloadApplications();
                            alert("??????");
                          } catch (e) {
                            alert(e);
                          }
                        }}
                      >
                        ??????
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </Contents>
          </>
        </RightContents>
      </div>
    </>
  );
}
