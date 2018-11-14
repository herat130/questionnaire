import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import * as routes from '../utils/survey.constant';
import * as actions from '../actions/surey.action';

class VerifySurveyComponent extends React.Component {

  clearStore() {
    this.props.clearStore();
  }
  renderQuestionAnswer() {
    const { survey } = this.props;
    const { questions } = survey;

    return (questions || []).filter(v => !!v.input).map(v =>
      <div key={v.identifier} className={classnames('qtn-ans')}>
        <span className={classnames('questions')}>{v.headline}</span><br />
        <span className={classnames('answer')}>&gt; {v.input}</span>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className={classnames("landing", "verify-container")}>
          <h3>Survey Details</h3>
          {this.renderQuestionAnswer()}
        </div>
        <div className="column-12">
          <div className="column-4" />
          <Link
            to={routes.HOME_PAGE}
            className={classnames('button', 'column-4')}
            // onClick={this.clearStore()}
          >
            Submit
      </Link>
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    survey: state.surveyReducer.questionnaire,
  };
}

function mapStateToDispatch(dispatch) {
  return {
    clearStore: () => { dispatch(actions.clearStore()) }
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(VerifySurveyComponent);