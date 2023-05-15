const StarRating = (props) => {
  return (
    <span className="star-rating">
      {[...Array(props.rating)].map(() => {        
        return (         
          <span className="star">&#9733;</span>        
        );
      })}
      {[...Array(5-props.rating)].map(() => {        
        return (         
          <span className="star">&#9734;</span>        
        );
      })}
    </span>
  );
};

export default StarRating;