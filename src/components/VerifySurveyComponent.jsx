import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import * as routes from '../utils/survey.constant';

class VerifySurveyComponent extends React.Component {

  renderQuestionAnswer() {
    const { survey } = this.props;
    const { questions } = survey;

    return (questions || []).filter(v => !!v.input).map(v => {
      return (
        <div key={v.identifier} className={classnames('qtn-ans')}>
          <span className={classnames('questions')}>{v.headline}</span><br />
          <span className={classnames('answer')}>&gt; {v.input}</span>
        </div>
      );
    })
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

export default connect(mapStateToProps, null)(VerifySurveyComponent);