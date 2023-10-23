export interface ITodoItemDataComponent {
    item: ITodoItem;
    onDelete: (item: ITodoItem) => void;
    onSave: (item: ITodoItem) => void;
}

export interface ITodoItem {
    id?: number;
    title: string;
    isDone: boolean;
}