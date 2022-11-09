export default function Answer(props) {
    const styles = getButtonStyles();

    function getButtonStyles() {
        if (props.isChecked) {
            if (!props.isCorrect && props.selected) {
                return {
                    opacity: 0.5,
                    backgroundColor: '#F8BCBC'
                }
            } else if (props.isCorrect && props.selected) {
                return {
                    backgroundColor: '#94D7A2'
                }            
            }
        } else {
            if (props.selected) {
                return {
                    backgroundColor: '#D6DBF5'
                }  
            } else {
                return {
                    backgroundColor: '#F5F7FB'
                }  
            }
        }
    }


    if (props.isChecked) {
        return (
            <button 
                style={styles} 
                className="answer" 
                onClick={(e) => props.selectAnswer(e, props.questionId, props.id)}
                disabled
            >
                {props.answer}
            </button>
        )
    } else {
        return (
            <button 
                style={styles} 
                className="answer" 
                onClick={(e) => props.selectAnswer(e, props.questionId, props.id)}
            >
                {props.answer}
            </button>
        )
    }
    
}