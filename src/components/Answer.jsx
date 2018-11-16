import React from 'react';
import classnames from 'classnames';
import MultipleChoice from './MultipleChoice';
import InputAnswer from './InputAnswer';

export default class Answer extends React.Component {

  renderAnsComponent() {
    const { type, multiple, multiline, choices, input } = this.props;
    let inputType;
    if (type === 'multiple-choice' && choices.length > 0) {
      if (!multiple) {
        // render radio
      } else {
        // render checkbox
      }
      return (
        <MultipleChoice
          handleChangeOptions={this.props.handleChangeOptions}
          type={'radio'}
          choices={choices}
        />
      )
    }
    if (type === 'text' && !multiline) {
      // render textField
      inputType = 'text';
    } else {
      inputType = 'textarea';
      // render textArea
    }
    return (
      <InputAnswer
        type={inputType}
        input={input}
        handleChangeOptions={this.props.handleChangeOptions}
      />)
  }

  render() {
    const { question, questionIndex, ansError } = this.props;
    const oddIndex = questionIndex % 2 !== 0;
    const eventIndex = questionIndex % 2 === 0

    return (
      <div className={classnames("answer-container", { odd: oddIndex }, { even: eventIndex })}>
        {ansError ? <div className="error-ans">{ansError}<div className="blank-space-10" /></div> : false}
        <h3>{question} </h3>
        {this.renderAnsComponent()}
      </div>
    );
  }
}