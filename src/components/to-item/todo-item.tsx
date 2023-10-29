import { IProps } from "../../interfaces/props";
import { ITodoItem, ITodoItemDataComponent } from "../../interfaces/todo-item";
import "./todo-item.scss"

import binLogo from "../../icons/bin.svg"
import penLogo from "../../icons/pen.svg"
import checkLogo from "../../icons/check.svg"
import clLogo from "../../icons/cancel.svg" 

import { useRef, useState } from "react";

export function TodoItem(props: IProps<ITodoItemDataComponent>) {
    const { data } = { ...props }; 
    const [item, setItem] = useState(data.item);
    const [isEdit, setEdit] = useState(false);
    const [currentTitle, setTitle] = useState(item.title);
    const inputRef: any = useRef(null);

    const onTitleChange = (e: any) => {
        setTitle(e.target.value);
    }

    const onEditClick = () => {
     

        setTimeout(() =>  inputRef.current.focus());

        setEdit(true);
    }


    const onStatusChange = (event: any) => {
        const updatedItem = {
            ...item,
            isDone: event.target.checked
        };

       setItem(updatedItem);
       data.onSave(updatedItem);
    }

    const onSaveClick = () => {
        const updatedItem = {...item, title: currentTitle};
        setItem(updatedItem);
        data.onSave(updatedItem);
        setEdit(false);
    }

    const onCancelClick = () => {
        setTitle(item.title);
        setEdit(false);
    }


    return <div className="todo-item">
        <input type="checkbox" checked={item.isDone} onChange={(onStatusChange) } />
        <input value={currentTitle} onChange={onTitleChange} disabled={!isEdit} ref={inputRef} id='input' name="input" className="todo-item__input"/>
        <div className="todo-item__buttons-container">
            { isEdit? 
            <>
            <button>
              <img className='button-img' src={checkLogo} onClick={onSaveClick} />
            </button>
            <button>
                <img  className='button-img' src={clLogo} onClick={onCancelClick} />
            </button>
            </> :
            <>
             <button>
                <img className='button-img' src={penLogo} onClick={onEditClick}/>
            </button>
            <button onClick={() => data.onDelete(item) }>
                <img className='button-img' src={binLogo} />
            </button>
            </> 
            }
        </div>
    </div>
}


