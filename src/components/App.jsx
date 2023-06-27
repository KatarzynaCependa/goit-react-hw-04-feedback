import { Section } from 'components/Section/Section';
import { Statistics } from 'components/Statistics/Statistics';
import { FeedbackOptions } from 'components/FeedbackOptions/FeedbackOptions';
import { Notification } from 'components/Notification/Notification';
import React, { useState } from 'react';

const INITIAL_STATE = {
  good: 0,
  neutral: 0,
  bad: 0,
};

export const App = () => {
  const [counterData, setCounterData] = useState(INITIAL_STATE);

  const countTotal = () => {
    let totalFeedbackArr = Object.values(counterData);
    return totalFeedbackArr.reduce((a, b) => a + b, 0);
  };

  const countPercentage = () => {
    return Math.round((counterData.good / countTotal()) * 100);
  };

  const changeState = name => {
    setCounterData(prevState => ({
      ...prevState,
      [name]: prevState[name] + 1,
    }));
  };

  return (
    <Section title="Please leave feedback">
      <FeedbackOptions
        options={Object.keys(counterData)}
        onLeaveFeedback={changeState}
      />
      {countTotal() ? (
        <Statistics
          good={counterData.good}
          neutral={counterData.neutral}
          bad={counterData.bad}
          total={countTotal()}
          positivePercentage={countPercentage()}
        />
      ) : (
        <Notification message="There is no feedback" />
      )}
    </Section>
  );
};
