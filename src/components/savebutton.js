import '../App.css';

const SaveButton = ({triggerSave}) => {

    return (
        <div id="save-button" onClick={triggerSave}>
            save
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