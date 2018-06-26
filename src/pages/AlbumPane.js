import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SortIcon from '@material-ui/icons/Sort';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 
  const left = 50 

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


const styles2 = theme => ({
    h3: {
    textAlign: 'left',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: `${theme.spacing.unit * 3}px`,

  },

  divider: {
    margin: `${theme.spacing.unit * 2}px 0`,
  },
  ch1: {
    float: 'right',
  },
   paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },

   
});

const styles = {
  root: {
    color: grey[600],
    '&$checked': {
      color: blue[500],
    },
  },
    paper: {
    position: 'absolute',
    width: 500,
    backgroundColor: 'white',
    boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
    padding:  100,
  },
  label: {
    fontSize: '70%',
    textAlign: 'left'
  },
   div:{
    marginLeft:10
  },
    button2: {
     backgroundColor: blue[500],
     float: 'right',

  },
     button3: {
/*      paddingBottom:36,*/
  },
  cont:{
backgroundColor:'white'
  },
   h3: {
    textAlign: 'left',
    marginLeft:10
  },
  checked: {},
  size: {
    width: 40,
    height: 40,
  },
  sizeIcon: {
    fontSize: 20,
  },
   rightToolbar: {
    marginLeft: 'auto',
    marginRight: -12,
  },
  toolbar:{

minHeight:'20px '
  },
};


class AlbumPane extends React.Component {
        constructor(props) {
        super(props);

        this.state = {
            albums: [],
            check: false,
            userId: 0,
            checkedA: [],
    selectedCheck: null,
    arr : [],
     options: [],
     mergedPhotos:[],
     open: false,
        }
    }
    getPhotos = (filterValue) => {
let data;
let self = this ;
       data = fetch('http://jsonplaceholder.typicode.com/photos?albumId=' + filterValue)
        .then( (response) => {
            return response.json()
        })
        .then( (json) => {
            return json;
        });

return data
}

   componentWillUpdate(nextProps, nextState) {
      console.log('Component WILL UPDATE!');
      console.log(nextProps)
      console.log(this.props)

      if(nextProps.userId !== this.props.userId){
        this.setState({
          checkedA: [],
          mergedPhotos: [],
        })
      }
   }

     componentWillReceiveProps(newProps) {
      console.log('shouldComponentUpdate ')
       this.state.userId = newProps.userId
      console.log(newProps)
//      console.log(this.props.check)
 fetch('http://jsonplaceholder.typicode.com/albums?userId=' + this.state.userId)
        .then( (response) => {
            return response.json()
        })
        .then( (json) => {
            this.setState({
                albums: json
            })
        });

      return true 
   }

      componentDidMount() {
 console.log('componentDidMount ')
    }

    updateCheck = event =>

 {

console.log("Asdasd")
console.log(event.target.checked)
this.setState({ check: event.target.checked }); 
 }

  handleFilterUpdate3 = (filterValue)  => {
            this.setState({
                  albumId: filterValue
            });

      }
  handleChange = async  (arg1 ,e ) => {

this.props.change2(arg1  );
    const options = this.state.options

const mergedPhotos = this.state.mergedPhotos

    let index, index2
    // check if the check box is checked or unchecked
    if (e.target.checked) {
      // add the numerical value of the checkbox to options array
      options.push(e.target.id)
     // var var1 = await  this.getPhotos(e.target.id)
 var var1 = this.getPhotos(e.target.id).then((response) => {

     mergedPhotos.push(response)
    this.setState({ 
      options: options,
      mergedPhotos: mergedPhotos 
     })

    this.props.change2(mergedPhotos);
 })

  
    } else {

      console.log("slice")
      // or remove the value from the unchecked checkbox from the array
      index = options.indexOf(e.target.id)
      index2 = mergedPhotos.indexOf(e.target.id)
      options.splice(index, 1)
       mergedPhotos.splice(index, 1)

        console.log(this.state.options , mergedPhotos)
    this.setState({ 

      options: options,
      mergedPhotos: mergedPhotos 
     })

    this.props.change2(mergedPhotos);
    }
    
  };


 handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  handleMenu = event => {
    console.log("select all")
  };





 


  render() {
  const { classes } = this.props;
const {albums} = this.state;
  return (
    <div style={styles.cont}>
 
        <Toolbar className={classes.toolbar}>
          <Typography variant="subheading" color="inherit">
            Albums
          </Typography>  

          <section className={classes.rightToolbar}>
               <FormGroup row>
        <FormControlLabel
         classes={{
        label: classes.label,
      }}
          control={
            <Checkbox
             
              onChange={this.handleChange.bind(this , "SelectALL")}

              value="checkedA"

              classes={{
                root: classes.root,
                checked: classes.checked,
              }}
             
              
            />
          }
          label="Select All"

        />
 
      </FormGroup>
               
                </section>
        </Toolbar>
      

    <Grid container spacing={7}>
{albums.map(key =>
      
        <Grid key={key.id} item xs={3}>


              <div style={styles.div} className="container">
       <FormGroup row>
        <FormControlLabel
         classes={{
        label: classes.label,
      }}
          control={
            <Checkbox
              id={key.id}
              key={key.id}
              onChange={this.handleChange.bind(this , key.id)}

              value="checkedA"

              classes={{
                root: classes.root,
                checked: classes.checked,
              }}
             
              
            />
          }
          label={key.title}

        />
 
      </FormGroup>
      </div>
        </Grid>

   
      )}

<div style={styles.button3} className={classes.rightToolbar}>
   <Button onClick={this.handleOpen}  style={styles.button2} variant="fab" color="primary" aria-label="add" className={classes.button}>
        <AddIcon />
      </Button>
      <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title" id="modal-title">
              Add Album
            </Typography>
            <Typography variant="subheading" id="simple-modal-description">
              Add Pictures
            </Typography>
            
          </div>
        </Modal>
</div>
   </Grid>


    </div>
  );
}
}

AlbumPane.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AlbumPane);