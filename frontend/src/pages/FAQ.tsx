import StaticPage from './StaticPage';

function FAQ() {
  return (
    <StaticPage
      title="Frequently Asked Questions"
      description="Quick answers to common questions about how the quiz platform works."
      sections={[
        {
          heading: 'Do I need an account?',
          body: [
            'Yes. Creating an account gives you access to quizzes, progress tracking, achievements, and your personal dashboard.',
          ],
        },
        {
          heading: 'Can I track my performance?',
          body: [
            'Yes. Once you are signed in, the platform records quiz attempts and shows your progress through dashboard statistics and results pages.',
          ],
        },
        {
          heading: 'Who is this platform for?',
          body: [
            'It is designed for students, researchers, and anyone interested in learning more about Ghana military history and related topics in an interactive way.',
          ],
        },
      ]}
    />
  );
}

export default FAQ;
