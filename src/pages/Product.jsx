import axios from 'axios';
import {useParams} from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { useState, useEffect } from "react";
import StarRating from '../components/StarRating';

const Product = () => {
  const {name} = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/products/${name}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setData(result);
          setIsLoading(false);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      );
  }, []);

  function handleAddToCart(event) {
    event.preventDefault();
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');
    let role;
    let email;
    let accessToken;
    cookies.forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      if (cookies.length <= 1) {
        alert('Login before adding product to cart');
        return;
      }
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
    if (cookies.length > 1) {
      axios.post('http://localhost:3000/cart', {
        user: email, 
        item: name
      }, {
      headers: {
        'Authorization': `${accessToken}`,
        'Content-Type': 'application/json'
      }})
      .then((response) => {
        alert(`${name} added to cart`)
        })
      .catch((error) => {
        alert('Error', error.message);
      });
    }
  }

  if (isLoading) {
    return( 
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>);
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2 className="container d-flex mb-5">{data.name}<StarRating rating={data.rating}/> </h2>
      <div className="container d-flex">
        <img className="product-img mt-3" src={`../${data.image_url}`} alt={data.image_url}/>
        <div className="card-body m-3">
          <h5 className="card-title">Description: </h5>
          <p className="card-text">{data.description}</p>
          <p className="card-text">${data.price}</p>
          <button type="button" className="btn btn-success" onClick={handleAddToCart}>Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;