// Cart.js
import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrementQuantity } from "./../features/cartSlice";
import { AuthContext } from "../contexts/AuthContext";

const Cart = () => {
  const {isAuth} = useContext(AuthContext)
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const finalPrice = cartItems.reduce(
      (total, item) => total + item.price * 85 * item.quantity,
      0
    );
    setTotalPrice(finalPrice);
  }, [cartItems]);

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
    console.log(existingProductInCart);
    if (existingProductInCart) {
      dispatch(decrementQuantity({ id: existingProductInCart.id }));
    }
  };

  return (
    <>
      <Container fluid="lg" className="my-4">
        <Row className="text-center mb-3">
          <Col>
            {cartItems.length !== 0 && isAuth ? (
              <h3 className="text-primary">YOUR CART ITEMS</h3>
            ) : (
              <h3 className="text-danger">EMPTY CART, NO ITEMS</h3>
            )}
          </Col>
        </Row>
        {cartItems.length > 0 && isAuth && (
          <>
            <Row className="mb-4">
              <Col>
                <h6>Total Items - {cartItems.length}</h6>
              </Col>
            </Row>
            {cartItems.map((item, i) => (
              <Row key={i} className="my-3">
                <Col
                  xs={6}
                  className="d-flex justify-content-start align-items-center"
                >
                  <h6 className="cart-title">{item.title.split(0, 50)}</h6>
                </Col>
                <Col xs={3} className="text-center">
                  <div className="quantity d-flex justify-content-center align-items-center mb-1">
                    <Button
                      className="btn btn-danger me-3 p-0 cart-btn"
                      onClick={() => handleDecrement(item.id)}
                    >
                      -
                    </Button>
                    <h6>{item.quantity}</h6>
                    <Button
                      className="btn btn-success ms-3 p-0 cart-btn"
                      onClick={() => handleIncrement(item.id)}
                    >
                      +
                    </Button>
                  </div>
                </Col>
                <Col
                  xs={3}
                  className="d-flex justify-content-end align-items-center"
                >
                  <h6 className="cart-price">
                    &#8377; {(item.price * 85).toFixed(0)}
                  </h6>
                </Col>
              </Row>
            ))}
            <Row className="my-4">
              <Col>
                <h5>Total Price : &#8377; {totalPrice.toFixed(2)}</h5>
              </Col>
            </Row>
            <Row className="mt-5">

            </Row>
          </>
        )}
      </Container>

      {cartItems.length !== 0 && (
        <Button className="checkout-btn py-2">Checkout Now</Button>
      )}
    </>
  );
};

export default Cart;
