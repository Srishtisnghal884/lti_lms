import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Assesment.css";
import { CancelRounded } from "@mui/icons-material";
import LandingLayoutPage from "../../Components/LandingPageLayout";
import { Button, Typography } from "@mui/material";
import AssessmentData from "../../Data/AssessmentData.json";
import SkillCheck from "../../Data/SkillCheck.json";
import {
  useCheckCandidateEligibilityMutation,
  useCheckExamMutation,
  useDeleteCandidateMutation,
  useFetchAssessmentDetailsResultInPdfMutation,
  useInviteCandidateMutation,
} from "./AuthSlice";
import { getUserDataFromLocalStorage } from "../../common/getDataFromLocal";
import Loading from "../../Components/Loading";
import { SearchableSelect } from "./SearchableSelect";

export default function CareerChoice() {
  const [step, setStep] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCat, setModalCat] = useState(AssessmentData[0].id);
  const [modalSkill, setModalSkill] = useState(AssessmentData[0].items[0]);
  const [checkCandidateEligibility, { isLoading }] =
    useCheckCandidateEligibilityMutation();
  const [inviteCandidate, { isLoadingInviteCandidate }] =
    useInviteCandidateMutation();
  const [checkExam, { isLoadingCheckExam }] = useCheckExamMutation();
  const [deleteCandidate, { isLoadingDeleteCandidate }] =
    useDeleteCandidateMutation();
  const [fetchAssessmentDetailsResultInPdf, { isLoadingResult }] =
    useFetchAssessmentDetailsResultInPdfMutation();
  const [confirmStartAssessment, setOpenConfirmStartAssessment] =
    useState(false);
  const localData = getUserDataFromLocalStorage();

  let newWindow = null;
  const firstPillRef = useRef(null);
  const stepDots = useMemo(() => [1, 2].map((n) => n === step), [step]);

  const filteredRoles = useMemo(() => {
    const q = (search || "").toLowerCase();
    return AssessmentData.filter((r) => r?.name?.toLowerCase().includes(q));
  }, [search]);

  const activeRole = selectedRole ?? AssessmentData[0];
  // const filteredSkills = useMemo(() => {
  //   const q = (search || "").toLowerCase();
  //   return activeRole?.items?.filter((s) => s?.name?.toLowerCase().includes(q));
  // }, [search, activeRole]);

  useEffect(() => {
    const role =
      AssessmentData.find((r) => r.id === modalCat) || AssessmentData[0];
    setModalSkill((prev) => (role.items.includes(prev) ? prev : role.items[0]));
  }, [modalCat]);

  const categoryOptions = SkillCheck?.map((r) => ({
    label: r?.name,
    value: r?.id,
    items: r?.items,
  }));

  const startQuickCheck = () => {
    setModalOpen(false);
    setOpenConfirmStartAssessment(true);
  };

  //1. check candidate already invite for assessments
  const startAssessment = async (roleName, skillName) => { 
    const payload = {
      email: localData?.email,
      assessment: skillName,
    };

    const result = await checkCandidateEligibility(payload);
    console.log(
      "check log  1",
      result );
    if(result?.data?.data?.attempts == 1) {
      console.log("check log  delete", result);
      const deleteC = await deleteCandidate({
        email: localData?.email,
        assessment: skillName,
      })
      console.log("check log result", deleteC);
    }
    setOpenConfirmStartAssessment(true);
  };

  //2. Invite Candidate for exam
  const handleClickGo = async () => {
    const result = await inviteCandidate({
      email: localData?.email,
      first_name: localData?.name,
      last_name: "Test",
      full_name: `${localData?.name} t`,
      assessment: selectedSkill,
    });
    console.log("check log  2", result);
    if (result?.data) {
      newWindow = window.open(
        result?.data?.data?.inviteUrl,
        "_blank",
        "width=800,height=600"
      );
      if (newWindow) {
        startWindowCheckPolling();
      }
    }
  };

  function startWindowCheckPolling() {
    const timer = setInterval(() => {
      console.log("check exam is open ", newWindow);
      checkExamStatus();
      if (newWindow && newWindow.closed) {
        console.log("New examwindow has been closed."); 
        clearInterval(timer);
      } else if (!newWindow) {
        // This case handles potential blockers if newWindow couldn't open
        clearInterval(timer);
        console.log(
          "New examwindow reference is null. Could not start tracking."
        );
      }
    }, 10000);
  }

  //3. Frequently check exam done or not when user want to try to attempt exam (candidate details)
  async function checkExamStatus() {
    const payloadExam = {
      email: localData?.email,
      assessment: selectedSkill,
    };

    // Step 1️⃣: Check Exam Status
    const examStatus = await checkExam(payloadExam).unwrap();
    console.log("check log  3", examStatus);
    const status = examStatus?.data?.assessments_detail[0]?.status;
    if (status === "completed" && !!newWindow.closed) {
      await fetchAssessmentDetailsResultInPdf(payloadExam);
      window.location.replace(`/dashboard/results`);
    }
  }

  useEffect(() => {
    if (!!newWindow?.closed) { 
      checkExamStatus();
      window.location.replace(`/dashboard/results`);
    }
  }, [!!newWindow?.closed]);

  if (isLoading || isLoadingCheckExam || isLoadingInviteCandidate || isLoadingDeleteCandidate){
    return <Loading open={true} />;
  }

  return (
    <LandingLayoutPage>
      <div className="assessment-box">
        <main className="app rc-wrap">
          <section className="card" id="widget">
            <header>
              <div className="brand">
                <h1>Employability Advantage</h1>
              </div>
              <nav className="stepper" aria-label="Progress">
                <div
                  className={`dot ${stepDots[0] ? "active" : ""}`}
                  data-step-dot
                >
                  1
                </div>
                <div className="line" />
                <div
                  className={`dot ${stepDots[1] ? "active" : ""}`}
                  data-step-dot
                >
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
                    setSearch("");
                  }}
                  openModal={() => setModalOpen(true)}
                  firstPillRef={firstPillRef}
                />
              ) : (
                <Step2
                  role={activeRole}
                  search={search}
                  onSearch={(value) => {
                    setSearch(value);
                  }}
                  selectedSkill={selectedSkill}
                  onToggleSkill={(skill) =>
                    setSelectedSkill((prev) => (prev === skill ? null : skill))
                  }
                  onBack={() => {
                    setStep(1);
                    setSearch("");
                  }}
                  onStart={() =>
                    selectedSkill &&
                    startAssessment(activeRole.name, selectedSkill)
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
              if (e.target.classList?.contains("backdrop")) setModalOpen(false);
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
                    <SearchableSelect
                      label="Major Section"
                      options={categoryOptions.sort((a, b) =>
                        a?.value?.localeCompare(b?.value)
                      )}
                      value={modalCat}
                      onChange={(e) => {
                        setModalCat(e);
                      }} 
                    />
                  </div>
                  <div className="field">
                    <SearchableSelect
                      label="Specific Skill"
                      options={(
                        categoryOptions?.find((r) => r?.value === modalCat) ||
                        categoryOptions[0]
                      )?.items
                        ?.sort((a, b) => a?.name?.localeCompare(b?.name))
                        ?.map((s) => ({
                          label: s?.name,
                          value: s?.assessment_name,
                        }))}
                      value={modalSkill}
                      onChange={setModalSkill}
                    />
                  </div>
                </div>
                <p className="help">
                  Pick a major section, then choose a specific skill to start an
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
                <button
                  className="btn btn-primary"
                  type="button"
                  id="mStart"
                  onClick={startQuickCheck}
                >
                  Start Check
                </button>
              </footer>
            </div>
          </section>

          <section
            className={`modal ${confirmStartAssessment ? "open" : ""}`}
            id="skillsModal"
            aria-hidden={!confirmStartAssessment}
            role="dialog"
            aria-labelledby="mTitle"
            onClick={(e) => {
              if (e.target.classList?.contains("backdrop"))
                setOpenConfirmStartAssessment(false);
            }}
          >
            <div className="backdrop" />
            <div className="dialog" role="document">
              <header>
                <h3 id="mTitle">Important</h3>
                <button
                  className="close"
                  type="button"
                  title="Close"
                  aria-label="Close"
                  onClick={() => setOpenConfirmStartAssessment(false)}
                >
                  ✕
                </button>
              </header>
              <div className="body">
                <Typography variant="inherit">
                  Please enable pop-ups in your browser to ensure all features
                  of this application work smoothly. The assessment cannot be
                  paused once started; you must complete it in one go. If paused
                  midway, the assessment will be marked incomplete, and your
                  score will only reflect the parts you've completed. The length
                  of the assessment varies, ranging from 10 to 40 minutes
                </Typography>
              </div>
              <footer className="go-btn">
                <Button variant="contained" onClick={handleClickGo}>
                  Go
                </Button>
              </footer>
            </div>
          </section>
        </main>
      </div>
    </LandingLayoutPage>
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
          <h2 className="career-title">My Career Choice</h2>
          <p className="subtitle">
            Choose a Role to explore or jump into a Skills Check
          </p>
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
        {filteredRoles
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((role, idx) => { 
            const pressed = selectedRole?.id === role.id;
            return (
              <button
                key={role.id}
                className="pill"
                role="button"
                aria-pressed={pressed}
                onClick={() => onSelectRole(role)}
                ref={idx === 0 ? firstPillRef : undefined}
                style={{ alignItems: "center" }}
              >
                <span className="icon" aria-hidden="true" sx={{ mt: 0 }}>
                  {pressed ? "✅" : "🟠"}
                </span>
                <span className="label">{role.name}</span>
                <span className="label ml-auto-imp" style={{ width: "30px" }}>
                  {pressed && (
                    <CancelRounded
                      style={{ position: "relative", zIndex: 1 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectRole(null);
                      }}
                    />
                  )}
                </span>
              </button>
            );
          })}
      </div>

      <div className="cta">
        <div></div>
        <div className="btn-container">
          <button
            className="btn btn-primary"
            disabled={!selectedRole}
            onClick={onContinue}
          >
            Continue →
          </button>
        </div>
      </div>
      <button className="btn btn-outline skill-check-cta" onClick={openModal}>
        ⚙️ Skills Check
      </button>
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
  openModal,
}) {
  return (
    <>
      <div className="title pop">
        <div>
          <h2>{role.name}</h2>
          <p className="subtitle">
            Select a specific skill or sub‑role to assess
          </p>
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
          .sort((a, b) => a?.name?.localeCompare(b?.name))
          .filter((s) =>
            s?.name?.toLowerCase().includes((search || "").toLowerCase())
          )
          .map((skill, idx) => { 
            const pressed = selectedSkill === skill?.assessment_name;
            return (
              <button
                key={skill?.assessment_name}
                className="pill"
                aria-pressed={pressed}
                onClick={() => onToggleSkill(skill?.assessment_name)}
                ref={idx === 0 ? firstPillRef : undefined}
                style={{ alignItems: "center" }}
              >
                <span className="icon" aria-hidden="true" sx={{ mt: 0 }}>
                  {pressed ? "✅" : "🟠"}
                </span>
                <span className="label">{skill.name}</span>
                <span className="label ml-auto-imp" style={{ width: "30px" }}>
                  {pressed && (
                    <CancelRounded
                      style={{ position: "relative", zIndex: 1 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSkill(null);
                      }}
                    />
                  )}
                </span>
              </button>
            );
          })}
      </div>

      <div className="cta">
        <button className="btn btn-outline" onClick={onBack}>
          ← Back
        </button>
        <div>
          <button
            className="btn btn-primary"
            disabled={!selectedSkill}
            onClick={onStart}
          >
            Start Assessment
          </button>
        </div>
      </div>
      <div>
        <button className="btn btn-outline skill-check-cta" onClick={openModal}>
          ⚙️ Skills Check
        </button>
      </div>
    </>
  );
}