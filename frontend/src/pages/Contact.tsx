import StaticPage from './StaticPage';

function Contact() {
  return (
    <StaticPage
      title="Contact Us"
      description="Reach out for support, feedback, or questions about the platform."
      sections={[
        {
          heading: 'General Support',
          body: [
            'If you need help using the quiz platform, contacting the project team or administrator is the best place to start.',
          ],
        },
        {
          heading: 'Feedback and Suggestions',
          body: [
            'Ideas for new quiz topics, corrections, and feature suggestions are valuable. Feedback can help improve both the learning content and the user experience.',
          ],
        },
        {
          heading: 'Project Communication',
          body: [
            'You can customize this page later with your real support email address, phone number, office location, or a contact form if the project needs one.',
          ],
        },
      ]}
    />
  );
}

export default Contact;
