import StaticPage from './StaticPage';

function About() {
  return (
    <StaticPage
      title="About Ghana Military Quiz"
      description="A simple learning platform built to help students and quiz enthusiasts explore Ghana's military history, structure, and achievements."
      sections={[
        {
          heading: 'What We Do',
          body: [
            "Ghana Military Quiz combines learning and competition in one place. Users can answer themed questions, follow their progress, and strengthen their understanding of national military knowledge through repeated practice.",
          ],
        },
        {
          heading: 'Why It Matters',
          body: [
            "The platform encourages curiosity about Ghana's armed forces while making revision more interactive. Instead of reading facts in isolation, users test themselves and learn in a more engaging format.",
          ],
        },
        {
          heading: 'Our Goal',
          body: [
            'Our goal is to make educational content accessible, memorable, and motivating for every learner who wants to improve their knowledge step by step.',
          ],
        },
      ]}
    />
  );
}

export default About;
