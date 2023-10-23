import { useState } from "react";
import { IAddPanelProperties } from "../../interfaces/add-panel-properties";
import { IProps } from "../../interfaces/props";
import { ITodoItem } from "../../interfaces/todo-item";
import "./add-panel.scss"

import addLogo  from "../../icons/plus.svg";

export function AddPanel(props: IProps<IAddPanelProperties>) {
    const { data } = {...props} 

    const [ state, setState ] = useState({
        title: '',
        isDone: false
    });

    const onTitleChange = (event: any) => {
        state.title = event.target.value;
        console.log(state)
        setState({...state}); 
    }

    const onAddClick = () => {
        console.log(state)
        data.onAddClick(state as ITodoItem);
        setState({
            isDone: false,
            title: ''
        });
        
    }

    return (
        <div className="add-panel">
            <input className="add-panel__checkbox--xl" type="checkbox" disabled />
            <input className="add-panel__input" placeholder="Add task..." value={state.title} onChange={onTitleChange} />
            <button onClick={onAddClick}>
                <img src={addLogo} className="button-img" />
            </button>
        </div>
    );
}