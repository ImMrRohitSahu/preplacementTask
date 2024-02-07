// Products.js
import { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
} from "../../features/productSlice.js";
import { addToCart, decrementQuantity } from "../../features/cartSlice.js"; 

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setProducts(data));
      })
      .catch(() => alert("Server Error!!!"));
  }, [dispatch]);

  const handleIncrement = (productId) => {
    const product = products.find((p) => p.id === productId);
    const existingProductInCart = products.find(
      (p) => p.id === productId && p.quantity > 0
    );

    if (existingProductInCart) {
      // If the product is already in the cart, increment its quantity by 1
    } else {
      // If the product is not in the cart, add it with the desired quantity
      dispatch(addToCart({ ...product, quantity: product.quantity + 1 }));
    }
  };

  const handleDecrement = (productId) => {
    const existingProductInCart = cartItems.find(
      (item) => item.id === productId && item.quantity > 0
    );
      console.log(existingProductInCart)
    if (existingProductInCart) {
      dispatch(decrementQuantity({id: existingProductInCart.id }));
    }
  };
  
  

  return (
    <Container fluid className="mt-4 mx-0">
      <Row className="d-flex justify-content-evenly align-items-center">
        {products.map((product, i) => {
          return (
            <Col
              key={i}
              xs={4}
              md={3}
              lg={2}
              className="product-card my-2 mb-4 py-1"
            >
              <div className="w-100 h-100 d-flex flex-column justify-content-start ">
                <div>
                  <img src={product.image} alt={product.title} />
                </div>
                <div className=" w-100 h-100 mt-1 d-flex flex-column justify-content-center mb-2">
                  <h6 className="title m-0 mb-1 ps-1 pb-1">
                    {product.title.slice(0, 50)}
                  </h6>
                  <h6 className="price m-0 ps-1 mb-1 pb-1 text-success">
                    &#8377; {(product.price * 85).toFixed(0)}
                    <del className="text-danger dis-price">
                      &#8377; {(product.price * 100).toFixed(0)}
                    </del>
                  </h6>
                  <h6 className="rate m-0 ps-1 pb-1">
                    Rating - {product.rating.rate}
                  </h6>
                </div>
                <div className="quantity d-flex justify-content-center align-items-center mb-1">
                  <Button
                    className="btn btn-dark me-3 p-0 px-3 py-1"
                    onClick={() => handleDecrement(product.id)}
                  >
                    -
                  </Button>
                  <h5>
                    {cartItems.find((item) => item.id === product.id)
                      ?.quantity || 0}
                  </h5>
                  <Button
                    className="btn btn-dark ms-3 p-0 px-3 py-1"
                    onClick={() => handleIncrement(product.id)}
                  >
                    +
                  </Button>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Products;
