import { useContext } from "react";
import { ApiContext } from "../../contexts/ApiContext";
import { Col, Container, Row } from "react-bootstrap";

const Products = () => {
  const { products } = useContext(ApiContext);

  return (
    <Container className="mt-4 mx-0">
      <Row className="d-flex justify-content-evenly">
        {products.map((product, i) => {
          return (
            <Col
              key={i}
              xs={4}
              md={3}
              lg={2}
              className="product-card m-2 mb-4 p-1"
            >
              <div className="w-100 h-100 d-flex flex-column justify-content-start ">
                <div>
                  <img src={product.image} />
                </div>
                <div className=" w-100 h-100 mt-1 d-flex flex-column justify-content-evenly">
                  <h6 className="title m-0 ps-1 pb-1">
                    {product.title.slice(0, 50)}
                  </h6>
                  <h6 className="price m-0 ps-1 pb-1 text-success">
                    &#8377; {(product.price * 85).toFixed(0)}
                    <del className="text-danger dis-price">&#8377; {(product.price * 100).toFixed(0)}</del>
                  </h6>
                  <h6 className="rate m-0 ps-1 pb-1">
                    Rating - {product.rating.rate}
                  </h6>
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
