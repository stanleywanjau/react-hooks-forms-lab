import React, { useState,useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText,setSearchText] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
    // State to manage the list of items
    const [allItems, setAllItems] = useState(items);
    useEffect(() => {
      filterItems();
    }, [selectedCategory, searchText, allItems]);
  
  
  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }
  
  function searchItem(query){
    
    
    setSearchText(query);
  }
    // Function to add a new item to the list
    function handleItemFormSubmit(newItem) {
      setAllItems((prevItems) => [...prevItems, newItem]);
    }
  function filterItems() {
    const filtered = items.filter((item) => {
      const byCategory = selectedCategory === "All" || item.category === selectedCategory;
      const bySearchText = item.name.toLowerCase().includes(searchText.toLowerCase());

      return byCategory && bySearchText;
    });

    setFilteredItems(filtered);
  }

  return (
    <div className="ShoppingList">
       <ItemForm onItemFormSubmit={handleItemFormSubmit} />
      <Filter search={searchText} onCategoryChange={handleCategoryChange} onSearchChange={searchItem}/>
      <ul className="Items">
        {filteredItems.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
