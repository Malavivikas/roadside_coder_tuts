import { useState } from "react";
import Cell from "./components/Cell";

function App() {
  const [order, setOrder] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];
  const activatedCells = (i) => {
    const newOrder = [...order, i];
    setOrder(newOrder);
    //console.log(newOrder);
    //deactivate
    if (newOrder.length === config.flat(1).filter(Boolean).length) {
      deactivateCells();
    }
  };
  const deactivateCells = () => {
    setIsDeactivating(true);
    const timer = setInterval(() => {
      setOrder((originalOrder) => {
        const newOrder = originalOrder.slice();
        newOrder.pop();
        if (newOrder.length === 0) {
          clearInterval(timer);
          setIsDeactivating(false);
        }
        return newOrder;
      });
    }, 300);
  };
  return (
    <div className="wrapper">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${config[0].length}, 1fr)`,
        }}
      >
        {config.flat(1).map((val, index) => {
          return val ? (
            <Cell
              key={`cell-${index}`}
              filled={order.includes(index)}
              onClick={() => activatedCells(index)}
              isDisabled={order.includes(index) || isDeactivating}
            />
          ) : (
            <span key={index} />
          );
        })}
      </div>
    </div>
  );
}

export default App;
