import { ITodoItem } from "./todo-item";

export interface IAddPanelProperties {
    onAddClick: (item: ITodoItem) => void;
}