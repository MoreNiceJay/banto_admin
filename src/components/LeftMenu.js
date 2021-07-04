import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeItem from "@material-ui/lab/TreeItem";
import Typography from "@material-ui/core/Typography";
import MailIcon from "@material-ui/icons/Mail";
import DeleteIcon from "@material-ui/icons/Delete";
import Label from "@material-ui/icons/Label";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import InfoIcon from "@material-ui/icons/Info";
import ForumIcon from "@material-ui/icons/Forum";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import TreeView from "@material-ui/lab/TreeView";

import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";

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

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400
  }
});

function LeftMenu(props) {
  const classes = useStyles();

  return (
    <>
      <div
        style={{
          height: "100%",
          flex: "1 1 20%",
          borderRight: "1px solid black"
        }}
      >
        <TreeView
          className={classes.root}
          defaultExpanded={["22", "33", "44"]}
          defaultCollapseIcon={<ArrowDropDownIcon />}
          defaultExpandIcon={<ArrowRightIcon />}
          defaultEndIcon={<div style={{ width: 24 }} />}
        >
          <StyledTreeItem
            nodeId="1111"
            labelText="반토 예비 스테이션 등록"
            labelIcon={MailIcon}
            onClick={() => {
              props.history.push("/stationpreregisteration");
            }}
          />

          <StyledTreeItem nodeId="22" labelText="구매자" labelIcon={Label}>
            <StyledTreeItem
              nodeId="2201"
              labelText="구매자 신청서 입금 확인"
              labelIcon={MailIcon}
              onClick={() => {
                props.history.push("/");
              }}
            />
            <StyledTreeItem
              nodeId="2202"
              labelText="구매자에게 수동 스테이션 할당"
              labelIcon={DeleteIcon}
              onClick={() => {
                props.history.push("/buyerapplicationmaual");
              }}
            />
            <StyledTreeItem
              nodeId="2203"
              labelText="구매자 설치 대기리스트"
              labelIcon={DeleteIcon}
              onClick={() => {
                props.history.push("/buyerinstallationwatingList");
              }}
            />
          </StyledTreeItem>
          <StyledTreeItem nodeId="33" labelText="세일즈" labelIcon={Label}>
            <StyledTreeItem
              nodeId="3301"
              labelText="세일즈 영업 신청서"
              labelIcon={SupervisorAccountIcon}
              // labelInfo="90"
              color="#1a73e8"
              bgColor="#e8f0fe"
              onClick={() => {
                props.history.push("/salesapplications");
              }}
            />
            <StyledTreeItem
              nodeId="5"
              labelText="보내야할 스테이션"
              labelIcon={SupervisorAccountIcon}
              // labelInfo="90"
              color="#1a73e8"
              bgColor="#e8f0fe"
              onClick={() => {
                props.history.push("/stationneedtosend");
              }}
            />
            <StyledTreeItem
              nodeId="6"
              labelText="Updates"
              labelIcon={InfoIcon}
              labelInfo="2,294"
              color="#e3742f"
              bgColor="#fcefe3"
            />
          </StyledTreeItem>
          <StyledTreeItem nodeId="44" labelText="가맹점" labelIcon={Label}>
            <StyledTreeItem
              nodeId="4401"
              labelText="가맹점 신청서"
              labelIcon={SupervisorAccountIcon}
              // labelInfo="90"
              color="#1a73e8"
              bgColor="#e8f0fe"
              onClick={() => {
                props.history.push("/storeapplications");
              }}
            />
            <StyledTreeItem
              nodeId="4402"
              labelText="보내야할 스테이션"
              labelIcon={SupervisorAccountIcon}
              // labelInfo="90"
              color="#1a73e8"
              bgColor="#e8f0fe"
              onClick={() => {
                props.history.push("/stationneedtosend");
              }}
            />
            <StyledTreeItem
              nodeId="6"
              labelText="Updates"
              labelIcon={InfoIcon}
              labelInfo="2,294"
              color="#e3742f"
              bgColor="#fcefe3"
            />
          </StyledTreeItem>
        </TreeView>
        {props.children}
      </div>
    </>
  );
}
export default withRouter(LeftMenu);
