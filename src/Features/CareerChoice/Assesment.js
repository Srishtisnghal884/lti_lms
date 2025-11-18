import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Assesment.css";
import LandingLayoutPage from "../../Components/LandingPageLayout";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Typography,
} from "@mui/material";
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
import { useTheme } from "@emotion/react";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";

export default function CareerChoice() {
  const [step, setStep] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
  const [modalCat, setModalCat] = useState(AssessmentData[0].id);
  const [modalSkill, setModalSkill] = useState(AssessmentData[0].items[0]);
  const [modalTouched, setModalTouched] = useState({
    cat: false,
    skill: false,
  });
  const [modalErrors, setModalErrors] = useState({});
  const [modalSubmitting, setModalSubmitting] = useState(false);
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
  const theme = useTheme();
  const [candidateEligibilityData, setCandidateEligibilityData] =
    useState(null);
  const [loader, setLoader] = useState(false);
  const [breakExamExecution, setBreakExamExecution] = useState(false);
  const [isLoadingInvite, setIsLoadingInvite] = useState(false);

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

  //1. check candidate already invite for assessments
  const startAssessment = async (roleName, skillName) => {
    const payload = {
      email: localData?.email,
      assessment: skillName,
    };

    const result = await checkCandidateEligibility(payload);
    console.log("check log checkCandidateEligibility", result);
    setCandidateEligibilityData(result);
    if (result?.data?.data?.attempts == 1) {
      const deleteC = await deleteCandidate({
        email: localData?.email,
        assessment: skillName,
      });
      console.log("check log delete...", deleteC);
      if (deleteC?.error?.data) {
        console.log("check log result", deleteC?.error?.data?.message);
      }
    }
    setOpenConfirmStartAssessment(true);
  };

  const startQuickCheck = async () => {
    const errors = {};
    if (!modalCat || !modalTouched.cat)
      errors.cat = "Please select a major section.";
    if (!modalSkill || !modalTouched.skill)
      errors.skill = "Please select a specific skill.";
    setModalErrors(errors);
    if (Object.keys(errors).length) return;

    // mark submitting so UI can be disabled
    try {
      setModalSubmitting(true);
      // call the eligibility check flow and wait for it
      await startAssessment('1', modalSkill);
      setSelectedSkill(modalSkill);
      setModalOpen(false);
    } catch (err) {
      console.error('startQuickCheck error', err);
    } finally {
      setModalSubmitting(false);
    }
  };

  //2. Invite Candidate for exam
  const handleClickGo = async () => {
    setIsLoadingInvite(true);
    try {
      const result = await inviteCandidate({
        email: localData?.email,
        first_name: localData?.name,
        last_name: "Test",
        full_name: `${localData?.name} t`,
        assessment: selectedSkill,
      });
      const { data } = result;
      console.log("check log inviteCandidate 5656", data);
      if (!!data?.status) {
        setIsLoadingInvite(false);
        newWindow = window.open("", "_blank", "width=800,height=600");
        console.log("check log checkCandidateEligibility", result);
        newWindow.location.href = data.data.inviteUrl;
        if (newWindow) {
          newWindow.focus();
          setLoader(true);
          startWindowCheckPolling();
        } else {
          alert(
            "Popup blocked! Please allow popups to attemp the asseessment."
          );
          document.getElementById("popupBlockedMessage").style.display =
            "block";
          document.getElementById("mainContent").style.display = "none";
        }
      }
    } catch (error) {
      console.log("error....", error);
    }
  };

  const pollingRef = useRef(null);
  function startWindowCheckPolling() {
    setLoader(true);
    pollingRef.current = setInterval(async () => {
      setLoader(true);

      if (!breakExamExecution) {
        await checkExamStatus();
      } else {
        console.log("Exam completed → Polling stopped");
        clearInterval(pollingRef.current);
        return;
      }

      if (newWindow && newWindow.closed) {
        setLoader(false);
        clearInterval(pollingRef.current);
      } else if (!newWindow) {
        setLoader(false);
        clearInterval(pollingRef.current);
      }
    }, 5000);
  }

  //3. Frequently check exam done or not when user want to try to attempt exam (candidate details)
  async function checkExamStatus() {
    const payloadExam = {
      email: localData?.email,
      assessment: selectedSkill,
    };
    // setLoader(true)
    // Step 1️⃣: Check Exam Status
    const examData = await checkExam(payloadExam).unwrap();
    const { data } = examData;
    const status = data?.status;

    console.log(data?.status, "check log  examData.......", examData);
    if (status === "completed") {
      //TODO add more checks to verify that test is actually completed
      setBreakExamExecution(true)
      // stop polling immediately
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }

      await fetchAssessmentDetailsResultInPdf({
        email: localData?.email,
        assessment: data?.assessment_name,
      }).unwrap();
      window.location.replace(
        `/user-result?assessment=${data?.assessment_name}`
      );
    }
    return {
      status: data?.status,
      assessmentName: examData?.data?.assessment_name,
    };
  }

  function getLatestAndPreviousAttempts(dataArray) {
    if (!Array.isArray(dataArray)) return {};
    const sorted = [...dataArray].sort(
      (a, b) => new Date(b.started_at) - new Date(a.started_at)
    );
    return {
      latest: sorted[0] ?? null,
      previous: sorted[1] ?? null,
    };
  }

  const scoreData = getLatestAndPreviousAttempts(
    candidateEligibilityData?.data?.data?.previousResultData
  );

  const isModalValid = Boolean(
    modalCat && modalSkill && modalTouched.cat && modalTouched.skill
  );
  const modalBusy = Boolean(
    modalSubmitting ||
      isLoading ||
      isLoadingInviteCandidate ||
      isLoadingCheckExam ||
      isLoadingDeleteCandidate ||
      isLoadingResult ||
      loader
  );

  // reset modal-local state to initial defaults
  const resetModalState = () => {
    setModalCat(AssessmentData[0].id);
    setModalSkill(AssessmentData[0].items[0]);
    setModalTouched({ cat: false, skill: false });
    setModalErrors({});
    setModalSubmitting(false);
  };

  const closeModal = () => {
    if (modalBusy) return; // do not close while busy
    resetModalState();
    setModalOpen(false);
  };

  if (
    isLoadingCheckExam ||
    isLoadingInviteCandidate ||
    isLoadingDeleteCandidate ||
    isLoadingResult ||
    loader
  ) {
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
                  isLoading={isLoading}
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

          {/* Dialog for skill check */}
          <section
            className={`modal ${modalOpen ? "open" : ""}`}
            id="skillsModal"
            aria-hidden={!modalOpen}
            role="dialog"
            aria-labelledby="mTitle"
            onClick={(e) => {
              if (e.target.classList?.contains("backdrop") && !modalBusy)
                setModalOpen(false);
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
                  onClick={() => !modalBusy && setModalOpen(false)}
                  disabled={modalBusy}
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
                        setModalTouched((p) => ({ ...p, cat: true }));
                      }}
                    />
                    {modalErrors?.cat && (
                      <p
                        className="error"
                        style={{ color: "#d32f2f", marginTop: 6 }}
                      >
                        {modalErrors.cat}
                      </p>
                    )}
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
                      onChange={(v) => {
                        setModalSkill(v);
                        setModalTouched((p) => ({ ...p, skill: true }));
                      }}
                    />
                    {modalErrors?.skill && (
                      <p
                        className="error"
                        style={{ color: "#d32f2f", marginTop: 6 }}
                      >
                        {modalErrors.skill}
                      </p>
                    )}
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
                  onClick={() => !modalBusy && setModalOpen(false)}
                  disabled={modalBusy}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  type="button"
                  id="mStart"
                  onClick={() => {
                    if (modalBusy) return;
                    startQuickCheck();
                  }}
                  disabled={!isModalValid || modalBusy}
                >
                  {modalBusy ? <>Start Check</> : "Start Check"}
                </button>
              </footer>
            </div>
          </section>

          {/* Dialog for take assessment */}
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
                <h4 className="text-[14px]" style={{ textAlign: "center" }}>
                  Important
                </h4>
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
                {candidateEligibilityData?.data?.data?.attempts === 0 && (
                  <>
                    <h4 style={{ m: 0 }}>
                      Candidate is eligible to take the test
                    </h4>
                    <ul style={{ m: 0 }}>
                      <li>
                        Please enable pop-ups in your browser to ensure all
                        features of this application work smoothly.
                      </li>
                      <li>
                        The assessment cannot be paused once started; you must
                        complete it in one go.
                      </li>
                      <li>
                        If paused midway, the assessment will be marked
                        incomplete, and your score will only reflect the parts
                        you've completed.
                      </li>
                      <li>
                        The length of the assessment varies, ranging from 10 to
                        40 minutes
                      </li>
                    </ul>
                  </>
                )}
                {candidateEligibilityData?.data?.data?.attempts === 1 && (
                  <div
                    style={{
                      display: "block",
                      gap: "10px",
                      justifySelf: "center",
                    }}
                  >
                    <ul style={{ m: "0 !important" }}>
                      <li>
                        Please enable pop-ups in your browser to ensure all
                        features of this application work smoothly.
                      </li>
                      <li>
                        The assessment cannot be paused once started; you must
                        complete it in one go.
                      </li>
                      <li>
                        If paused midway, the assessment will be marked
                        incomplete, and your score will only reflect the parts
                        you've completed.
                      </li>
                      <li>
                        The length of the assessment varies, ranging from 10 to
                        40 minutes
                      </li>
                    </ul>
                    <div
                      className=""
                      style={{
                        display: "flex",
                        gap: "10px",
                        justifySelf: "center",
                      }}
                    >
                      {candidateEligibilityData?.data?.data?.previousResultData?.map(
                        (item) => {
                          return (
                            <div
                              className="scorecard-box"
                              style={{
                                width: "250px",
                                height: "180px",
                                background: "#fff",
                                borderRadius: "10px",
                                justifySelf: "center",
                              }}
                            >
                              <h3
                                className=" text-[10px]"
                                style={{ textAlign: "center" }}
                              >
                                Last Assesment Score
                              </h3>
                              <div
                                className="result-score"
                                style={{
                                  textAlign: "center",
                                  top: "5px",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    color: theme.palette.primary.main,
                                    fontSize: "40px",
                                  }}
                                >
                                  {item?.["result_info.score"] ?? 0}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                    <Typography
                      variant="inherit"
                      sx={{ py: "10px", textAlign: "center" }}
                    >
                      Would you like to take the assessment again?
                    </Typography>
                  </div>
                )}
                {candidateEligibilityData?.data?.data?.attempts === 2 && (
                  <>
                    <Typography variant="subtitle1">
                      You have reached the maximum number of attempts
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        justifySelf: "start",
                      }}
                    >
                      {Object.entries(scoreData)?.map(([key = "", value]) => {
                        console.log(key, "key.....value", value);
                        return (
                          <div
                            className="scorecard-box"
                            style={{
                              width: "250px",
                              height: "180px",
                              background: "#fff",
                              borderRadius: "10px",
                            }}
                          >
                            <h3 className="" style={{ textAlign: "center" }}>
                              {key.replace(/^./, (c) => c.toUpperCase())} Score
                            </h3>
                            <div
                              className="result-score"
                              style={{
                                textAlign: "center",
                                top: "5px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  color: theme.palette.primary.main,
                                  fontSize: "40px",
                                }}
                              >
                                {value?.["result_info.score"] ?? 0}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
              <footer className="go-btn">
                {candidateEligibilityData?.data?.data?.attempts !== 2 && (
                  <>
                    {!isLoadingInvite ? (
                      <Button
                        sx={{ color: theme.palette.primary.main }}
                        variant="contained"
                        onClick={handleClickGo}
                      >
                        Go
                      </Button>
                    ) : (
                      <CircularProgress />
                    )}
                  </>
                )}
              </footer>
            </div>
          </section>
        </main>
      </div>
    </LandingLayoutPage>
  );
}
