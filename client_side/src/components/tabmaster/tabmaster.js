import React, {Component} from 'react';
import './tabmaster.css';
import AssetContainer from '../asset_contents/asset_container/asset_container.js';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
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
    const creation = (data, type) => {

      const mainArray = [];
      if ( type === 'p'){
        const listOfTabPanels = [];
        for ( let i in data ){
          listOfTabPanels.push(
            <TabPanel key={i} className='tab-panel'>
               <AssetContainer data={data[i].child.fleet} id={i} gps={data[i].child.gps}/>
            </TabPanel>
          )};
          return listOfTabPanels;

      }else if (type === 't'){

        const listOfTabs = [];
        for ( let i in data ){
          listOfTabs.push( 
            <Tab key={i} >
              <List className='tabItem'>
                <ListItem className='listItem'>
                  <ListItemAvatar/>
                  <Avatar className={ data[i].child.status === '1' ? 'active-assetList-avatar' : 'inactive-assetList-avatar'}>
                    {data[i].child.status === '1'? 'a' : 'i'}
                  </Avatar>
                  <ListItemText primary={ data[i].child.fleet } secondary={data[i].child.type.type} />
                </ListItem>
                <Divider component="li" />
              </List>
            </Tab>
          )};
          return listOfTabs;
      }else{

        return (<p> {'specify type please'} </p>)
      }
    }

    return (
      <div className='tabs-container-main-div'>
        <Tabs className='tabs-container'>
          <TabList className='tabItem-container' >
            <TextField position ='fixed' className='search-textfield' id="filled-search" label="Search" type="search" variant="filled" />
            { creation( assetData, 't') }
          </TabList>
          { creation( assetData, 'p') }
        </Tabs>
      </div>
      )
  }
}