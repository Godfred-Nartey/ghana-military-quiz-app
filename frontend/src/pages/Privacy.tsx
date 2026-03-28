import StaticPage from './StaticPage';

function Privacy() {
  return (
    <StaticPage
      title="Privacy Policy"
      description="A short overview of the kind of information this platform uses to deliver the quiz experience."
      sections={[
        {
          heading: 'Information We Use',
          body: [
            'We use the account details and quiz activity needed to authenticate users, save results, and personalize the learning experience.',
          ],
        },
        {
          heading: 'How Data Supports the Platform',
          body: [
            'Stored quiz attempts, scores, and profile information help the application display statistics, achievements, and account-specific progress over time.',
          ],
        },
        {
          heading: 'Your Control',
          body: [
            'Users should be able to review their profile information and use the platform knowing that collected data is intended to support learning, performance tracking, and account access.',
          ],
        },
      ]}
    />
  );
}

export default Privacy;
