import React, {Component} from 'react';
import './tabmaster.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';


export default class TabMaster extends Component {
  constructor(props){
    super(props)
    this.state = {
      assetData : this.props.data,
    }
  }

  render(){

    const { assetData } = this.state;
    const parseTabs = (data)=>
    {
      const listOfTabs = [];
      for ( let i in data ){
        listOfTabs.push( 
          <Tab key={i} >
            <List className='tabItem'>
              <ListItem>
                <ListItemText primary={ data[i].child.fleet } />
              </ListItem>
              <Divider component="li" />
            </List>
          </Tab>
        );
      }
      return listOfTabs;
    }

    const parseTabPanels = (data) =>
    {
      const listOfTabPanels = [];
      for ( let i in data ){
        listOfTabPanels.push(
          <TabPanel key={i} className='tab-panel'>
             <p>{ data[i].child.fleet } </p>
          </TabPanel>
        );
      }
      return listOfTabPanels;
    }

    return (
      <div className='tabs-container-main-div'>
        <Tabs className='tabs-container'>
          <TabList className='tabItem-container' >
            <TextField position ='fixed' className='search-textfield' id="filled-search" label="Search" type="search" variant="filled" />
            { parseTabs(assetData) }
          </TabList>
          { parseTabPanels(assetData) }
        </Tabs>
      </div>
      )
  }
}