import React from 'react';
import cn from 'classnames';
import{
    MdCheckBoxOutlineBlank,
    MdCheckBox,
    MdRemoveCircleOutline
} from 'react-icons/md';
import './TodoListItem.scss';

const TodoListItem= ({todo, onRemove, onToggle})=>{
    const {id,context, checked} = todo;

    return (
        <div className="TodoListItem">
            <div className={cn('checkbox', {checked})} onClick={()=> onToggle(id)}>
                {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                <div className="text">{context}</div>
            </div>
            <div className="remove" onClick={()=> onRemove(id)}>
                <MdRemoveCircleOutline />
            </div>
        </div>
    );
};

export default TodoListItem;