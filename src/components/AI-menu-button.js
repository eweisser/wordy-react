import '../App.css';

const AIMenuButton = ({AiName, pickAi}) => {

    return (
        // <div className="ai-menu-button" onPress={() => pickAi({AiName})}>{AiName}</div>
        <div className="ai-menu-button" onClick={() => pickAi()}>{AiName}</div>
    );
}

export default AIMenuButton;