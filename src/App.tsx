import { useState, useEffect } from "react";

const App = () => {
  const [textData, setTextData] = useState<string>("");
  const [searchData, setSearchData] = useState<string>("");
  const [items, setItems] = useState<string[]>([]);
  const [inputTimeout, setInputTimeout] = useState<NodeJS.Timeout | null>(null);

  // handle new item
  const addNewItemhandler = () => {
    if (textData.trim() !== "") {
      setItems((prevState) => [...prevState, textData.trim()]);
      setTextData(""); // Clear input
    } else {
      console.warn("Please enter some text to add an item.");
    }
  };

  // handle input changes and start timeout
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextData(e.target.value);

    if (inputTimeout) clearTimeout(inputTimeout);

    const timeout = setTimeout(() => {
      console.log("User was inactive for 3 seconds after typing.");
      //  after 3 seconds of inactivity can be added here
    }, 3000);

    setInputTimeout(timeout);
  };

  // Clear the timeout when the component unmounts
  useEffect(() => {
    return () => {
      if (inputTimeout) {
        clearTimeout(inputTimeout);
      }
    };
  }, [inputTimeout]);

  // filtered items with search
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchData.toLowerCase())
  );

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Enter text..."
          value={textData}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Search items..."
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
        />
        <button type="button" onClick={addNewItemhandler}>
          Add item
        </button>
      </form>

      {/* Show items in the list */}
      {filteredItems.length > 0 ? (
        <ul>
          {filteredItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>ایتمی وجود ندارد.</p>
      )}
    </div>
  );
};

export default App;
