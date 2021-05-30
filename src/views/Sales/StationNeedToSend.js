import React from "react";
import LeftMenu from "../../components/LeftMenu.js";
import MiddleList from "../../components/MiddleList.js";
import RightContents from "../../components/RightContents.js";
import ContentExplain from "../../components/ContentExplain";
import Contents from "../../components/Contents";
import AdminTextField from "../../components/AdminTextField";

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

export default function StationNeedToSend(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [spacing, setSpacing] = React.useState(0);
  const [applications, setApplications] = React.useState([]);
  const [application, setApplication] = React.useState(null);
  const [stationNumber, setStationNumber] = React.useState("");
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const reloadApplications = async () => {
    (async () => {
      const ref = db
        .collection("Stations")

        .where("bNeedToSend", "==", true);
      const qs = await ref.get();
      const result = await Promise.all(
        qs.docs.map(async (doc) => {
          console.log(doc.data());
          console.log(doc.id);
          const franchiseResult = await db
            .collection("Franchises")
            .doc(doc.data().franchiseDoc)
            .get();
          const franchiseData = franchiseResult.data();

          return { id: doc.id, data: doc.data(), franchise: franchiseData };
        })
      );
      setApplication(null);
      setApplications(result);
    })();
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

        .where("bNeedToSend", "==", true);
      const qs = await ref.get();
      const result = await Promise.all(
        qs.docs.map(async (doc) => {
          const franchiseResult = await db
            .collection("Franchises")
            .doc(doc.data().franchiseDoc)
            .get();
          const franchiseData = franchiseResult.data();

          return { id: doc.id, data: doc.data(), franchise: franchiseData };
        })
      );

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
                <span>
                  신청날짜: {application && application.data.createdBy}
                </span>
                <span>
                  가게 이름: {application && application.franchise.storeName}
                  {console.log(application && application.data)}
                </span>

                <span>
                  영업ID: {application && application.data.salesManager}
                </span>
                <span>
                  영업 수익률: {application && application.data.salesPortion}
                </span>

                <span>
                  스테이션 ID: {application && application.data.stationId}
                </span>

                <span>
                  가맹점주 아이디: {application && application.data.storeOwner}
                </span>
                <span>
                  가맹점 총 포션:{" "}
                  {application &&
                    application.data.storePortion +
                      application.data.storeBonusPortion}
                </span>
                <span>
                  (가맹점 포션: {application && application.data.storePortion})
                </span>

                <span>
                  가맹점 보너스 포션:{" "}
                  {application && application.franchise.storeBonusPortion}
                </span>
                <span>
                  가맹점 이름: {application && application.franchise.storeName}
                </span>

                <span>
                  가맹점주 휴대전화:{" "}
                  {application && application.franchise.storeOwnerPhoneNumber}
                </span>
                <span>
                  가맹점 전화:{" "}
                  {application && application.franchise.storePhoneNumber}
                </span>
                <span>
                  가게 주소:{" "}
                  {application &&
                    application.franchise.storeMainAddress +
                      " " +
                      application.franchise.storeRestAddress}
                </span>
                <span>
                  계약 연도: {application && application.franchise.contractYear}
                </span>

                <span>구매자ID: {application && application.data.buyer}</span>
                <span>
                  구매자 수익률: {application && application.data.buyerPortion}
                </span>

                {/* <span>
                지정영업인: {application && application.data.preSalesManagers}
              </span> */}
                {application && (
                  <>
                    <form
                      className={classes.root}
                      noValidate
                      autoComplete="off"
                    >
                      <span>송장번호 입력</span>

                      <AdminTextField value={value} onChange={handleChange} />
                    </form>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={async () => {
                        try {
                          const today = new Date();
                          if (!!!value) {
                            alert("송장번호를 입력해주세요");
                            return;
                          }
                          await db
                            .collection("Stations")
                            .doc(application.id)
                            .update({
                              bNeedToSend: true,
                              postCode: value
                            });

                          //여기에서 스테이션으로
                          //모디파이 데이터 할꺼 정리
                          setApplication("");
                          setValue("");
                          await reloadApplications();
                          alert("완료");
                        } catch (e) {
                          alert(e);
                        }
                      }}
                    >
                      스테이션 발송 완료
                    </Button>
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
