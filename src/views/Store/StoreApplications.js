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
      .where("contractType", "==", "FRANCHISE");
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
        .where("contractType", "==", "FRANCHISE");
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
            <ContentExplain title="구매자의 입금을 확인합니다" />
            <Contents>
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
                  스테이션 신청 방법:{" "}
                  {application && application.data.stationMethod}
                </span>

                <span>
                  가맹점 주소:{" "}
                  {application && application.data.storeMainAddress}
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
                          const today = String(new Date());
                          console.log("applicationssssss", application);

                          //스테이션 업데이트 시키기
                          //만약 스테이션이 들어갔으면.
                          if (application.data.stationMethod === "banto") {
                            //스테이션 할당
                            let ref = db
                              .collection(constant.dbCollection.station)
                              .where("salesMethod", "==", "banto")
                              .where("salesPortion", ">=", 21)
                              .where("contractDoc", "==", "")
                              .where("bReserved", "==", false)
                              .where(
                                "status",
                                "==",
                                constant.applicationStatus.approved
                              );

                            const qs = await ref.get();
                            const result = qs.docs.map((doc) => {
                              console.log(doc.data());
                              console.log(doc.id);
                              return { id: doc.id, data: doc.data() };
                            });
                            console.log("리저트", result);
                            if (result.length === 0) {
                              alert("할당될 스테이션이 없습니다");
                              return;
                            }
                            // .orderBy("createdBy", "ASC")
                            result.sort(common.date_ascending);
                            console.log("sorted", result);
                            const firstResult = result[0];
                            console.log("station first result", firstResult);
                            await db
                              .collection(constant.dbCollection.contract)
                              .doc(application.id)
                              .update({
                                approvedBy: today,
                                status: constant.applicationStatus.approved,
                                bNeedToSend: true,
                                stationDoc: firstResult.id
                              });
                            //할당완료

                            //여기에서 프렌차이즈로 업데이트
                            //컨트렉트닥 추가
                            //스테이션닥 추가
                            //if banto 해서 정리를 하자

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

                            await db
                              .collection(constant.dbCollection.station)
                              .doc(result[0].id)
                              .update({
                                contractDoc: application.id,
                                bReserved: true,
                                status: constant.applicationStatus.approved
                              });

                            await reloadApplications();
                            alert("완료");

                            return;
                          } // method == banto ends

                          await db
                            .collection(constant.dbCollection.contract)
                            .doc(application.id)
                            .update({
                              approvedBy: today,
                              status: constant.applicationStatus.approved,
                              bNeedToSend: true,
                              reservedBy: today
                            });

                          //여기에서 프렌차이즈로 업데이트
                          //컨트렉트닥 추가
                          //스테이션닥 추가

                          //여기에서 프렌차이즈로 업데이트
                          //컨트렉트닥 추가
                          //스테이션닥 추가

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

                          //스테이션 업데이트 시키기
                          //컨트렉트닥
                          //스테터스 어프르브드
                          await db
                            .collection(constant.dbCollection.station)
                            .doc(application.data.stationDoc)
                            .update({
                              contractDoc: application.id,
                              bReserved: false,
                              status: constant.applicationStatus.approved
                            });

                          await reloadApplications();
                          alert("완료");
                        } catch (e) {
                          console.log(e);
                          alert(e);
                        }
                      }}
                    >
                      승인
                    </Button>
                    <div>
                      <span>거절 이유</span>

                      <AdminTextField value={value} onChange={handleChange} />
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={async () => {
                          try {
                            console.log("applicationssssss", application);

                            await db
                              .collection(constant.application.storeApplication)
                              .doc(application.id)
                              .update({
                                status: constant.applicationStatus.rejected,
                                rejectedReason: value
                              });
                            //리젝트 메세지 보내기
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
