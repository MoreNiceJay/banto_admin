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
      const promises = [];
      const ref = db
        .collection("Contracts")

        .where("bNeedToSend", "==", true);
      const qs = await ref.get();
      qs.forEach((doc) => {
        promises.push(doc);
      });
      const result = await Promise.all(
        qs.docs.map(async (doc) => {
          console.log(doc.data());
          console.log(doc.id);
          const franchiseResult = await db
            .collection("Franchises")
            .doc(doc.data().franchiseDoc)
            .get();
          const franchiseData = franchiseResult.data();
          console.log("??????????????? ?????????", franchiseData);
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
      const dataArray = [];

      const qs = await db
        .collection("Contracts")
        .where("bNeedToSend", "==", true)
        .get();

      qs.forEach((doc) => {
        dataArray.push({ id: doc.id, data: doc.data() });
      });

      await Promise.all(
        dataArray.map(async (value, index) => {
          if (value.data.franchiseDoc === "") {
            return;
          }

          const contractQs = await db
            .collection(constant.dbCollection.franchise)
            .doc(value.data.franchiseDoc)
            .get();
          console.log("???????????????", await contractQs.data());

          dataArray[index].franchise = await contractQs.data();
        })
      );
      // const ref = db
      //   .collection("Contracts")

      //   .where("bNeedToSend", "==", true);
      // const qs = await ref.get();
      // const result = await Promise.all(
      //   qs.docs.map(async (doc) => {
      //     const franchiseResult = await db
      //       .collection("Franchises")
      //       .doc(doc.data().franchiseDoc)
      //       .get();
      //     console.log(franchiseResult.data());

      //     const franchiseData = await franchiseResult.data();

      //     return {
      //       id: doc.id,
      //       data: doc.data(),
      //       franchise: franchiseResult.data()
      //     };
      //   })
      // );

      setApplications(dataArray);
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
                <span>
                  ????????????: {application && application.data.createdBy}
                </span>
                {/* <span>
                  ?????? ??????: {application && application.franchise.storeName}
                  {console.log(application && application.data)}
                </span> */}

                <span>
                  ??????ID: {application && application.data.salesManager}
                </span>
                <span>
                  ?????? ?????????: {application && application.data.salesPortion}
                </span>

                <span>
                  ???????????? ID: {application && application.data.stationId}
                </span>

                <span>
                  ???????????? ?????????: {application && application.data.storeOwner}
                </span>
                <span>
                  ????????? ??? ??????:{" "}
                  {application &&
                    application.data.storePortion +
                      application.data.storeBonusPortion}
                </span>
                <span>
                  (????????? ??????: {application && application.data.storePortion})
                </span>

                <span>
                  ????????? ????????? ??????:{" "}
                  {application && application.franchise.storeBonusPortion}
                </span>
                <span>
                  ????????? ??????: {application && application.franchise.storeName}
                </span>

                <span>
                  ???????????? ????????????:{" "}
                  {application && application.franchise.storeOwnerPhoneNumber}
                </span>
                <span>
                  ????????? ??????:{" "}
                  {application && application.franchise.storePhoneNumber}
                </span>
                <span>
                  ?????? ??????:{" "}
                  {application &&
                    application.franchise.storeMainAddress +
                      " " +
                      application.franchise.storeRestAddress}
                </span>
                <span>
                  ?????? ??????: {application && application.franchise.contractYear}
                </span>

                <span>?????????ID: {application && application.data.buyer}</span>
                <span>
                  ????????? ?????????: {application && application.data.buyerPortion}
                </span>

                {/* <span>
                ???????????????: {application && application.data.preSalesManagers}
              </span> */}
                {application && (
                  <>
                    <form
                      className={classes.root}
                      noValidate
                      autoComplete="off"
                    >
                      <span>???????????? ??????</span>

                      <AdminTextField value={value} onChange={handleChange} />
                    </form>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={async () => {
                        try {
                          const today = new Date();
                          if (!!!value) {
                            alert("??????????????? ??????????????????");
                            return;
                          }
                          await db
                            .collection("Stations")
                            .doc(application.id)
                            .update({
                              bNeedToSend: false,
                              postCode: value
                            });

                          //???????????? ??????????????????
                          //???????????? ????????? ?????? ??????
                          setApplication("");
                          setValue("");
                          await reloadApplications();
                          alert("??????");
                        } catch (e) {
                          alert(e);
                        }
                      }}
                    >
                      ???????????? ?????? ??????
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
