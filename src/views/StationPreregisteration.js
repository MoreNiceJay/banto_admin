import React from "react";
import LeftMenu from "../components/LeftMenu.js";
import MiddleList from "../components/MiddleList.js";
import RightContents from "../components/RightContents.js";
import ContentExplain from "../components/ContentExplain";
import Contents from "../components/Contents";
import AdminTextField from "../components/AdminTextField";

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
  const [value, setValue] = React.useState(null);

  // 스테이션하고 프리스테이션에 같은 스테이션 아이디 존재하는지확인

  const clearValue = () => {
    setValue(null);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const reloadApplications = async () => {
    const ref = db
      .collection(constant.dbCollection.prestation)
      .where("stationId", "!=", "");
    const qs = await ref.get();
    const result = qs.docs.map((doc) => {
      // console.log(doc.data());
      // console.log(doc.id);
      return { id: doc.id, data: doc.data() };
    });
    setApplications(result);
    setApplication(null);
    clearValue();
  };
  React.useEffect(() => {
    (async () => {
      const ref = db
        .collection(constant.dbCollection.prestation)
        .where("stationId", "!=", "");
      const qs = await ref.get();
      const result = qs.docs.map((doc) => {
        console.log(doc.data());
        console.log(doc.id);
        return { id: doc.id, data: doc.data() };
      });
      setApplications(result);
    })();
  }, []);
  // React.useEffect(() => {}, [value]);

  const registerBody = (
    <Contents>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          justifyContent: "space-between",
          width: "100%",
          height: "100%"
        }}
      >
        <span>스테이션 아이디 입력</span>

        <AdminTextField value={value} onChange={handleChange} />
        <Button
          variant="outlined"
          color="primary"
          onClick={async () => {
            //스테이션에 있는지
            const isStation = await common.findStation(value);
            const isPrestation = await common.findPreStation(value);
            console.log("이스 스테이션", isPrestation);
            if (isPrestation.data !== null) {
              alert("등록된 스테이션입니다");
              clearValue();
              return;
            }

            const today = new Date();
            if (!!!value) {
              alert("스테이션 아이디를 입력하세요");
              return;
            }
            try {
              await db.collection(constant.dbCollection.prestation).add({
                registerBy: String(today),
                stationId: value
              });
              await reloadApplications();
              clearValue();
              alert("등록 완료");
            } catch (e) {
              alert(e);
            }
          }}
        >
          등록
        </Button>
      </div>
    </Contents>
  );
  const contentsBody = (
    <>
      {" "}
      <Contents>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            justifyContent: "space-between",
            width: "100%",
            height: "100%"
          }}
        >
          <span>디비 아이디:{application && application.id}</span>

          <span>
            스테이션 아이디: {application && application.data.stationId}
          </span>
          <span>등록날짜: {application && application.data.registerBy}</span>

          {application && (
            <>
              <div style={{ alignSelf: "center", marginTop: "40px" }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={async () => {
                    const confirmed = window.confirm(
                      `${application.data.stationId} 스테이션을 삭제 하시겠습니까`
                    );
                    if (!confirmed) {
                      return;
                    }

                    try {
                      await db
                        .collection(constant.dbCollection.prestation)
                        .doc(application.id)
                        .delete();

                      await reloadApplications();
                      alert("완료");
                    } catch (e) {
                      alert(e);
                    }
                  }}
                >
                  삭제
                </Button>
              </div>
            </>
          )}
        </div>
      </Contents>
      <Button
        variant="outlined"
        color="primary"
        stlye={{ marginTop: "40px" }}
        onClick={async () => {
          setApplication(null);
        }}
      >
        스테이션 새로 등록하기
      </Button>
    </>
  );

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
                        // console.log(value);
                        setApplication(value);
                      }}
                    >
                      <span> {value.data.stationId}</span>
                    </Paper>
                  </Grid>
                </>
              );
            })}
        </MiddleList>
        <RightContents>
          <>
            <ContentExplain title="반토가 보유한 스테이션을 등록합니다" />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              {application ? contentsBody : registerBody}
            </div>
          </>
        </RightContents>
      </div>
    </>
  );
}
