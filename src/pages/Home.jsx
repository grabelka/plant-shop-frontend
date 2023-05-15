import ProductList from "../components/ProductList";

const Home = () => {
  return (
    <div>
      <div className="container pb-5">
        <div className="jumbotron p-3 p-md-5 text-white rounded main-cover-block mb-3">
          <div className="col-md-6 px-0">
            <h2 className="display-3 fst-italic fw-5 main-text">Explore Our Plants and Find One For Yourself</h2>
            <p className="lead my-3 fw-bold main-text">Indoor plants can be plenty of work, but when the perfect balance of light and moisture can be found to keep them happy, they have a way of totally transforming a space</p>
          </div>
        </div>
        <ProductList />
      </div>
    </div>
  );
};

export default Home;