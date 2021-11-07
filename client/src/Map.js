import React, { Component } from 'react';
import axios from 'axios';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import Multiselect from 'multiselect-react-dropdown';
import Button from 'react-bootstrap/Button'
import './Map.css';
import BetaPopup from './BetaPopup.jsx';

const mapStyles = {

  height: '70%',
  marginLeft:'5px',
  marginRight:'5px',
  paddingTop: '5px'
};

export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,  // Hides or shows the InfoWindow
        activeMarker: {},          // Shows the active marker upon click
        selectedPlace: {},          // Shows the InfoWindow to the selected place upon a marker
        minted_data:[],
        unminted_data:[],
        data:null,
        options: [{name: 'Legendary', id: 1},{name: 'Epic', id: 2},{name: 'Rare', id: 3},{name: 'Common', id: 4},{name: 'Not yet listed', id: 5}],
        selectedValue:[{name: 'Legendary', id: 1},{name: 'Epic', id: 2},{name: 'Rare', id: 3},{name: 'Common', id: 4}],
        selected:['legendary','epic','rare','common'],
        selectedItems:['legendary','epic','rare','common']
      
      };



      onMapLoad = (map) => {
         map.data.loadGeoJson('/geo.json')
      }

      componentDidMount(){
        axios.get(process.env.REACT_APP_API_URL+`/cords`)
      .then(res => {
        const res_data = res.data;
        if(res_data)
          this.setState({data:res_data})
/*
        if(res_data){
        var minted_data_import = [];
        var unminted_data_import = [];
          res_data.features.map((index)=> {
            
              if(index.properties.status==='minted') {
                minted_data_import.push(index);
              }
              else
                unminted_data_import.push(index);
          }).then(
            this.setState({ minted_data:minted_data_import })

          )

        }*/
          
      })
      }

      onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
  
    onClose = props => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        });
      }
    };

   onSelect(selectedList,selectedItem){
     console.log(selectedList)

     var array = [];

     for(var i=0;i<selectedList.length;i++){
      var newItem;
      if(selectedList[i].id==1)
          newItem='legendary'
      else if (selectedList[i].id==2)
          newItem='epic'
      else if (selectedList[i].id==3)
          newItem='rare'
      else if (selectedList[i].id==4)
        newItem='common'
      else if (selectedList[i].id==5)
        newItem='nyl'

      array.push(newItem)
     }

     this.setState({selectedItems:array});

   }

   onRemove(removedList){
        console.log(removedList)

     var array = [];

     for(var i=0;i<removedList.length;i++){
      var newItem;
      if(removedList[i].id==1)
          newItem='legendary'
      else if (removedList[i].id==2)
          newItem='epic'
      else if (removedList[i].id==3)
          newItem='rare'
      else if (removedList[i].id==4)
        newItem='common'
      else if (removedList[i].id==5)
        newItem='nyl'

      array.push(newItem)
     }

     this.setState({selectedItems:array});

   }

   getIconUrl(rank) {

    if(rank==='legendary')
        return 'https://mt.google.com/vt/icon/text=L&psize=16&font=fonts/arialuni_t.ttf&color=ff330000&name=icons/spotlight/spotlight-waypoint-b.png&ax=44&ay=48&scale=1';
    else if(rank==='epic')
        return 'https://mt.google.com/vt/icon/text=E&psize=16&font=fonts/arialuni_t.ttf&color=ff330000&name=icons/spotlight/spotlight-waypoint-b.png&ax=44&ay=48&scale=1';
    else if(rank==='rare')
        return 'https://mt.google.com/vt/icon/text=R&psize=16&font=fonts/arialuni_t.ttf&color=ff330000&name=icons/spotlight/spotlight-waypoint-b.png&ax=44&ay=48&scale=1';
    else if(rank==='common')
        return 'https://mt.google.com/vt/icon/text=C&psize=16&font=fonts/arialuni_t.ttf&color=ff330000&name=icons/spotlight/spotlight-waypoint-b.png&ax=44&ay=48&scale=1';

   }
    

  render() {
    return (
      
      <div>
          <BetaPopup></BetaPopup>
          <Multiselect
        options={this.state.options} // Options to display in the dropdown
        selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
        onSelect={this.onSelect.bind(this)} // Function will trigger on select event
        onRemove={this.onRemove.bind(this)} // Function will trigger on remove event
        displayValue="name" // Property name to display in the dropdown options
        style={{width:'100px'}}
        showCheckbox
        /><br/>
         <div className="map">
      <GoogleApiWrapper></GoogleApiWrapper>
     
      </div>
      <Map
        google={this.props.google}
        zoom={12}
        style={mapStyles}
        initialCenter={
          {
            lat: 41.2681714244654,
            lng: -70.074114274778

            
          }
        }
      >
         {this.state.data!=null ? (this.state.data.features.map((cords)=>

            (this.state.selectedItems.indexOf(cords.properties.rank)!=-1  ? (<Marker
            onClick={this.onMarkerClick}
          
            position={
              {
                lat: cords.geometry.coordinates[1], 
                lng: cords.geometry.coordinates[0]
              }
              
            }
            icon={{url:this.getIconUrl(cords.properties.rank)}}
            name={cords.properties.nft_id}
            address={cords.properties.number+" "+cords.properties.street}
            id={cords.properties.id}
            rank={cords.properties.rank}
            
            />):<div></div>)
            
            
            )) : <div></div>
            
         
         }
          
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
          style={{backgroundColor:'grey',
              height:'600px'}}
        >
          <div>
            
            <img width='200px' style={{border: '1px solid black'}} src={"deeds/"+this.state.selectedPlace.id+'.png'}/>
            <br/><br/>
            <b>Address: </b>{this.state.selectedPlace.address}<br/>
            <b>Rank: </b>{this.state.selectedPlace.rank}<br/><br/>
            <a href = {"/ack/"+this.state.selectedPlace.id} target = "_blank" rel = "noopener noreferrer"><Button  variant="primary">Mint a deed</Button>{' '}{' '}</a><br/><br/>
            <a href = {"/ack/"+this.state.selectedPlace.id} target = "_blank" rel = "noopener noreferrer"><Button variant="secondary">View crypto info</Button>{' '}</a>

            

          </div>
        </InfoWindow>
      </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API
})(MapContainer);

