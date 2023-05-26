import React from 'react'

interface IHomeDetails {};

const HomeDetails: React.FC<IHomeDetails> = (props) => {
    return <div style={{height:'100vh', backgroundColor:'yellow', display:'flex', justifyContent:'center', alignItems:'center', flexGrow:2}}>
        <p>This is Details</p>
    </div>
}

export  default HomeDetails;