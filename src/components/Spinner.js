import React from 'react'
import loading from "./Spinner-2.gif";
const Spinner = ()=>{
    
        return (
            <div style={{display: 'flex',justifyContent: 'center'}}>
                <img src={loading} alt="loading"/>
            </div>
        )
    
}

export default Spinner
