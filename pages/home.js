import "../src/styles.css";
import data from "../src/data.json";
import img from "../src/cart.png";

export default function Home(props) {
  const addToCart = (cart) => {
    props.add(cart);
  };

  return (
    <div className="App">
      <div className="cart-total">
        <h1>IKEA Store</h1>
        {/* ?什么时候用箭头函数语法，什么时候用普通函数？比如对比line25 */}
        <a onClick={props.goCart}>
          <img src={img} />
          <span>{props.item}</span>
        </a>
        <h5>Total Price: ${props.price}</h5>
        <div className="item-list">
          {data.map((cart) => {
            return (
              <div>
                <p>
                  <img src={cart.picture} />
                </p>
                <p>{cart.title}</p>
                <p>${cart.price}</p>
                <p>
                  <button onClick={() => addToCart(cart)}>Add</button>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
