import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
      <center>
        <div>
          <h1>{questionnaire.name}</h1>
          <p>{questionnaire.description}</p>
          <Link
            id="start-survey"
            className='btn'
            to={route.START_SURVEY_FORM}>
            Start Survey
          </Link>
        </div>
      </center>
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