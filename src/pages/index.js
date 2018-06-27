import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import UserPane from "../pages/UserPane";
import PhotosPane from "../pages/PhotosPane";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AlbumPane from "../pages/AlbumPane";
const styles = {
  root: {
    textAlign: "center"
  },

  div: {
    display: "flex",
    flexDirection: "row wrap",
    padding: 20,
    width: "100%",
    background: "#f3f3f3"
  },
  paperLeft: {
    flex: 0,
    boxShadow:
      "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
    marginLeft: 10,
    marginRight: 10,
    textAlign: "center",
    padding: 10,
    background: "white"
  },

  paperRightTop: {
    maxHeight: "50%",

    flex: 4,
    boxShadow:
      "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
    marginBottom: 25,
    textAlign: "center"
  },
  paperRight: {
    flex: 4,
    boxShadow:
      "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
    textAlign: "center"
  },

  rightGrid: {
    padding: 0
  }
};

class Index extends React.Component {
  constructor() {
    super();
    this.handleFilterUpdate = this.handleFilterUpdate.bind(this);
    this.state = { name: "igi" };
  }

  handleFilterUpdate(filterValue) {
    this.setState({
      name: filterValue
    });
  }

  handleFilterUpdate2 = filterValue => {
    this.setState({
      userid: filterValue
    });
  };
  handleFilterUpdate3 = filterValue => {
    console.log(filterValue);
    this.setState({
      mergedPhotos: filterValue
    });
  };

  state = {
    open: false
  };

  getInitialState() {
    return { shared_var: "init" };
  }

  updateShared(shared_value) {
    this.setState({ shared_var: shared_value });
  }

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleClick = () => {
    this.setState({
      open: true
    });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <div style={styles.div}>
          <Grid container spacing={24}>
            <Grid style={styles.paperLeft} item xs={12}>
              <UserPane
                className={classes.paper}
                change={this.handleFilterUpdate2}
                name={this.state.userid}
              />
            </Grid>
            <Grid style={styles.rightGrid} item xs={12} lg={9}>
              <Grid style={styles.paperRightTop} item xs={12}>
                <AlbumPane
                  className={classes.paper}
                  change2={this.handleFilterUpdate3}
                  userId={this.state.userid}
                  mergedPhotos={this.state.mergedPhotos}
                />
              </Grid>

              <Grid style={styles.paperRight} item xs={12}>
                <PhotosPane
                  className={classes.paper}
                  mergedPhotos={this.state.mergedPhotos}
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(Index));
