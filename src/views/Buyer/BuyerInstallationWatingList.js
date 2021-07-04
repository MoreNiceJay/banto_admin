import React from "react";
import LeftMenu from "../../components/LeftMenu.js";
import MiddleList from "../../components/MiddleList.js";
import RightContents from "../../components/RightContents.js";
import ContentExplain from "../../components/ContentExplain";

import firebase from "../../firebaseConfig";
import * as constant from "../../Constant.js";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TreeItem from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";
import PropTypes from "prop-types";

import MailIcon from "@material-ui/icons/Mail";
import DeleteIcon from "@material-ui/icons/Delete";
import Label from "@material-ui/icons/Label";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import InfoIcon from "@material-ui/icons/Info";
import ForumIcon from "@material-ui/icons/Forum";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import RefreshIcon from "@material-ui/icons/Refresh";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

let db = firebase.firestore();

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    "& > *": {},
    color: theme.palette.text.secondary,
    "&:hover > $content": {
      backgroundColor: theme.palette.action.hover
    },
    "&:focus > $content, &$selected > $content": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: "var(--tree-view-color)"
    },
    "&:focus > $content $label, &:hover > $content $label, &$selected > $content $label": {
      backgroundColor: "transparent"
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
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "$expanded > &": {
      fontWeight: theme.typography.fontWeightRegular
    }
  },
  group: {
    marginLeft: 0,
    "& $content": {
      paddingLeft: theme.spacing(2)
    }
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: "inherit",
    color: "inherit"
  },
  labelRoot: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0.5, 0)
  },
  labelIcon: {
    marginRight: theme.spacing(1)
  },
  labelText: {
    fontWeight: "inherit",
    flexGrow: 1
  }
}));

const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    "&:hover > $content": {
      backgroundColor: theme.palette.action.hover
    },
    "&:focus > $content, &$selected > $content": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: "var(--tree-view-color)"
    },
    "&:focus > $content $label, &:hover > $content $label, &$selected > $content $label": {
      backgroundColor: "transparent"
    }
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "$expanded > &": {
      fontWeight: theme.typography.fontWeightRegular
    }
  },
  group: {
    marginLeft: 0,
    "& $content": {
      paddingLeft: theme.spacing(2)
    }
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: "inherit",
    color: "inherit"
  },
  labelRoot: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0.5, 0)
  },
  labelIcon: {
    marginRight: theme.spacing(1)
  },
  labelText: {
    fontWeight: "inherit",
    flexGrow: 1
  }
}));

export default function BuyerApplications(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [spacing, setSpacing] = React.useState(0);
  const [applications, setApplications] = React.useState([]);
  const [application, setApplication] = React.useState(null);
  const [stationNumber, setStationNumber] = React.useState("");

  const reloadApplications = async () => {
    const ref = db
      .collection("Stations")
      .where("status", "==", constant.applicationStatus.waiting)
      .where("salesMethod", "==", "banto")
      .where("approvedBy", "!=", "");
    const qs = await ref.get();
    const result = qs.docs.map((doc) => {
      console.log(doc.data());
      console.log(doc.id);
      return { id: doc.id, data: doc.data() };
    });
    setApplications(result);
    setApplication(null);
  };
  function StyledTreeItem(props) {
    const classes = useTreeItemStyles();
    const {
      labelText,
      labelIcon: LabelIcon,
      labelInfo,
      color,
      bgColor,
      ...other
    } = props;

    return (
      <TreeItem
        label={
          <div className={classes.labelRoot}>
            <LabelIcon color="inherit" className={classes.labelIcon} />
            <Typography variant="body2" className={classes.labelText}>
              {labelText}
            </Typography>
            <Typography variant="caption" color="inherit">
              {labelInfo}
            </Typography>
          </div>
        }
        style={{
          "--tree-view-color": color,
          "--tree-view-bg-color": bgColor
        }}
        classes={{
          root: classes.root,
          content: classes.content,
          expanded: classes.expanded,
          selected: classes.selected,
          group: classes.group,
          label: classes.label
        }}
        {...other}
      />
    );
  }
  StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    labelIcon: PropTypes.elementType.isRequired,
    labelInfo: PropTypes.string,
    labelText: PropTypes.string.isRequired
  };

  React.useEffect(() => {
    (async () => {
      const ref = db
        .collection("Stations")
        .where("status", "==", constant.applicationStatus.waiting)
        .where("salesMethod", "==", "banto")
        .where("approvedBy", "!=", "");
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
            <ContentExplain title="반토가 보유한 수동으로 스테이션을 등록합니다" />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <span>{application && application.id}</span>
              <span>구매자ID: {application && application.data.buyer}</span>

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
              <span>
                영업자수익: {application && application.data.salesPortion}
              </span>
              {/* <span>
                지정영업인: {application && application.data.preSalesManagers}
              </span> */}
              {/* {application && (
                <>
                  <form className={classes.root} noValidate autoComplete="off">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {" "}
                      <span>스테이션번호 입력</span>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        value={stationNumber}
                        onChange={(e) => {
                          setStationNumber(e.target.value);
                        }}
                      />
                    </div>
                  </form> */}
              {/* <Button
                    variant="outlined"
                    color="primary"
                    onClick={async () => {
                      if (stationNumber === "") {
                        alert("스테이션 번호를 입력해 주세요");
                        return;
                      }
                      try {
                        const today = String(new Date());

                        await db
                          .collection(constant.application.buyerApplication)
                          .doc(application.id)
                          .update({
                            approvedBy: today,
                            status: constant.applicationStatus.approved
                          });

                        await db
                          .collection("Stations")
                          .doc(application.id)
                          .update({
                            status: constant.applicationStatus.approved,
                            stationId: stationNumber
                          });

                        //여기에서 스테이션으로
                        //모디파이 데이터 할꺼 정리
                        setStationNumber("");
                        await reloadApplications();
                        alert("완료");
                      } catch (e) {
                        alert(e);
                      }
                    }}
                  >
                    스테이션 번호 저장
                  </Button> */}
              {/* </> */}
              {/* )} */}
            </div>
          </>
        </RightContents>
      </div>
    </>
  );
}
