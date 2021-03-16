import React, { useContext } from "react";
import "./header.css";
import Logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return (
    <div className='header'>
      <img className='logo' src={Logo} alt='' />
      <nav>
        <Link to='/shop'>Shop</Link>
        <Link to='/review'>Order Review</Link>
        <Link to='/inventory'>Manage Inventory</Link>
        <button onClick={() => setLoggedInUser({})}>Sign out</button>
      </nav>
    </div>
  );
};

export default Header;
