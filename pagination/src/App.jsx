import { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(0);

  const fetchProdcuts = async () => {
    const res = await fetch(
      `https://dummyjson.com/products/?limit=10&skip=${page * 10 - 10}`
    );
    const data = await res.json();
    // console.log(data);
    if (data && data.products) {
      setProducts(data.products);
      setTotalPages(data.total / 10);
    }
  };

  useEffect(() => {
    fetchProdcuts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const selectedPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };

  return (
    <div>
      {totalPages > 0 && (
        <div className="products">
          {products.map((prod) => {
            return (
              <span key={prod.id} className="products__single">
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {totalPages > 0 && (
        <div className="pagination">
          <span
            onClick={() => selectedPageHandler(page - 1)}
            className={page > 1 ? "" : "pagination__disabled"}
          >
            ◀
          </span>
          {[...Array(totalPages)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => selectedPageHandler(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            onClick={() => selectedPageHandler(page + 1)}
            className={page < totalPages ? "" : "pagination__disabled"}
          >
            ▶
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
