import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import * as milligram from 'milligram';
import SurveyLanding from './SurveyLanding';
import SurveyComponent from './SurveyComponent';
import * as route from '../utils/survey.constant';

class App extends React.Component {
  componentDidMount() {

  }
  render() {
    return (
      <Switch>
        <Route exact path="/" component={SurveyLanding} />
        <Route path={route.START_SURVEY_FORM} component={SurveyComponent} />
        <Route path="*" component={SurveyLanding} />
      </Switch>
    )
  }
}

export default withRouter(App);