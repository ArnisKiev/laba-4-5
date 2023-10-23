
import './App.scss';
import { AddPanel } from './components/add-panel/add-panel';
import { ITodoItem } from './interfaces/todo-item';
import { TodoItem } from './components/to-item/todo-item';
import { useState } from 'react';

function App() {

  const testArray: ITodoItem[] =  (JSON.parse(localStorage.getItem('todo-list') ?? '') as ITodoItem[]) || [];

  const onAllItemsClick = function() {
    setFilteredList([...itemList]);
    setItemList([...itemList])
    
    alert('onALLClick')
    console.log(filteredList)
  }

  const onCompletedItemsClick = function() {
    const updatedFilteredList = (JSON.parse(JSON.stringify(itemList)) as ITodoItem[]).filter(x => x.isDone)
    setFilteredList(updatedFilteredList);
    
    alert('onCompletedClick')
    setItemList([...itemList])
    console.log(updatedFilteredList)
  };

  const onUnCompletedItemsClick = function() {
    const updatedFilteredList = (JSON.parse(JSON.stringify(itemList)) as ITodoItem[]).filter(x => !x.isDone)
    setFilteredList(updatedFilteredList)
    
    alert('onUNCompletedClick')
    setItemList([...itemList])
    console.log(updatedFilteredList)
  };

  var lastFilter: () => void = onAllItemsClick;


  //  [
  //   {
  //     id: 1,
  //     isDone: false,
  //     title: 'Test -1'
  //   },
  //   {
  //     id: 2,
  //     isDone: true,
  //     title: 'Test -2'
  //   },
  //   {
  //     id: 3,
  //     isDone: false,
  //     title: 'Test -4'
  //   },
  //   {
  //     id: 4,
  //     isDone: true,
  //     title: 'Test -5'
  //   }
  // ];

  const [itemList, setItemList] = useState(testArray);
  const [filteredList, setFilteredList] = useState([...itemList]);



  const saveInLocalStorage = () => {
    localStorage.setItem('todo-list', JSON.stringify(itemList));
  }

  const onSave = function(item: ITodoItem) {

    const index = itemList.findIndex(x => x.id === item.id);

    if (index !== -1) {
      itemList[index] = item;
      setItemList([...itemList]);
      saveInLocalStorage();
    }
    lastFilter();

  }

  const onDelete = (item: ITodoItem) => {
    setItemList(itemList.filter(x => x.id !== item.id));
    console.log([...itemList])
    saveInLocalStorage();
    lastFilter();
  } 

  const onAddItem = (item: ITodoItem) => {

    item.id = getId();

    console.log(item)
    itemList.push(item);

    setItemList([...itemList]);
    lastFilter();


    function getId(id: number = 1): number {
    
      if (itemList.some(x => x.id === id)) {
        return getId(id + 1);
      }

      return id;
    }

  };

  

  return (
    <div className='content-container'>
      <AddPanel data = {{onAddClick: onAddItem}}/>
      <div className='items-container' >
      <div className='statistic-panel'>
        <span onClick={() => {
          onAllItemsClick();
          alert('onAllCkick')
          lastFilter = onAllItemsClick;
        }}>All({itemList.length})</span>
        <span onClick={() => {
          alert('onCompletedClick')
          onCompletedItemsClick();
          lastFilter = onCompletedItemsClick;
          }}>Completed({itemList.filter(x=>x.isDone).length})</span>
        <span onClick={() => { 
          alert('onUncompletedClick')
         onUnCompletedItemsClick();
         lastFilter = onUnCompletedItemsClick
          }}>Uncompleted({itemList.filter(x => !x.isDone).length})</span>
      </div>

      { filteredList.map(elem => <TodoItem data={ {item: elem, onDelete, onSave } } key = {elem.id}/>) }  
      </div>
        
    </div>
  
  );
}

export default App;
