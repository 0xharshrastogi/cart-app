import { FC, useState } from "react";
import { Product } from "shared";
import "./CartProductItem.scss";

type CartProductItemProps = {
  product: Product;

  initialQuantity: number;

  onQuantityChange?: (value: number) => void;
};

const CartProductItem: FC<CartProductItemProps> = (props) => {
  const [quantity, setQuantity] = useState(props.initialQuantity);

  const { product } = props;

  const onQuantityChange = (value: number) => {
    setQuantity(value);
    props.onQuantityChange?.(value);
  };

  return (
    <div className="cart-product-item">
      <div className="product-info">
        <span className="title">{product.title}</span>
      </div>
      <div className="">
        <div className="price">
          <span>${product.price}</span>
        </div>
        <div className="quality">
          <span>Quantity</span>
          <input
            style={{ width: 100, background: "#eee" }}
            type="number"
            className="input"
            name="quantity"
            min={1}
            value={quantity}
            onChange={(e) => onQuantityChange(parseInt(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default CartProductItem;
