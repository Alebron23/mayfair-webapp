import { withStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import WarningIcon from "@material-ui/icons/Warning";

const CheckCircle = withStyles((theme) => ({
  root: {
    marginRight: theme.spacing(3),
    color: "green",
  },
}))(CheckCircleIcon);

const Warning = withStyles((theme) => ({
  root: {
    marginRight: theme.spacing(3),
    color: "red",
  },
}))(WarningIcon);

const AttentionIcon = withStyles((theme) => ({
  root: {
    marginRight: theme.spacing(3),
    color: "yellow",
  },
}))(WarningIcon);

const IconVaraints = {
  success: CheckCircle,
  error: Warning,
  attention: AttentionIcon,
  // info: StyledInfo,
  // pending: StyledPending
};

export default IconVaraints;
