import "./styles.css";
import Home from "../pages/home";
import Cart from "../pages/cart";
import { useState } from "react";

export default function App() {
  //所有状态要在父组件里面提升，这样才能传到子组件更新
  //兄弟之间不能传，要通过父组件形成一个三角关系
  // 不需要共享的就不需要传父组件
  const [isHome, setPath] = useState(true);
  const [carts, setCarts] = useState([]);
  const [item, setItem] = useState(0);
  const [price, setPrice] = useState(0);

  const handleAddCart = (cart) => {
    setItem(item + 1);
    setPrice(price + cart.price);
    //商品页点add时，如果item.id和cart.id匹配，彼此找到了，那么...
    const _cart = carts.find((item) => item.id === cart.id);
    //购物车页就在原有的基础上累加
    if (_cart) {
      _cart.num++;
      //如果没有找到，就推送一个新的商品到购物车页面
    } else {
      carts.push(cart);
    }
    setCarts([...carts]);
  };

  const handleRemove = (cart) => {
    //？都是要找id匹配，为什么这里用findIndex，不用find?
    const index = carts.findIndex((item) => item.id === cart.id);
    //？为什么这里要保留1？
    carts.splice(index, 1);
    //购物车的remove同步更新商品页的总计

    setItem(item - cart.num);

    setPrice(price - cart.price * cart.num);

    setCarts([...carts]);
  };

  //购物车的加减共用一个办法
  const handleNum = (cart, isAdd) => {
    //？isAdd不需要定义吗？给初始值false或者true
    const _cart = carts.find((item) => cart.id === item.id);
    //加的情况
    if (isAdd) {
      _cart.num++;
      setItem(item + 1);
      setPrice(price + _cart.price);
      //减的情况
    } else {
      //再设定一个条件：不能减为负数或0，所以必须大于1的条件下才能减少
      if (_cart.num > 1) {
        _cart.num--;
        setItem(item - 1);
        setPrice(price - _cart.price);

        //？如何让如果购物车为空，显示信息？
      }
      if (_cart.num === 0) {
        return <h5>pick something</h5>;
      }
    }
    setCarts([...carts]);
  };

  const goCart = () => {
    setPath(false);
  };

  const goHome = () => {
    setPath(true);
  };

  return (
    <div className="App">
      {/* <button onClick={() => setPath(!isHome)}>
        {isHome ? "Go to cart" : "Home"}
      </button> */}
      <div>
        {isHome ? (
          //为什么要在这里给方法定义后，才能传递给子组件？
          <Home add={handleAddCart} item={item} price={price} goCart={goCart} />
        ) : (
          <Cart
            carts={carts}
            remove={handleRemove}
            num={handleNum}
            goHome={goHome}
            add={handleAddCart}
            item={item}
            price={price}
          />
        )}
      </div>
    </div>
  );
}
