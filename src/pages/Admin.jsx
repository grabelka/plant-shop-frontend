import { Spinner } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';
import NoPage from "./NoPage";

const Admin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');
    let role = '';
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
      }
    });
    email && setUser({email, accessToken, role});
    !email &&setUser(null);

    fetch(`http://localhost:3000/users`)
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
    // TODO: Handle 
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

  if (user && user.role && user.role === 'ADMIN') {
    return (
      <div>
        <div className="container">
          <h2>Hello, Admin!</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Surname</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user.email}>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.surname}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      );
  }
  return <NoPage />;
};

export default Admin;