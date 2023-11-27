import React, { useState } from "react";

const List = ({ catList, filterItems }) => {
  const [active, setActive] = useState(0);

  return (
    <div className="portfolio__list">
      {catList?.map((category, i) => {
        return (
          <button
            onClick={() => {
              setActive(i);
              filterItems(category);
            }}
            key={i}
            className={`${
              active === i ? "active-work-cat" : ""
            } portfolio__list-item text-cs`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default List;
