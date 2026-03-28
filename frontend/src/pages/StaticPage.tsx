type StaticPageProps = {
  title: string;
  description: string;
  sections: Array<{
    heading: string;
    body: string[];
  }>;
};

function StaticPage({ title, description, sections }: StaticPageProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {title}
          </h1>
          <p className="text-lg text-gray-600">{description}</p>
        </div>

        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {section.heading}
              </h2>
              <div className="space-y-3">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-gray-700 leading-7">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StaticPage;
