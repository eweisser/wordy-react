import '../App.css';

const SaveButton = ({children}) => {

    return (
        <div id="save-button">
            <a href="file.json">save</a>
            {/* {children} */}
        </div>
    );
}

export default SaveButton;