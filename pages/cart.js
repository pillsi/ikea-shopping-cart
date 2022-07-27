import "../src/styles.css";
import img from "../src/cart.png";

export default function Cart(props) {
  return (
    <div>
      <div className="cart-total">
        <h1 onClick={props.goHome}>Shopping Cart</h1>
        <a onClick={props.goCart}>
          {/* total item */}
          <img src={img} /> <span>{props.item}</span>
        </a>
        <h5>Total price: ${props.price}</h5>
        <div className="item-list">
          {props.carts.length > 0
            ? props.carts.map((cart) => {
                return (
                  <div>
                    <p>
                      <img src={cart.picture} />
                    </p>
                    <p>{cart.title}</p>
                    <p>${cart.price}</p>
                    <button onClick={() => props.num(cart, false)}>-</button>
                    <span>{cart.num}</span>
                    <button onClick={() => props.num(cart, true)}>+</button>
                    <p>
                      <button onClick={() => props.remove(cart)}>Remove</button>
                    </p>
                  </div>
                );
              })
            : "Not interested in our product? Send feedback now"}
        </div>
      </div>
    </div>
  );
}
