import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume Analyzer" },
    { name: "description", content: "Get smart, AI-driven feedback to improve your resume instantly." },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list("resume:*", true)) as KVItem[];

      const parsedResumes = resumes?.map((resume) => JSON.parse(resume.value) as Resume);

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };

    loadResumes();
  }, []);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Analyze, Track, and Improve Your Resume</h1>
          {!loadingResumes && resumes?.length === 0 ? (
            <h2>It looks like you haven’t uploaded any resumes yet. Start by uploading one to get personalized AI feedback.</h2>
          ) : (
            <h2>Review your past submissions and explore detailed AI-powered insights to enhance your resume.</h2>
          )}
        </div>

        {loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" className="w-[200px]" />
            <p className="mt-4 text-gray-600 text-lg">Analyzing your resumes...</p>
          </div>
        )}

        {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}

        {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
              Upload Your Resume
            </Link>
            <p className="text-gray-600 text-lg">Receive instant, smart feedback powered by AI.</p>
          </div>
        )}
      </section>
    </main>
  );
}
