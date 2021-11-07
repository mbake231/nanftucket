import React, { Component } from 'react';
import axios from 'axios';


export class Details extends Component {
    state = {
        address:null,
        id:null,
        nft_id:null
      };

     
      componentDidMount(){
        var id = 'evt62';
        axios.get(`http://localhost:3000/ack?id=`+id)
      .then(res => {
        const res_data = res.data;
        console.log(res_data.properties)
        this.setState({ address:res_data.properties.number+" "+res_data.properties.street+' '+res_data.properties.city+', '+res_data.properties.region+" "+res_data.properties.postcode });
        this.setState({ id:res_data.properties.id });
        this.setState({ nft_id:res_data.properties.nft_id });
      })
      }


  render() {
    return (<div>Address:{this.state.address}<br/>
                 Cardano id:<a href='https://cardanoscan.io/token/2a0ef920412cef1d38970321ca7376dd2d8c80ae' target = "_blank" rel = "noopener noreferrer">{this.state.nft_id}</a><br/>
                 Deed:<img width="300px" src={'/deeds/'+this.state.id+'.png'}/><br/>
                 IPFS:tbd
    </div>
      
    );
  }
}
export default Details
