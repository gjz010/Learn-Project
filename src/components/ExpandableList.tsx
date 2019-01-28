import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import withStyles from '@material-ui/styles/withStyles';
import '../utils/fontawesome.ts';
import { Collapse } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

const useStyles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
  },
  title: {
    'margin-left': '10px',
  },
  icon: {
    width: '18px',
    height: '18px',
  },
  nested: {
    paddingLeft: '10px',
  },
});


class ExpandableList extends React.Component<any, any> {

  public state = {};

  constructor(props) {
    super(props);
    props.items.map(i => this.state[i.name] = false);
  }

  render() {

    const { classes, name, icon, items, subitems } = this.props;

    return (
        <List
            className={classes.root}
            component="nav"
            subheader={
              <ListSubheader component="div">
                <FontAwesomeIcon icon={icon}/>
                <span className={classes.title}>{name}</span>
              </ListSubheader>
            }
        >

          {
            items.map(i => (
                <div key={i.name}>
                  <ListItem button={true} onClick={() => this.handleClick(i.name)}>
                    <ListItemIcon className={classes.icon}>
                      <FontAwesomeIcon icon={i.icon}/>
                    </ListItemIcon>
                    <ListItemText primary={i.name}/>
                    {this.state[i.name] ? <ExpandLess/> : <ExpandMore/>}
                  </ListItem>
                  <Collapse in={this.state[i.name]} timeout="auto" unmountOnExit={true}>
                    <List
                        className={classes.root}
                        // component="div"
                        disablePadding={true}
                    >
                      {
                        subitems.map(s => (
                            <ListItem button={true} className={classes.nested} key={s.name}>
                              <ListItemIcon className={classes.icon}>
                                <FontAwesomeIcon icon={s.icon}/>
                              </ListItemIcon>
                              <ListItemText primary={s.title}/>
                            </ListItem>
                        ))
                      }
                    </List>
                  </Collapse>
                </div>
            ))
          }
        </List>
    );
  }

  private handleClick = (name) => {
    this.setState({ [name]: !this.state[name] });
  }

}

export default withStyles(useStyles)(ExpandableList);