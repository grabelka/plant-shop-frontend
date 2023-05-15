import { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Item from './Item';
import ReactPaginate from 'react-paginate';

function ProductList() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 6;

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoading(false);
          setData(result);
          setFilteredData(result);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      );
  }, []);
  
  function handleSearch(event) {
    event.preventDefault();
    setFilteredData(data.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase().trim())));
  }

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredData.length;
    setItemOffset(newOffset);
  };

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
    <div className="container">
      <form onSubmit={handleSearch} className="d-flex">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="form-control me-2 search-input"
        />
        <button type="submit" className="btn btn-success">Search</button>
      </form>
      <div className='pagination'>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={Math.ceil(filteredData.length / itemsPerPage)}
            previousLabel="< prev"
            renderOnZeroPageCount={null}/>
        </div>
      <div className="d-flex flex-wrap justify-content-start">
        {filteredData.slice(itemOffset, itemOffset + itemsPerPage).map((product) => (
          <Link key={product.name}  to={`/product/${product.name}`} className="text-decoration-none text-dark"><Item item={product} key={product.id} /></Link>
        ))}
      </div>
      <br/>
    </div>
  );
}

export default ProductList;