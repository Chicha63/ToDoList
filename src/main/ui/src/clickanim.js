import { useState } from "react"

export const animate = () =>{
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = (toDo) => {
        setIsClicked(true);
        setTimeout(() => {
        setIsClicked(false);
        }, 300);
        toDo();
    };
    
    return {isClicked, handleClick}
}