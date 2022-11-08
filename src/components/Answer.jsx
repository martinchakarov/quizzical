export default function Answer(props) {
    const styles = {
        backgroundColor: props.selected ? '#D6DBF5' : '#F5F7FB'
    }

    return (
        <button style={styles} className="answer" onClick={(e) => props.selectAnswer(e, props.questionId, props.id)}>{props.answer}</button>
    )
}