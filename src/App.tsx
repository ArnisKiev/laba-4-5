
import './App.scss';
import { AddPanel } from './components/add-panel/add-panel';
import { ITodoItem } from './interfaces/todo-item';
import { TodoItem } from './components/to-item/todo-item';
import { useState } from 'react';

function App() {

  const testArray: ITodoItem[] =  (JSON.parse(localStorage.getItem('todo-list') ?? '') as ITodoItem[]) || [];
  const [filterType, setFilterType] = useState(FilterType.All);

  const [itemList, setItemList] = useState(testArray);
  const filteredList = filterFunction(itemList, filterType);


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

  }

  const onDelete = (item: ITodoItem) => {
    const updatedList = itemList.filter(x => x.id !== item.id);
    console.log('-----')
    console.log(updatedList)
    setItemList([...updatedList]);
    saveInLocalStorage();
  } 

  const onAddItem = (item: ITodoItem) => {

    item.id = getId();

    console.log(item)
    itemList.push(item);

    setItemList([...itemList]);
   

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
         setFilterType(FilterType.All);
        }}>All({itemList.length})</span>
        <span onClick={() => {
         setFilterType(FilterType.Completed);
          }}>Completed({itemList.filter(x=>x.isDone).length})</span>
        <span onClick={() => { 
          setFilterType(FilterType.UnCompleted);
          }}>Uncompleted({itemList.filter(x => !x.isDone).length})</span>
      </div>

      { filteredList.map(elem => <TodoItem data={ {item: elem, onDelete, onSave } } key = {elem.id}/>) }  
      </div>
        
    </div>
  
  );
}

export default App;

export enum FilterType {
  All,
  Completed,
  UnCompleted
}

export const filterFunction = (list: ITodoItem[], filterType: FilterType = FilterType.All ): ITodoItem[] => {

  const completedList = () => {
    const updatedFilteredList = list.filter(x => x.isDone);
    return updatedFilteredList;
  };

  const uncompletedList = () => {
    const updatedFilteredList = list.filter(x => !x.isDone)
    return updatedFilteredList;
  };

  if (filterType === FilterType.Completed) return completedList();
  
  if (filterType === FilterType.UnCompleted) return uncompletedList();


  return list;
}
