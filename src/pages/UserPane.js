import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchBar from 'material-ui-search-bar'
import AccountCircle from '@material-ui/icons/AccountCircle';
import AlbumPane from '../pages/AlbumPane'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
  },
    flex: {
    flex: 1,
  },
});

class UserPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      searchedItems : [],
      selected: null
    };
  }
    componentDidMount() {
    fetch("http://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            isLoaded: true,
            items: result,
            searchedItems: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

   componentWillMount(){

    console.log(this.state.searchedItems)
  }

  doSomethingWith = (arg1) => {
    console.log(arg1 , this.state.items)
  }

  onItemClickHandler = (arg1 ,e ) => {
this.setState({ selected: arg1.id });
 this.props.change(arg1.id);
    console.log(arg1.id )
  }
  state = {
    checked: [1],
  };


filterSearch(text){
    const newData = this.state.items.filter((item)=>{
      const itemData = item.name.toUpperCase()
      const textData = text.toUpperCase()
      return itemData.indexOf(textData)>-1
    });
    this.setState({
      text:text,
      searchedItems: newData // after filter we are setting users to new array
    });
  }

  render() {
    const { classes } = this.props;
    const { error, isLoaded, items ,searchedItems , selected} = this.state;
    console.log(this.state)
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default" children= {
      <input />
    } >
     <SearchBar
     placeholder="Users"
     
    value={this.state.value}

    onChange={(newValue) => this.filterSearch(newValue)}
    onRequestSearch={this.doSomethingWith(this.state.value)}
  />
      </AppBar>
        <List >
          {searchedItems.map(value => (
            <div key={value.id} onClick={this.onItemClickHandler.bind(this , value)} selected={selected === 2}>
            <ListItem  dense button className={classes.listItem}>
              <Avatar>W</Avatar>
              <ListItemText primary={value.name} secondary={value.username} />
             
           
            </ListItem>
          <Divider inset component="li" />
            </div>
          ))}
        </List>
      </div>
    );
  }
 }
}

UserPane.propTypes = {
  classes: PropTypes.object.isRequired,

};

export default withStyles(styles)(UserPane);