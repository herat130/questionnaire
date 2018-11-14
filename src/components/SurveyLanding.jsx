import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { surveyFetchStart, surveyFetch } from '../actions/surey.action';
import * as route from '../utils/survey.constant';

class SurveyLanding extends Component {

  componentDidMount() {
    // this.props.fetchSurvey();
  }

  render() {

    const { error, loading, questionnaire } = this.props;

    if (loading) {
      return (
        <p>loading</p>
      );
    }

    if (error) {
      return (
        <p>Error</p>
      )
    }
    return (

      <div className="landing">
        <center>
          <h1 className="survey-title">{questionnaire.name}</h1>
          <p>{questionnaire.description}</p>
          <Link
            id="start-survey"
            className={classnames('btn','survey-button')}
            to={route.START_SURVEY_FORM}>
            <span>Start Survey</span>
          </Link>
        </center>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    loading: state.surveyReducer.loading,
    error: state.surveyReducer.error,
    questionnaire: state.surveyReducer.questionnaire,
  }
}

function mapStateToDispatch(dispatch) {
  return {
    fetchSurvey: () => {
      dispatch(surveyFetchStart());
      surveyFetch().then(action => dispatch(action))
    }
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(SurveyLanding);