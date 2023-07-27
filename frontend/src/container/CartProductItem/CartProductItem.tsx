import { useDebounce } from "@/hooks/useDebouce";
import { FC, useEffect, useRef, useState } from "react";
import { Product } from "shared";
import "./CartProductItem.scss";

type CartProductItemProps = {
  product: Product;

  initialQuantity: number;

  onQuantityChange?: (value: number) => void;

  onDebouncedQuantityChange?: (value: number) => void;

  onCancel?: () => void;
};

const CartProductItem: FC<CartProductItemProps> = (props) => {
  const [quantity, setQuantity] = useState(props.initialQuantity);
  const debouncedValue = useDebounce(quantity, 500);
  const onDebouncedQuantityChangeRef = useRef(props.onDebouncedQuantityChange);

  const { product } = props;

  const onQuantityChange = (value: number) => {
    setQuantity(value);
    props.onQuantityChange?.(value);
  };

  useEffect(() => {
    onDebouncedQuantityChangeRef.current?.(debouncedValue);
  }, [debouncedValue]);

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
            style={{ width: 50, background: "#eee" }}
            type="number"
            className="input"
            name="quantity"
            min={1}
            value={quantity}
            onChange={(e) => onQuantityChange(parseInt(e.target.value))}
          />
        </div>
        <div>
          <button onClick={props.onCancel}>❌</button>
        </div>
      </div>
    </div>
  );
};

export default CartProductItem;
