import { IProps } from "../../interfaces/props";
import { ITodoItem, ITodoItemDataComponent } from "../../interfaces/todo-item";
import "./todo-item.scss"

import binLogo from "../../icons/bin.svg"
import penLogo from "../../icons/pen.svg"
import checkLogo from "../../icons/check.svg"
import clLogo from "../../icons/cancel.svg" 

import { useState } from "react";

export function TodoItem(props: IProps<ITodoItemDataComponent>) {
    const { data } = { ...props }; 
    const [item, setItem] = useState(data.item);
    const [isEdit, setEdit] = useState(false);

    const onChangeTitle = (event: any) => {
        const title = event.target.value;
        setItem({...item, title});
    }

    const onStatusChange = (event: any) => {
        const updatedItem = {
            ...item,
            isDone: event.target.checked
        };

        console.log(updatedItem)
       setItem(updatedItem);
       data.onSave(updatedItem);
    }

    const onSaveClick = () => {
        console.log(data)
        data.onSave(item);
        setEdit(false);
        
    }

    return <div className="todo-item">
        <input type="checkbox" checked={item.isDone} onChange={(onStatusChange) } />
        <input value={item.title} onChange={onChangeTitle} disabled={!isEdit} className="todo-item__input"/>
        <div className="todo-item__buttons-container">
            { isEdit? 
            <>
            <button>
              <img className='button-img' src={checkLogo} onClick={onSaveClick} />
            </button>
            <button>
                <img  className='button-img' src={clLogo} onClick={() => setEdit(false)} />
            </button>
            </> :
            <>
             <button>
                <img className='button-img' src={penLogo} onClick={() => setEdit(true)}/>
            </button>
            <button onClick={() => data.onDelete(item) }>
                <img className='button-img' src={binLogo} />
            </button>
            </> 
            }
        </div>
    </div>
}


