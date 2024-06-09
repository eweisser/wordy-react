import '../App.css';

const SaveButton = ({triggerSave, children}) => {

    return (
        <div id="save-button" onClick={triggerSave}>
            save
            {/* {children} */}
        </div>
    );
}

// const SaveButton = ({children}) => {

//     return (
//         <div id="save-button">
//             <a href="filett.json" download="filezz.json">save</a>
//             {/* {children} */}
//         </div>
//     );
// }

export default SaveButton;