import React from "react";
import "./result.css";
import LandingLayoutPage from "../../Components/LandingPageLayout";

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
      stroke="#ffffffff"
      stroke-width="1.4"
      stroke-linejoin="round"
    />
    <path
      d="M13 2v4h4"
      fill="none"
      stroke="#ffffffff"
      stroke-width="1.2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <rect
      x="6"
      y="9"
      width="10"
      height="1.2"
      rx="0.6"
      fill="#ffffffff"
      opacity="0.9"
    />
    <rect
      x="6"
      y="12"
      width="8"
      height="1.2"
      rx="0.6"
      fill="#ffffffff"
      opacity="0.9"
    />
    <rect
      x="6"
      y="15"
      width="6"
      height="1.2"
      rx="0.6"
      fill="#ffffffff"
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
    stroke="#ffffff"
    stroke-width="20"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M256 64c-88 0-160 72-160 160 0 56 32 104 80 128v48h160v-48c48-24 80-72 80-128 0-88-72-160-160-160z" />

    <path d="M208 224c0-16 16-32 32-32s32 16 32 32v16c0 16-16 32-32 32s-32-16-32-32v-16z" />

    <line x1="256" y1="96" x2="256" y2="128" />
    <line x1="176" y1="128" x2="208" y2="160" />
    <line x1="336" y1="128" x2="304" y2="160" />
    <circle cx="256" cy="80" r="8" fill="#ffffff" />
    <circle cx="176" cy="120" r="8" fill="#ffffff" />
    <circle cx="336" cy="120" r="8" fill="#ffffff" />

    <rect x="208" y="400" width="96" height="24" rx="8" />
    <rect x="192" y="432" width="128" height="16" rx="8" />
  </svg>
);

const WorkIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
    <rect width="64" height="64" fill="none" />
    <path
      fill="#ffffff"
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
    <circle cx="256" cy="192" r="80" fill="#ffffff" />
    <path
      d="M128 384c0-64 64-96 128-96s128 32 128 96v64H128v-64z"
      fill="#ffffff"
    />
    <circle cx="128" cy="192" r="56" fill="#ffffff" />
    <path d="M32 352c0-48 48-72 96-72s96 24 96 72v48H32v-48z" fill="#ffffff" />
    <circle cx="384" cy="192" r="56" fill="#ffffff" />
    <path
      d="M288 352c0-48 48-72 96-72s96 24 96 72v48H288v-48z"
      fill="#ffffff"
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

const ScoreCard = ({ score, category }) => {
  const percentage = score; 
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference; 

  return (
    <div className="score-card">
      <h3 className="score-card-header">Your Diagnostic Score</h3>

      <div className="score-card-progress-container">
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
        <div className="score-card-score-text">{score.toFixed(2)}</div>
      </div> 
      <p className="score-card-category">Highest Deficiency: {category}</p> 
    </div>
  );
};

// --- Main Application Component ---

const ResultPage = () => {
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

  return (
    <LandingLayoutPage>
      <div className="result-layout min-h-screen bg-primary relative overflow-hidden"> 
        <div class="Content-container">
          <div id="menu-and-logo-container">
            <div className="header-logo">
              <img src="/ECAIcon.png" alt="logo" width="30px" height="30px" />{" "}
              Employability{" "}
              <span className="logo-accent">
                {" "}
                <br />
                Advantage
              </span>
            </div>
          </div>
        </div>

        <main className="relative mx-auto">
          <div className="lg-grid-cols-2 gap-12 items-start max-w-7xl mx-auto result-container">
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md-text-5xl font-bold text-primary-foreground mb-6">
                  Diagnostic Assessment
                </h1>

                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-primary-foreground">
                    Let's see how you fared!
                  </h2>

                  <p className="text-primary-foreground-90 text-lg leading-relaxed">
                    Got your score? You know what areas you're good at and what
                    areas you need to work on to improve your employability.
                  </p>

                  <div className="flex items-center gap-3 bg-success-20 border-success-30 rounded-xl p-4">
                    <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center flex-shrink-0">
                      <span className="text-success-foreground font-bold text-sm">
                        B
                      </span>
                    </div>
                    <p className="text-primary-foreground font-semibold">
                      You now have access to new unlocked areas
                    </p>
                  </div>

                  <p className="text-primary-foreground-90 text-lg">
                    Start today. Gain skills. Build resume value.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-primary-foreground mb-6">
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
                </div>
              </div>
            </div>

            {/* Right Content - Score Card */}
            <div className="lg-sticky score-container lg-top-28">
              <ScoreCard score={76.0} category="Negotiation" />
            </div>
          </div>
        </main>
      </div>
    </LandingLayoutPage>
  );
};

export default ResultPage;
