/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import { Product } from "shared";
import "./ShoppingItem.scss";

interface ShoppingItemProps {
  product: Product;

  onBuy?: () => void;

  isAdded?: boolean;
}

export const ShoppingItem: FC<ShoppingItemProps> = (props) => {
  const { product, isAdded } = props;

  return (
    <div className="shopping-card">
      <figure style={{ height: "10rem" }}>
        <img src={product.thumbnail} alt="Shoes" />
      </figure>
      <div className="shopping-card-body">
        <h2 className="shopping-card-title">{product.title}</h2>
        <p>{product.description}</p>
        <div className="shopping-card-actions justify-between">
          <button
            className="btn btn-primary"
            onClick={props.onBuy}
            disabled={isAdded}
          >
            {!isAdded ? "Buy" : "Added To Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};
