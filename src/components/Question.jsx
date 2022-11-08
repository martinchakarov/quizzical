import Answer from "./Answer"

export default function Question(props) {

    const answerComponents = props.answers.map(x => {
        return <Answer
                    className="answer"
                    isCorrect={x.isCorrect}
                    answer={x.answer}
                    selected={x.selected}
                    id={x.id}
                    key={x.id}
                    />
    });

    return (
    <div className="question">
        <h3 className="question-text">{props.question}</h3>
        <div className="answers">
            {answerComponents}
        </div>
        <hr/>
    </div>
    )
}