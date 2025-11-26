import React, { useEffect, useState } from "react";
import "./result.css";
import LandingLayoutPage from "../../Components/LandingPageLayout";
import { Download } from "@mui/icons-material";
import { useFetchAssessmentDetailsResultInPdfMutation } from "../../Features/CareerChoice/AuthSlice";
import { getUserDataFromLocalStorage } from "../../common/getDataFromLocal";
import { Link, useSearchParams } from "react-router-dom";
import Loading from "../../Components/Loading";
import { Skeleton, Typography } from "@mui/material";
import MainLogo from "../../common/logo";

const DescriptionIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-2 -1 24 24"
    width="64"
    height="64"
    aria-hidden="true"
  >
    <path
      d="M4 2h9l5 5v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
      fill="none"
      stroke="#182958"
      stroke-width="1.4"
      stroke-linejoin="round"
    />
    <path
      d="M13 2v4h4"
      fill="none"
      stroke="#182958"
      stroke-width="1.2"
      strokeLinecap="round"
      stroke-linejoin="round"
    />
    <rect
      x="6"
      y="9"
      width="10"
      height="1.2"
      rx="0.6"
      fill="#182958"
      opacity="0.9"
    />
    <rect
      x="6"
      y="12"
      width="8"
      height="1.2"
      rx="0.6"
      fill="#182958"
      opacity="0.9"
    />
    <rect
      x="6"
      y="15"
      width="6"
      height="1.2"
      rx="0.6"
      fill="#182958"
      opacity="0.9"
    />
  </svg>
);

const CodeIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width="80"
    height="80"
    fill="none"
    stroke="#182958"
    stroke-width="20"
    strokeLinecap="round"
    stroke-linejoin="round"
  >
    <path d="M256 64c-88 0-160 72-160 160 0 56 32 104 80 128v48h160v-48c48-24 80-72 80-128 0-88-72-160-160-160z" />

    <path d="M208 224c0-16 16-32 32-32s32 16 32 32v16c0 16-16 32-32 32s-32-16-32-32v-16z" />

    <line x1="256" y1="96" x2="256" y2="128" />
    <line x1="176" y1="128" x2="208" y2="160" />
    <line x1="336" y1="128" x2="304" y2="160" />
    <circle cx="256" cy="80" r="8" fill="#182958" />
    <circle cx="176" cy="120" r="8" fill="#182958" />
    <circle cx="336" cy="120" r="8" fill="#182958" />

    <rect x="208" y="400" width="96" height="24" rx="8" />
    <rect x="192" y="432" width="128" height="16" rx="8" />
  </svg>
);

const WorkIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
    <rect width="64" height="64" fill="none" />
    <path
      fill="#182958"
      d="M56 12H8c-2.2 0-4 1.8-4 4v32c0 2.2 1.8 4 4 4h48c2.2 0 4-1.8 4-4V16c0-2.2-1.8-4-4-4zm-32 8c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6zm8 24H16v-2c0-3.3 2.7-6 6-6h4c3.3 0 6 2.7 6 6v2zm20-4H36v-4h16v4zm0-8H36v-4h16v4zm0-8H36v-4h16v4z"
    />
  </svg>
);

const PeopleIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width="64"
    height="64"
  >
    <circle cx="256" cy="192" r="80" fill="#182958" />
    <path
      d="M128 384c0-64 64-96 128-96s128 32 128 96v64H128v-64z"
      fill="#182958"
    />
    <circle cx="128" cy="192" r="56" fill="#182958" />
    <path d="M32 352c0-48 48-72 96-72s96 24 96 72v48H32v-48z" fill="#182958" />
    <circle cx="384" cy="192" r="56" fill="#182958" />
    <path
      d="M288 352c0-48 48-72 96-72s96 24 96 72v48H288v-48z"
      fill="#182958"
    />
  </svg>
);

const ToolCard = ({ icon: Icon, title, subtitle, locked }) => (
  <div className="tool-card">
    <div className="tool-card-icon-wrapper">
      <Icon className="tool-card-icon" />
    </div>
    <p className="tool-card-title">{title}</p>
  </div>
);

const ScoreCard = ({ score, category, isLoading }) => {
  const percentage = Number(score?.score);
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const filePath = score?.file_path || "";

  let finalUrl = "";

  if (filePath) {
    const parts = filePath.split("/");
    const fileName = parts.pop(); // last segment (PDF name)
    const encodedFileName = encodeURIComponent(fileName);
    const baseUrl = parts.join("/");
    finalUrl = `${baseUrl}/${encodedFileName}?no_cache=1`;
  }

  return (
    <div className="score-card" style={{ textAlign: "center" }}>
      <h3 className="score-card-header">Your Skill Assessment Score</h3>
      <div className="score-card-progress-container">
        {isLoading && score?.score ? (
          <Skeleton />
        ) : (
          <div className="score-card-progress-circle">
            <svg width="150" height="150" viewBox="0 0 150 150">
              {/* Background Circle */}
              <circle
                cx="75"
                cy="75"
                r={radius}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="10"
              />
              {/* Progress Circle (using stroke-dashoffset to show progress) */}
              <circle
                cx="75"
                cy="75"
                r={radius}
                fill="none"
                stroke="var(--color-secondary)"
                strokeWidth="10"
                strokeLinecap="round"
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: offset,
                  transform: "rotate(-90deg)",
                  transformOrigin: "75px 75px",
                  transition: "stroke-dashoffset 0.5s ease",
                }}
              />
            </svg>
          </div>
        )}
        <div className="score-card-score-text">{score?.score ?? 0}</div>
      </div>

      <a href={finalUrl} target="_blank" rel="noopener noreferrer">
        <div
          style={{
            color: "black",
            textAlign: "center",
            display: "flex",
            gap: "5px",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Download fontSize="small" size="small" />
          <p style={{ color: "black", textAlign: "center" }}>Download Result</p>
        </div>
      </a>
    </div>
  );
};

// --- Main Application Component ---

const ResultPage = () => {
  const [searchParams] = useSearchParams();
  const assessment = searchParams.get("assessment");
  const tools = [
    {
      icon: DescriptionIcon,
      title: "Resume Tool",
      locked: false,
    },
    {
      icon: CodeIcon,
      title: "Tech & Smart",
      subtitle: "Skills",
      locked: false,
    },
    {
      icon: WorkIcon,
      title: "Project-Based",
      subtitle: "Virtual Internship",
      locked: false,
    },
    {
      icon: PeopleIcon,
      title: "Interview Tool",
      locked: false,
    },
  ];
  const [scoreData, setScoreData] = useState(null);
  const [fetchAssessmentDetailsResultInPdf, { isLoading }] =
    useFetchAssessmentDetailsResultInPdfMutation();
  const [checkFinalStarted, setCheckFinalStarted] = useState(false);
  const localData = getUserDataFromLocalStorage();

  const downloadAssessmentDetailsPdf = async () => {
    const payload = {
      email: localData?.email,
      assessment: assessment,
    };
    try {
      if (!checkFinalStarted) {
        const assessmentDetails = await fetchAssessmentDetailsResultInPdf(
          payload
        ).unwrap();

        setCheckFinalStarted(true);
        const { data, status } = assessmentDetails;
        // console.log(data, ".... assessment data", status);
        if (status === 200) {
          setScoreData(data);
        }
      }
    } catch (error) {
      console.error("Failed to fetch assessment PDF:", error);
      setScoreData(null);
    } finally {
      setCheckFinalStarted(false);
    }
  };

  useEffect(() => {
    downloadAssessmentDetailsPdf();
  }, [assessment]);
  
  let logoData = JSON.parse(localStorage.getItem('userData'));

  if (isLoading) return <Loading open={true} />;

  return (
    <LandingLayoutPage>
      <div className="result-layout min-h-screen bg-primary relative overflow-hidden">
        <div className="Content-container">
          <div id="menu-and-logo-container">
            <div className="header-logo">
              {/* Employability <br />
              Advantage */}
              <MainLogo  height={50} width={'auto'} />
            </div>
          </div>
        </div>

        <main className="relative mx-auto">
          <div className="lg-grid-cols-2 gap-12 items-start max-w-7xl mx-auto result-container">
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md-text-5xl font-bold text-primary-foreground mb-6">
                  {scoreData?.main_career}
                </h1>
                  <Typography variant="h5" sx={{margin:'0px',fontSize:"24px"}} className=" font-bold text-primary-foreground mb-6">
                  {scoreData?.sub_career}
                </Typography>
                
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-primary-foreground">
                    Let's see how you fared!
                  </h2>

                  <p className="text-primary-foreground-90 text-lg leading-relaxed">
                    Got your score? You know what areas you're good at and what
                    areas you need to work on to improve your employability.
                  </p>

                  {/* <div className="flex items-center gap-3 bg-success-20 border-success-30 rounded-xl p-4">
                    <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center flex-shrink-0">
                      <span className="text-success-foreground font-bold text-sm">
                        B
                      </span>
                    </div>
                    <p className="text-primary-foreground font-semibold">
                      You now have access to new unlocked areas
                    </p>
                  </div> */}

                  {/* <p className="text-primary-foreground-90 text-lg">
                    Start today. Gain skills. Build resume value.
                  </p> */}
                </div>
              </div>

              <div>
                {/* <h2 className="text-2xl font-bold text-primary-foreground mb-6">
                  This is your path to getting job ready
                </h2>

                <div className="grid grid-cols-2 md-grid-cols-4 gap-6">
                  {tools.map((tool, index) => (
                    <ToolCard
                      key={index}
                      icon={tool.icon}
                      title={tool.title}
                      subtitle={tool.subtitle}
                      locked={tool.locked}
                    />
                  ))}
                </div> */}
              </div>
            </div>

            {/* Right Content - Score Card */}
            <div className="lg-sticky score-container lg-top-28">
              <ScoreCard
                isLoading={isLoading}
                score={scoreData}
                category="Negotiation"
              />
            </div>
          </div>
        </main>
      </div>
    </LandingLayoutPage>
  );
};

export default ResultPage;
