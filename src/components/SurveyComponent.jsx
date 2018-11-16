/* eslint-disable camelcase */
import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Link } from 'react-router-dom';
import * as survey from '../actions/surey.action';
import Answer from './Answer';
import { VERIFY_SURVEY_FORM } from '../utils/survey.constant';

export class SurveyComponent extends React.Component {

  constructor(props) {
    super(props);
    this.handleChangeOptions = this.handleChangeOptions.bind(this);
    this.state = {
      choices: [],
      input: '',
      currentUpdate: null,
      ansError: null,
    };
  }

  componentWillMount() {
    const { currentOptionIndex, quetions } = this.props;
    this.currentQuestion(quetions, currentOptionIndex);
  }

  componentWillReceiveProps(nextProps) {
    const { currentOptionIndex, quetions } = nextProps;
    this.currentQuestion(quetions, currentOptionIndex);
  }

  currentQuestion(quetions, currentOptionIndex) {
    const currentQuetion = quetions[currentOptionIndex] || {};
    this.setState({
      choices: currentQuetion.choices || [],
      input: currentQuetion.input || '',
      currentUpdate: null,
      ansError: null,
    });
  }

  handleChangeOptions(e) {
    const updatedInput = e.target.value;
    const { currentOptionIndex, quetions } = this.props;
    const currentQuetion = quetions[currentOptionIndex] || {};
    const { question_type, multiple } = currentQuetion;
    const { choices } = this.state;
    const selectCondition = (multiple === 'true');
    if (question_type === 'multiple-choice' && !selectCondition) {
      const a = choices.map(v => Object.assign({}, v, { selected: v.value === updatedInput }));
      this.setState({
        currentUpdate: updatedInput,
        choices: a,
      });
      this.props.updateAnswers(currentOptionIndex, a, updatedInput);
    } else if (question_type === 'text') {
      this.setState({
        currentUpdate: updatedInput,
        input: updatedInput
      });
      this.props.updateAnswers(currentOptionIndex, [], updatedInput);
    }

  }

  validateQuetions() {
    const { currentOptionIndex, quetions } = this.props;
    const currentQuetion = quetions[currentOptionIndex] || {};

    if (currentQuetion.required) {
      this.setState({
        ansError: 'Please Aswer the Current Quetion',
      });
      return false;
    }
    return true;
  }

  goNext() {
    const { currentOptionIndex, quetions } = this.props;
    const { choices, input, currentUpdate } = this.state;
    const currentQuetion = quetions[currentOptionIndex];
    // check jump in case of answer only
    if (this.validateQuetions())
      if (currentQuetion.jumps.length > 0 && !!currentUpdate) {
        const jumpIndex = (currentQuetion.jumps || [])
          .findIndex(v => v.conditions.find(iv => iv.value === currentUpdate))
        const jumpToIdentifier = currentQuetion.jumps[jumpIndex].destination.id;
        const nextQuetionIndex = quetions.findIndex(v => v.identifier === jumpToIdentifier);
        this.props.goToNextQuetion(nextQuetionIndex, choices, input);
      } else {
        this.props.goToNextQuetion(currentOptionIndex + 1, choices, input);
      }
  }

  goPrevious() {
    const { currentOptionIndex, quetions } = this.props;
    this.props.goToPreviousQuetion(currentOptionIndex);
  }

  render() {
    const { currentOptionIndex, quetions, error, loading } = this.props;
    const { choices, input, ansError } = this.state;
    const nextIndex = currentOptionIndex + 1;
    const totalQuestions = quetions.length;;
    const currentQuetion = quetions[currentOptionIndex] || {};
    const type = currentQuetion.question_type;
    const multiple = currentQuetion.multiple === 'true';
    const multiline = currentQuetion.multiline === 'true';

    if (loading) {
      return (
        <center>
          <p>Loading...</p>
        </center>
      )
    }

    if (error) {
      return (
        <center>
          <p>We are Facing Technical Issue... please try after some time</p>
        </center>
      )
    }

    if (totalQuestions === 0) {
      return (
        <center>
          <h3 className="no-data">There are no survey Available</h3>
        </center>
      )
    }

    return (
      <div className={classnames('landing', 'survey-container')}>

        <TransitionGroup>
          <CSSTransition
            key={currentQuetion.headline}
            timeout={500}
            classNames="fade"
          >
            <Answer
              ansError={ansError}
              question={currentQuetion.headline}
              questionIndex={currentOptionIndex}
              handleChangeOptions={this.handleChangeOptions}
              type={type}
              multiple={multiple}
              multiline={multiline}
              input={input}
              choices={choices}
            />
          </CSSTransition>
        </TransitionGroup>
        <div className="survey-navigation">
          <button
            disabled={currentOptionIndex === 0}
            className={classnames('button', 'previous')}
            onClick={() => this.goPrevious()}
          >
            <span className="return">&lt; Return</span>
          </button>

          <button
            disabled={currentOptionIndex === totalQuestions - 1}
            className={classnames('button', 'next')}
            onClick={() => this.goNext()}
          >
            <span>Next &gt;</span>
          </button >
          <div className="blank-space-10" />
          <span className={classnames('button', 'hide', { show: nextIndex === totalQuestions })}>
            <Link
              className={classnames('submit')}
              to={VERIFY_SURVEY_FORM}
            >
              Verify & submit
         </Link>
          </span >
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    quetions: (state.surveyReducer.questionnaire || {}).questions || [],
    currentOptionIndex: state.surveyReducer.currentOptionIndex,
    error: state.surveyReducer.error,
    loading: state.surveyReducer.loading,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    goToNextQuetion: (index, choices, input) => {
      dispatch(survey.goToNextQuetion(index, choices, input))
    },
    goToPreviousQuetion: (currentIndex) => { dispatch(survey.goToPreviousQuetion(currentIndex)) },
    updateAnswers: (index, choices, input) => { dispatch(survey.updateAnswers(index, choices, input)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyComponent);