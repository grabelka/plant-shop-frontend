import { Spinner } from 'react-bootstrap';
import { useState, useEffect } from "react";
import StarRating from '../components/StarRating';

const CartItem = (props) => {
  console.log(props.item.item)

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/products/${props.item.item}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setData(result);
          console.log(data)
          setIsLoading(false);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      );
  }, []);

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
    <div className="border border-ligft rounded p-3 m-1 mt-2 shadow" style={{width: 25 + 'em'}}>
      <img className="product-img card-img-top" src={data.image_url} alt="plant"/>
      <div className="card-body">
        <h5 className="card-title">{data.name}</h5>
        <p className="d-flex"><StarRating rating={data.rating}/>{data.rating}</p>
        <p className="card-text">${data.price}</p>
      </div>
    </div>
  );
};

export default CartItem;