import React,{useEffect, useState} from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';


export default function Info(props) {

    const [passData,setPassData] = useState(null);

    console.log('props : ',props);
    useEffect(()=>{
       fetch(`/apiv1/pass/info/${props.id}`)
       .then(resp => resp.json())
       .then(resp => setPassData(resp.data))
       .catch(ex => {
        //    alert(ex.messag);
           setPassData({
               error : 'Error In getting pass data'
           })
       })
    },[1])

    return <div className="w3-center">
        <h4>Travel Pass Information</h4>
        {!passData && <div className="w3-center">
            <CircularProgress variant="determinate"   />
            </div>
        }
        {passData && passData.error && <div className="w3-padding "> 
        <div className="w3-section w3-padding w3-red w3-round">
        <h4>{passData.error}</h4>
        </div>
        </div>}
        {passData && !passData.error && <div className="w3-padding-small"> 
            <table className="w3-table w3-table-all" style={{maxWidth:'500px',margin:'auto auto'}}>
                <tr>
                    <td>Name</td>
                    <td>{passData.personName}</td>
                </tr>
                <tr>
                    <td>Phone Number</td>
                    <td>{passData.phoneNumber}</td>
                </tr>
                <tr>
                    <td>Status</td>
                    <td>{ passData.status == 'APPROVED' ?  <span className="w3-green w3-padding-small w3-label w3-round">Approved</span>  : 
                    <span className="w3-red w3-padding-small w3-label w3-round">{passData.status}</span>
                    }</td>
                </tr>

                <tr>
                    <td>Govt Id </td>
                    <td>{passData.json.govtIdType} # {passData.json.govtId}</td>
                </tr>
                <tr>
                    <td>Valid From</td>
                    <td>{passData.json.dateFrom}</td>
                </tr>
                <tr>
                    <td>Valid Till</td>
                    <td>{passData.json.dateTo}</td>
                </tr>
                <tr>
                    <td>
                        Routes
                    </td>
                    <td>
                        <ul className="w3-ul ">
                       { passData.json.routes.map(route => {
                           return <li>{route.locationFrom} to {route.locationTo}</li>
                       })}</ul>
                    </td>
                </tr>
                <tr>
                    <td>Location</td>
                    <td>{passData.location}</td>
                </tr>
                <tr>
                    <td>District</td>
                    <td>{passData.district}</td>
                </tr>
                <tr>
                    <td>State</td>
                    <td>{passData.state}</td>
                </tr>

            </table>
        </div>}
    </div>
}