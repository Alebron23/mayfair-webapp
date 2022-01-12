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

const IconVaraints = {
  success: CheckCircle,
  error: Warning,
  // warning: StyledWarning,
  // info: StyledInfo,
  // pending: StyledPending
};

export default IconVaraints;
