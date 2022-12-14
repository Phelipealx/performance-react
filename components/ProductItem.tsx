import dynamic from "next/dynamic";
import { memo, useState } from "react";
import lodash from "lodash";

import { AddProductToWishListProps } from "./AddProductToWishList";

// import { AddProductToWishList } from "./AddProductToWishList";
const AddProductToWishList = dynamic<AddProductToWishListProps>(
  async () => {
    const mod = await import("./AddProductToWishList");
    return mod.AddProductToWishList;
  },
  { loading: () => <span>Carregando...</span> }
);

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
    priceFormatted: string;
  };
  onAddToWishList: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  const [isAddingToWishList, setIsAddingToWishList] = useState(false);
  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>
        Add to wishlist
      </button>
      {isAddingToWishList && (
        <AddProductToWishList
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return lodash.isEqual(prevProps.product, nextProps.product);
  }
);
