import React from 'react';
import { connect } from '../data/connect';
import { Redirect } from 'react-router';

interface StateProps {
  hasSeenTutorial: boolean;
}

const HomeOrTutorial: React.FC<StateProps> = ({ hasSeenTutorial }) => {
  return hasSeenTutorial ? <Redirect to="/tabs/live" /> : <Redirect to="/tabs/live" />
};

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    hasSeenTutorial: true
  }),
  component: HomeOrTutorial
});
