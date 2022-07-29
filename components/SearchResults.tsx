import { List, ListRowRenderer } from "react-virtualized";

import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    title: string;
    priceFormatted: string;
  }>;
  onAddToWishList: (id: number) => void;
  totalPrice: number;
}

export function SearchResults({
  results,
  onAddToWishList,
  totalPrice,
}: SearchResultsProps) {
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results[index]}
          onAddToWishList={onAddToWishList}
        />
      </div>
    );
  };
  return (
    <div>
      <h2>{totalPrice}</h2>

      <List
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />
    </div>
  );
}

/**
 * Comportamento padrão React
 * 1. Criar uma nova versão do componente
 * 2. Comparar com a versão anterior
 * 3. Se houver alterações, vai atualizar o que alterou
 */

/**React.memo // https://pt-br.reactjs.org/docs/react-api.html#reactmemo
 * 1. Pure Functional Components
 * 2. Render too often
 * 3. Re-renders with same props
 * 4. Use in medium to big size applications
 */

/**
 * useMemo / useCallback
 *
 * 1. Cálculos pesados
 * 2. Igualdade referencial (não cria um novo espaço na memoria, verifica oque já tem e altera)
 */
