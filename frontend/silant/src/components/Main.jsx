import React, { useState } from "react";
import { Link } from "react-router-dom";
import './css/Main.css';
import Cars from './Cars';
import CarDetail from "./CarDetail";
import TO from "./TO";
import TODetail from "./TODetail";
import Complaints from "./Complaints";
import ComplaintsDetail from "./ComplaintsDetail";


const Main = () => {

    const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
    
    return (
        <div className="Main">
            <div className='link'>
                <Link to={`/`}><button>Техника</button></Link>
                <Link to={`/to/`}><button>ТО</button></Link>
                <Link to={`/complaints/`}><button>Рекламации</button></Link>
            </div>
       </div>
    )
};


export default Main;