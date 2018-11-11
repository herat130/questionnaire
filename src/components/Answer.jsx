import React from 'react';
import MultipleChoice from './MultipleChoice';
import InputAnswer from './InputAnswer';

export default class Answer extends React.Component {

  componentDidMount() {

  }

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

    return (
      <div className="answer-container">
        {this.renderAnsComponent()}
      </div>
    );
  }
}