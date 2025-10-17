import React, { useEffect, useMemo, useRef, useState } from "react";
import './Assesment.css';   
 
const DATA = [
  {
    id: "business",
    name: "Business Management",
    items: [
      "Leadership & People",
      "Human Resources",
      "Strategy / Consulting",
      "Financial Management",
      "Operations Management",
      "Marketing Management",
      "Business Development",
      "Risk Management",
      "Administrative Management",
    ],
  },
  {
    id: "tech",
    name: "Technology (IT)",
    items: [
      "Full‑Stack Development",
      "Data & Analytics",
      "Cloud & DevOps",
      "Cybersecurity",
      "Product Management",
      "AI / ML",
    ],
  },
  { id: "finance", name: "Finance", items: ["Accounting", "Auditing", "Treasury", "Investment Banking", "Financial Planning"] },
  { id: "logistics", name: "Logistics", items: ["Supply Chain", "Warehouse Ops", "Procurement", "Fleet / Last‑mile"] },
  { id: "public", name: "Public Sector", items: ["Administration", "Compliance", "Citizen Services"] },
  { id: "retail", name: "Retail", items: ["Store Ops", "Visual Merchandising", "E‑commerce"] },
  { id: "digital", name: "Digital Marketing", items: ["SEO", "Performance Ads", "Content / Social", "Automation"] },
  { id: "hr", name: "Human Resources", items: ["Recruitment", "Payroll", "L&D", "HR Analytics"] },
  { id: "education", name: "Education", items: ["Teaching", "Curriculum", "EdTech"] },
  { id: "project", name: "Project Management", items: ["PMO", "Agile / Scrum", "Delivery"] },
  { id: "sales", name: "Sales", items: ["B2B", "Inside Sales", "Account Mgmt"] },
];
 
export default function CareerChoice() { 
  const [step, setStep] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCat, setModalCat] = useState(DATA[0].id);
  const [modalSkill, setModalSkill] = useState(DATA[0].items[0]);

  const firstPillRef = useRef(null);
 
  const stepDots = useMemo(() => [1, 2].map((n) => n === step), [step]);
 
  useEffect(() => {
    if (firstPillRef.current) {
      firstPillRef.current.focus();
    }
  }, [step, search, selectedRole]);
 
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Enter" && step === 1) {
        setStep(2);
      }
      if (e.key === "Escape" && step === 2) {
        setStep(1);
        setSearch("");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

 
  const filteredRoles = useMemo(() => {
    const q = (search || "").toLowerCase();
    return DATA.filter((r) => r.name.toLowerCase().includes(q));
  }, [search]);

  const activeRole = selectedRole ?? DATA[0];
  const filteredSkills = useMemo(() => {
    const q = (search || "").toLowerCase();
    return activeRole.items.filter((s) => s.toLowerCase().includes(q));
  }, [search, activeRole]);
 
  useEffect(() => {
    const role = DATA.find((r) => r.id === modalCat) || DATA[0];
    setModalSkill((prev) => (role.items.includes(prev) ? prev : role.items[0]));
  }, [modalCat]);

  const startAssessment = (roleName, skillName) => {
    // Keep the original behavior
    alert(`Starting assessment for \nRole: ${roleName}\nSkill: ${skillName}`);
  };

  const startQuickCheck = () => {
    const role = DATA.find((r) => r.id === modalCat) || DATA[0];
    setModalOpen(false);
    alert(`Starting quick Skills Check for\n${role.name} → ${modalSkill}`);
  };

  return (
    <div className="assessment-box"> 

      <main className="app rc-wrap">
        <section className="card" id="widget">
          <header>
            <div className="brand"> 
              <img src="/ECAIcon.png" width={40} height={40} alt="logo"/> 
              <h1>Employability Advantage</h1>
            </div>
            <nav className="stepper" aria-label="Progress">
              <div className={`dot ${stepDots[0] ? "active" : ""}`} data-step-dot>
                1
              </div>
              <div className="line" />
              <div className={`dot ${stepDots[1] ? "active" : ""}`} data-step-dot>
                2
              </div>
            </nav>
          </header>

          <div className="content" id="content">
            {step === 1 ? (
              <Step1
                search={search}
                onSearch={setSearch}
                filteredRoles={filteredRoles}
                selectedRole={selectedRole}
                onSelectRole={(role) => {
                  setSelectedRole(role);
                  setSelectedSkill(null);
                }}
                onContinue={() => {
                  setStep(2);
                }}
                openModal={() => setModalOpen(true)}
                firstPillRef={firstPillRef}
              />
            ) : (
              <Step2
                role={activeRole}
                search={search}
                onSearch={setSearch}
                selectedSkill={selectedSkill}
                onToggleSkill={(skill) =>
                  setSelectedSkill((prev) => (prev === skill ? null : skill))
                }
                onBack={() => {
                  setStep(1);
                  setSearch("");
                }}
                onStart={() =>
                  selectedSkill && startAssessment(activeRole.name, selectedSkill)
                }
                openModal={() => setModalOpen(true)}
                firstPillRef={firstPillRef}
              />
            )}
          </div> 
        </section>
 
        <section
          className={`modal ${modalOpen ? "open" : ""}`}
          id="skillsModal"
          aria-hidden={!modalOpen}
          role="dialog"
          aria-labelledby="mTitle"
          onClick={(e) => {
            if ((e.target).classList?.contains("backdrop")) setModalOpen(false);
          }}
        >
          <div className="backdrop" />
          <div className="dialog" role="document">
            <header>
              <h3 id="mTitle">Skills Check</h3>
              <button
                className="close"
                type="button"
                title="Close"
                aria-label="Close"
                onClick={() => setModalOpen(false)}
              >
                ✕
              </button>
            </header>
            <div className="body">
              <div className="two">
                <div className="field">
                  <label className="label" htmlFor="mCategory">
                    Major Section
                  </label>
                  <select
                    id="mCategory"
                    value={modalCat}
                    onChange={(e) => setModalCat(e.target.value)}
                  >
                    {DATA.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label className="label" htmlFor="mSkill">
                    Specific Skill
                  </label>
                  <select
                    id="mSkill"
                    value={modalSkill}
                    onChange={(e) => setModalSkill(e.target.value)}
                  >
                    {(DATA.find((r) => r.id === modalCat) || DATA[0]).items.map(
                      (s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
              <p className="help">
                Pick a major section, then choose a specific skill to start a fast
                assessment.
              </p>
            </div>
            <footer>
              <button
                className="btn btn-outline"
                type="button"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" type="button" id="mStart" onClick={startQuickCheck}>
                Start Check
              </button>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}

function Step1({
  search,
  onSearch,
  filteredRoles,
  selectedRole,
  onSelectRole,
  onContinue,
  openModal,
  firstPillRef,
}) { 
  
  return (
    <>
      <div className="title pop">
        <div>
          <h2>My Career Choice</h2>
          <p className="subtitle">Choose a Role to explore or jump into a Skills Check</p>
        </div>
        <div className="badges">
          <span className="badge">Step 1 of 2</span>
        </div>
      </div>

      <div className="search">
        <input
          type="search"
          placeholder="Search roles…"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        /> 
      </div>

      <div className="grid">
        {filteredRoles.map((role, idx) => {
          const pressed = selectedRole?.id === role.id;
          return (
            <button
              key={role.id}
              className="pill"
              role="button"
              aria-pressed={pressed}
              onClick={() => onSelectRole(role)}
              ref={idx === 0 ? firstPillRef : undefined}
            >
              <span className="icon" aria-hidden="true">
                🔹
              </span>
              <span className="label">{role.name}</span>
            </button>
          );
        })}
      </div>

      <div className="cta">
        <div></div>
      
       <div className="btn-container">
         <button className="btn btn-contained" onClick={() => window.history.back()}>
          ← Back
        </button>
        <button className="btn btn-primary" disabled={!selectedRole} onClick={onContinue}>
          Continue →
        </button>
       </div>
      </div>
       <div>
        <button className="btn btn-outline" onClick={openModal}>
          ⚙️ Skills Check
        </button>
       </div>
    </>
  );
}

function Step2({
  role,
  search,
  onSearch,
  selectedSkill,
  onToggleSkill,
  onBack,
  onStart,
  firstPillRef,
  openModal
}) {
  return (
    <>
      <div className="title pop">
        <div>
          <h2>{role.name}</h2>
          <p className="subtitle">Select a specific skill or sub‑role to assess</p>
        </div>
        <div className="badges">
          <span className="badge">Step 2 of 2</span>
          <span className="badge">{role.name}</span>
        </div>
      </div>

      <div className="search">
        <input
          type="search"
          placeholder="Search skills within this role…"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        /> 
      </div>

      <div className="grid">
        {role.items
          .filter((s) => s.toLowerCase().includes((search || "").toLowerCase()))
          .map((skill, idx) => {
            const pressed = selectedSkill === skill;
            return (
              <button
                key={skill}
                className="pill"
                aria-pressed={pressed}
                onClick={() => onToggleSkill(skill)}
                ref={idx === 0 ? firstPillRef : undefined}
              >
                <span className="icon" aria-hidden="true">{pressed ? "✅" : "🟠"}</span>
                <span className="label">{skill}</span>
              </button>
            );
          })}
      </div>

      <div className="cta">
        <button className="btn btn-outline" onClick={onBack}>
          ← Back
        </button>
        <div>
          <button className="btn btn-primary" disabled={!selectedSkill} onClick={onStart}>
            Start Assessment
          </button>
        </div>
      </div>
      <div>
        <button className="btn btn-outline" onClick={openModal}>
        ⚙️ Skills Check
        </button>
      </div>
    </>
  );
}
