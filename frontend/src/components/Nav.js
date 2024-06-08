import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/login');
    }
    return(
        <div>
            <img 
            alt='logo'
            className="logo"
            src="https://neilpatel.com/wp-content/uploads/2021/03/source-code_featured-image.png" />
            {
                auth ?
                <ul className="nav-ul">          
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Products</Link></li>
                <li><Link to="/update">Update Products</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link onClick={logout} to="/login">Logout ({JSON.parse(auth).name} - {JSON.parse(auth).email})</Link></li>
                </ul>
                :
                <ul className="nav-ul nav-right">          
                    <li><Link to="/signup">Sign up</Link></li>
                    <li><Link to="/login">Login</Link></li>           
                </ul>
                
            }
            
        </div>
    )
}

export default Nav;