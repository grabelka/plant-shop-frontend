import { Spinner } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import CartItem from '../components/CartItem';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');
    let role;
    let email;
    let accessToken;
    cookies.forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      if (name === 'accessToken') {
        accessToken = value;
      }
      if (name === 'email') {
        email = value;
      }
      if (name === 'role') {
        role = value;
        if (role === 'ADMIN') {
          window.location.pathname = '/admin';
        }
      }
    });
    email && setUser({email, accessToken, role});
    !email && setUser(null);

    fetch(`http://localhost:3000/users/${email}`, {
      method: 'GET',
      headers: {
        'Authorization': `${accessToken}`
      }
    })
    .then((res) => res.json())
    .then(
      (result) => {
        setData(result);
      },
      (error) => {
        setIsLoading(false);
        setError(error);
      }
    ).then(fetch(`http://localhost:3000/cart/`, {
      method: 'GET',
      headers: {
        'Authorization': `${accessToken}`
      }
    })
    .then((res) => res.json())
    .then(
      (result) => {
        setCart(result);
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        setError(error);
      }
    ));
  }, []);

  if (isLoading) {
    return( 
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>);
  }

  if (error) {
    return <div className="container">Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="container">
        <h1 className="display-5"><b>Profile</b></h1>
        <p className='lead'><b>Hello, {data.name} {data.surname}!</b></p>
        <p>Email: <i>{data.email}</i></p>
        <hr className='custom-divider'/>
        <p className='lead'><b>Your Cart</b></p>
        <div className="d-flex flex-wrap justify-content-start mb-5">
          {cart.filter(cartItem => cartItem.user === user.email).map((product) => (
            <CartItem item={product} key={product.id} />
          ))}
        </div>
        <br/>
      </div>
    </div>
  );
};

export default Profile;