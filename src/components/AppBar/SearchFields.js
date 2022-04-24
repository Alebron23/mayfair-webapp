import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import _debounce from "lodash/debounce";
import { connect } from "react-redux";

// Redux
import { addNotif } from "../../store/notifications/actions";
import { setIsAuthed } from "../../store/auth/reducer";
import { selectIsAuthed } from "../../store/auth/reducer";
import { setSearching } from "../../store/vehicles/actions";
import { selectVehicleSearch } from "../../store/vehicles/selectors";

const useStyles = makeStyles((theme) =>
  createStyles({
    search: {
      p: "2px 4px",
      display: "flex",
      alignItems: "center",
      marginLeft: "auto",
      width: "100%",
      marginTop: 16,

      "&:hover": {
        boxShadow: "1px 3px 10px rgba(0,0,0, .25)",
      },
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
        marginTop: 0,
      },
    },
    input: {
      ml: 1,
      flex: 1,
      marginLeft: 8,

      "&:hover": {
        cursor: "pointer",
      },
    },
  })
);

function SearchField({ searching, setSearching }) {
  const classes = useStyles();
  const [searchText, setSearchText] = React.useState("");

  const debounceHandler = React.useCallback(
    _debounce((value) => {
      setSearching(false);
    }, 1000),
    []
  );

  const handleChange = React.useCallback(
    (e) => {
      setSearchText(e.target.value);

      if (!searching) {
        setSearching(true);
      }

      debounceHandler(e.target.value);
    },
    [searching, setSearching, debounceHandler]
  );

  const keyPressed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <Paper className={classes.search}>
      <InputBase
        className={classes.input}
        onKeyPress={keyPressed}
        onChange={handleChange}
        value={searchText}
        placeholder="Search..."
        inputProps={{
          "aria-label": "search vehicle",
        }}
        autoFocus
        size="small"
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthed: selectIsAuthed(state),
    searching: selectVehicleSearch(state),
  };
};

const SearchFieldWrapper = connect(mapStateToProps, {
  addNotification: addNotif,
  setIsAuthed,

  setSearching,
})(SearchField);

export default SearchFieldWrapper;
