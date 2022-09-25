import React, { Component } from 'react'
import { Link } from 'react-router-dom';


class Headers extends Component{
    render(){
        return(
            <>
            <div className='Header'>Đây là header   <button type="button" className='btn btn-primary ' color="link"><Link className='text-white' to="/clients">Clients</Link></button></div>
            </>
            
            
        )
    }
}
export default Headers;