import axios from 'axios';
import StarRating from "./StarRating";

const Item = (props) => {
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
        item: props.item.name
      }, {
      headers: {
        'Authorization': `${accessToken}`,
        'Content-Type': 'application/json'
      }})
      .then((response) => {
        alert(`${props.item.name} added to cart`)
        })
      .catch((error) => {
        alert('Error', error.message);
      });
    }
  }
  
  return (
    <div className="border border-ligft rounded p-3 m-1 mt-2 shadow" style={{width: 25 + 'em'}}>
      <img className="product-img card-img-top" src={props.item.image_url} alt="plant"/>
      <div className="card-body">
        <h5 className="card-title">{props.item.name}</h5>
        <p className="d-flex"><StarRating rating={props.item.rating}/>{props.item.rating}</p>
        <p className="card-text">${props.item.price}</p>
        <button type="button" className="btn btn-success" onClick={handleAddToCart}>Add To Cart</button>
      </div>
    </div>
  );
};

export default Item;