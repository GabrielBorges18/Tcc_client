// import api from '../../services/api'
import React, { useRef, useContext } from 'react';
import Context from './context'
import { List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import { useDrag, useDrop} from 'react-dnd'
import { ItemTypes } from './Constants'

const Card = ({ title, description, index, id, list }) => {

    const ref = useRef();

    const { move } = useContext(Context);

    const [{ isDragging }, drag] = useDrag({
        item: {type: ItemTypes.Card, index, id, list},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    });

    const [{  }, drop] = useDrop({
        accept: ItemTypes.Card,
        hover(item, monitor){
            const dragged = item.index;
            const draggedId = item.id;
            const draggedList = item.list;

            // console.log(item);

            const target = index;
            const targetId = id;
            const targetList = list;

            if(dragged === target && draggedList === targetList){
                return;
            }
            
            const targetDimensions = ref.current.getBoundingClientRect();
            const targetCenter = (targetDimensions.bottom - targetDimensions.top) / 2;

            const draggedOffset = monitor.getClientOffset();
            const draggedTop = draggedOffset.y - targetDimensions.top;
            if(dragged < target && draggedTop < targetCenter){
                return;
            }
            if(dragged > target && draggedTop > targetCenter){
                return;
            }

            move(draggedList, targetList, draggedId, targetId, dragged, target);

            item.index = target;
            item.list = targetList;

        }
    });

    drag(drop(ref));

    // console.log(key);
    return (
        <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'pointer', backgroundColor: 'white', border: isDragging ? "2px dashed black" : "0px" }}  >
            <ListItem  alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar>A</Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={title}
                    secondary={description}
                />
            </ListItem>
            <Divider component="li" />
        </div>
    );

}
export default Card;