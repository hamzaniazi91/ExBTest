import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SortIcon from "@material-ui/icons/Sort";
import TablePagination from "@material-ui/core/TablePagination";
import LinearIndeterminate from "../pages/LinearIndeterminate";
import LinearProgress from "@material-ui/core/LinearProgress";

const styles = theme => ({
  root: {
    // display: 'flex',
    flexGrow: 1,
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    paddingLeft: 52
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  rightToolbar: {
    marginLeft: "auto",
    marginRight: -12
  },
  toolbar: {
    minHeight: "20px "
  }
});

class PhotosPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      result: [],
      auth: true,
      anchorEl: null,
      rowsPerPage: 18,
      page: 0,
      firstTime: true
    };
  }

  componentWillReceiveProps(newProps) {
    console.log("Component DID UPDATE!");

    console.log(newProps);
    if (newProps.mergedPhotos !== undefined) {
      console.log(newProps.mergedPhotos);

      var recievedPhotos = newProps.mergedPhotos;

      const ar3 = [];
      console.log(recievedPhotos.length);
      for (var i = recievedPhotos.length - 1; i >= 0; i--) {
        ar3.push(recievedPhotos[i]);
      }

      const ar4 = [];
      ar3.forEach(a => ar4.push(...a));
      console.log(ar4);
      this.setState({
        result: ar4,
        count: ar4.length,
        firstTime: false
      });
    }
    if (
      newProps.mergedPhotos !== undefined &&
      newProps.mergedPhotos.length == 0
    ) {
      this.setState({
        firstTime: true
      });
    }
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleAcs = () => {
    let result = this.state.result.sort((a, b) => a.id - b.id);

    this.setState({
      anchorEl: null,
      result: result
    });
  };

  handleDcs = () => {
    let result = this.state.result.sort((a, b) => b.id - a.id);

    this.setState({
      anchorEl: null,
      result: result
    });
  };

  render() {
    const { classes } = this.props;

    const {
      firstTime,
      result,
      count,
      anchorEl,
      rowsPerPage,
      page
    } = this.state;

    const open = Boolean(anchorEl);
    let Progress;
    let Grid;
    console.log(result, firstTime);
    if (result.length <= 0 && !firstTime) {
      Progress = <LinearProgress color="primary" />;
    } else {
      Progress = "";
    }

    if (result.length > 0) {
      Grid = (
        <GridList cols={6} className={classes.gridList} cellHeight={100}>
          {result
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((f, i) => {
              return (
                <div
                  style={{
                    display: "block",
                    width: 1000,
                    maxWidth: "14.6667%",
                    paddingLeft: "2%",
                    height: "auto"
                  }}
                  key={f.id}
                >
                  <img
                    style={{
                      display: "block",
                      maxWidth: "100%",
                      height: "auto"
                    }}
                    src={f.thumbnailUrl}
                  />
                  {/*<Image src={f.thumbnailUrl} responsive   />   */}

                  <Typography
                    style={{ lineHeight: 1 }}
                    variant="caption"
                    gutterBottom
                    align="left"
                  >
                    {f.title}
                  </Typography>
                </div>
              );
            })}
        </GridList>
      );
    } else {
      Grid = (
        <Typography
          type="body1"
          style={{ fontSize: "inherit", color: "rgba(0, 0, 0, 0.54)" }}
        >
          {" "}
          Please Select Album First{" "}
        </Typography>
      );
    }

    return (
      <div className={classes.root}>
        <div>{Progress}</div>
        <Toolbar className={classes.toolbar}>
          <Typography variant="subheading" color="inherit">
            {count} Photos
          </Typography>

          <section className={classes.rightToolbar}>
            <IconButton
              aria-owns={open ? "menu-appbar" : null}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              <SortIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleAcs}>Asc</MenuItem>
              <MenuItem onClick={this.handleDcs}>Dsc</MenuItem>
            </Menu>
          </section>
        </Toolbar>

        {Grid}

        <TablePagination
          component="div"
          count={result.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </div>
    );
  }
}
PhotosPane.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PhotosPane);
