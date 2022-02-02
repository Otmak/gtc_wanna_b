import React, {Component} from 'react';
import './tabmaster.css';
import Skeleton from '@mui/material/Skeleton';
import AssetContainer from '../asset_contents/asset_container/asset_container.js';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';


export default class TabMaster extends Component {//rewrt
  constructor(props){
    super(props)
    this.state = {
      assetData : this.props.data,
      filteredAssetData:''
    }
  }


  creation(data, type) {

    const { assetData } = this.state;

      const mainArray = [];
      if ( type === 'p'){
        const listOfTabPanels = [];
        for ( let i in data ){
          listOfTabPanels.push(
            <TabPanel key={i} className='tab-panel'>
               <AssetContainer name={data[i].child.fleet} id={i} gps={data[i].child.gps} data={assetData}/>
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


  render(){

    const { assetData, filteredAssetData } = this.state;

    console.log('from Tab', assetData)

    let filteredassetList;

    return (
      <div className='tabs-container-main-div'>
        <Tabs className='tabs-container'>
          <TabList className='tab-list-container' >
            <TextField className='search-textfield' id="filled-search" label="Search" type="search" variant="filled" />
            { this.creation( assetData, 't') }
          </TabList>
          { this.creation( assetData, 'p') }
        </Tabs>
      </div>
      )
  }
}