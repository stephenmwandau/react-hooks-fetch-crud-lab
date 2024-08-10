
import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateCorrectAnswer }) {
  if (!question) {
    return null; // Return null if question is null or undefined
  }

  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleDelete = () => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        onDeleteQuestion(id);
      } else {
        console.error('Failed to delete question:', response.status);
      }
    })
    .catch(error => console.error('Error deleting question:', error));
  };

  const handleCorrectAnswerChange = (event) => {
    const newCorrectIndex = parseInt(event.target.value);
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        correctIndex: newCorrectIndex
      })
    })
    .then(response => {
      if (response.ok) {
        onUpdateCorrectAnswer(id, newCorrectIndex);
      } else {
        console.error('Failed to update correct answer:', response.status);
      }
    })
    .catch(error => console.error('Error updating correct answer:', error));
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleCorrectAnswerChange}>
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
