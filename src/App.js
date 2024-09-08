import './App.css';
import { useState } from 'react';

function App() {
  var sampleData = [
    {
      id: 1,
      name: 'butterChicken',
      value: 'butterChicken',
      kgs: 50,
      ingrediants:
        [
          {
            name: 'maida',
            stdQty: 17,
            percentage: 34,
          },
          {
            name: 'dalda',
            stdQty: 4.2,
            percentage: 8.4,
          },
          {
            name: 'springOnion',
            stdQty: 1.92,
            percentage: 3.84,
          },
          {
            name: 'salt',
            stdQty: 0.23,
            percentage: 0.46,
          },
          {
            name: 'corriandor',
            stdQty: 0.4,
            percentage: 0.8,
          },
          {
            name: 'ginger',
            stdQty: 1,
            percentage: 2,
          },
          {
            name: 'soya',
            stdQty: 1,
            percentage: 2,
          },
          {
            name: 'chicken',
            stdQty: 12,
            percentage: 24,
          },
          {
            name: 'onion',
            stdQty: 12,
            percentage: 24,
          },
          {
            name: 'tastingSalt',
            stdQty: 0.25,
            percentage: 0.5,
          },
        ]
    },
    {
      id: 1,
      name: 'buttermutton',
      value: 'buttermutton',
      kgs: 50,
      ingrediants:
        [
          {
            name: 'wheat',
            stdQty: 17,
            percentage: 34,
          },
          {
            name: 'dalda',
            stdQty: 4.2,
            percentage: 8.4,
          },
          {
            name: 'springO',
            stdQty: 1.92,
            percentage: 3.84,
          },
          {
            name: 'salt',
            stdQty: 0.23,
            percentage: 0.46,
          },
          {
            name: 'corriandor',
            stdQty: 0.4,
            percentage: 0.8,
          },
          {
            name: 'ginger',
            stdQty: 1,
            percentage: 2,
          },
          {
            name: 'soya',
            stdQty: 1,
            percentage: 2,
          },
          {
            name: 'mutton',
            stdQty: 12,
            percentage: 24,
          },
          {
            name: 'onion',
            stdQty: 12,
            percentage: 24,
          },
          {
            name: 'tastingSalt',
            stdQty: 0.25,
            percentage: 0.5,
          },
        ]
    }];
  const [selectedDish, setSelectedDish] = useState();
  const [selectedDishObj, setSelectedDishObj] = useState();
  const [quantity, setQuantity] = useState(null);
  const [value, setValue] = useState(0)
  const [events, setEvents] = useState(null)

  const calculateItemsValues = (dishname, changedIngrediant, changedQty) => {
    var dishItemObj = sampleData.find(item => item.name == dishname);
    var ingrediantObj = dishItemObj.ingrediants.find(eachIngrediant =>
      eachIngrediant.name == changedIngrediant);
    var prevItemQty = ingrediantObj.stdQty;
    var newTotalQty = (((changedQty) / (ingrediantObj.percentage)) * 100).toFixed(2);
    setQuantity(newTotalQty)
    const newIngredients = selectedDishObj?.ingrediants?.map(itm => { return { ...itm, stdQty: (((newTotalQty * itm.percentage) / 100).toFixed(2)) } });
    setSelectedDishObj(prevData => ({ ...prevData, ingrediants: newIngredients }));

  }

  console.log(selectedDishObj, 'kill')

  const handleChange = (event) => {
    var dishItemObj = sampleData?.find(item => item.name == event.target.value);
    setSelectedDish(event.target.value);
    setSelectedDishObj(dishItemObj);
    setQuantity(dishItemObj.kgs)
  };

  const onQtyChange = (event, item) => {
    const updatedIngredients = selectedDishObj?.ingrediants?.map(eve =>
      eve.name === item.name ? { ...item, stdQty: (event.target.value) } : eve
    );
    setSelectedDishObj(prevData => ({
      ...prevData,
      ingrediants: updatedIngredients
    }));
    console.log(event.target.value, 'cool')
    setValue(event.target.value)
    setEvents(item.name)

  }
  function finalSubmit() {
    calculateItemsValues(selectedDish, events, value);
  }
  console.log(quantity, 'jj')


  return (

    <div  >
      <label htmlFor="exampleSelect">Choose a dish : </label>
      <select
        id="dropdown"
        value={selectedDish}
        onChange={handleChange}
      >
        
        <option >Select</option> {/* Default option */}
        {sampleData.map(item => (
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))} 
      </select>
      {selectedDishObj &&
      <>
      <div>
        Quantity : {quantity} Kg
      </div>
      <table id="itemsTable">
        <thead >
          <tr>
            <th>{"itemname"}</th>
            <th>{"item Qty"}</th>
            <th>{"item Percentage"}</th>
          </tr>
        </thead>
        <tbody >
          {selectedDishObj?.ingrediants?.map((item, index) =>
          (<tr key={index}>
            <td> {item.name}</td>
            <td><input type="text"
              value={item.stdQty}
              onChange={(e) => { onQtyChange(e, item) }} /></td>
            <td> {item.percentage}</td>
          </tr>
          ))
          }
        </tbody>
      </table>
      <button onClick={finalSubmit}>SUBMIT</button>
      </>}
    </div>
  )

}

export default App;
