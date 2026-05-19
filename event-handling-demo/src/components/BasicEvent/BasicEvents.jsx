import React from "react"

function BasicEvents() {

    const handleClick = () => {
        alert('Button was clicked!');
    };

    const mouseEnter = () => {
        console.log('Mouse Entered!');
    }

    const mouseLeave = () => {
        console.log('Mouse left the button');
    }

    const handleInputChange = (event) => {
        console.log('Input value: ', event.target.value);

    }

    return (
        <div className="dasic-event-container">
            <h2>Multiple Event handles</h2>
            <button
                onClick={handleClick}
                onMouseEnter={mouseEnter}
                onMouseLeave={mouseLeave}

            >Click Me!</button>

            <br />

            <input type="text" 
                onChange={handleInputChange}
                placeholder="Type something and watch console...."
            />
        </div>
    )
}

export default BasicEvents;