const About = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col items-center py-16 px-6 text-center">
      <section className="max-w-4xl space-y-10">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-800">
          About <span className="text-gradient">Resume AI Analyzer</span>
        </h1>

        {/* Introduction */}
        <p className="text-gray-600 text-lg leading-relaxed">
          <strong>Resume AI Analyzer</strong> helps job seekers boost their chances of getting noticed
          by recruiters and Applicant Tracking Systems (ATS). Using advanced AI, it reviews your resume
          and provides an in-depth analysis of your <strong>ATS compatibility score</strong>,
          <strong> keyword optimization</strong>, and <strong>overall readability</strong>.
        </p>

        {/* Key Features */}
        <div className="bg-white shadow-md rounded-2xl p-8 text-left space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">✨ Key Features</h2>
          <ul className="list-disc pl-6 space-y-3 text-gray-700">
            <li>
              <strong>ATS Score Check:</strong> Find out how well your resume performs against ATS filters.
            </li>
            <li>
              <strong>AI-Powered Insights:</strong> Get personalized recommendations to make your resume stand out.
            </li>
            <li>
              <strong>Keyword Optimization:</strong> Identify missing industry keywords relevant to your target job.
            </li>
            <li>
              <strong>Resume Grading:</strong> Instantly receive a detailed report with your score and improvement tips.
            </li>
            <li>
              <strong>Multiple Formats Supported:</strong> Upload PDF, DOCX, or TXT resumes for analysis.
            </li>
          </ul>
        </div>

        {/* How It Works */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl shadow-sm p-8 text-left space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">⚙️ How It Works</h2>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700">
            <li>Upload your resume in PDF, DOCX, or TXT format.</li>
            <li>Our AI engine scans your resume for structure, keywords, and formatting.</li>
            <li>Receive a detailed ATS compatibility report within seconds.</li>
            <li>Follow the improvement suggestions to optimize your resume for better results.</li>
          </ol>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white shadow-md rounded-2xl p-8 text-left space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">💡 Why Choose Resume AI Analyzer?</h2>
          <ul className="list-disc pl-6 space-y-3 text-gray-700">
            <li><strong>Accuracy You Can Trust:</strong> Built with advanced NLP and machine learning models.</li>
            <li><strong>Data Privacy First:</strong> Your uploaded resumes are never stored or shared.</li>
            <li><strong>Fast & Easy to Use:</strong> Get instant feedback without complicated steps.</li>
            <li><strong>Career Growth Focused:</strong> Designed to help you land interviews faster.</li>
          </ul>
        </div>

        {/* Our Vision */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl shadow-sm p-8 text-left space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">🌍 Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            We believe that great talent should never go unnoticed due to formatting errors or keyword mismatches.
            Our mission is to make resume optimization accessible, transparent, and effective for everyone—
            from students to experienced professionals aiming for their dream roles.
          </p>
        </div>

        {/* Call to Action */}
        <div className="mt-10">
          <a
            href="/upload"
            className="primary-button hover:primary-gradient-hover transition-all duration-300"
          >
            Try It Now
          </a>
        </div>

        {/* Closing Note */}
        <div className="text-gray-600 mt-6">
          <p>
            Whether you're a student, a professional, or a career changer — <strong>Resume AI Analyzer</strong> is your
            trusted partner in crafting resumes that pass modern hiring systems with ease.
          </p>
        </div>
      </section>
    </main>
  );
};

export default About;
