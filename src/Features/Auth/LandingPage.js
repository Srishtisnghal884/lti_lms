import { Box, Button, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuthenticationQuery } from "../CareerChoice/AuthSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "./AuthSlice";
import MainLogo from "../../common/logo";
import Loading from "../../Components/Loading";
const HIGH_FIVE_IMAGE =
  "https://portal.employabilityadvantage.com/assets/images/highFive.png";

const MainLandingPage = () => {
  const [searchParams] = useSearchParams();
  const authToken = searchParams.get("auth");
  const dispatch = useDispatch();
  
  // const { data, isLoading, isSuccess, isError, error } = useAuthenticationQuery(
  //   { auth: authToken }
  // );
    const {
    data,
    isLoading,
    isError,
    error,
  } = useAuthenticationQuery(
    { auth: authToken },
    { skip: !authToken } // ✅ prevent call if no token
  );

  useEffect(() => {
  if (data?.tokens?.access?.token) {
    localStorage.setItem("userData", JSON.stringify(data.user));
    dispatch(setCredentials(data.tokens.access));
  }
}, [data, dispatch]);

const logoData =
  data?.user || JSON.parse(localStorage.getItem("userData"));


if (isError) {
}
  return (
    <>
    <Loading open={isLoading} />
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          width: "100vw",
        }}
      >
        <Box
          sx={{
            flex: "0 0 55%",
            backgroundColor: "#182958",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
            position: "relative",
            boxSizing: "border-box",
            "@media (max-width: 900px)": {
              flex: "0 0 100%",
              padding: "0px !important",
            },
          }}
        >
          <Typography
            variant="h3"
            component="h3"
            sx={{
              color: "white",
              fontWeight: 500,
              textAlign: "left",
              width: "100%",
              maxWidth: "600px",
              mb: 2,
              "@media (max-width: 900px)": {
                textAlign: "center",
              },
            }}
          >
           <MainLogo height={60} width={'auto'} />
           <br/>
           
              {/* <Button variant="contained" color="error"   onClick={() => {
    window.location.href = "https://www.openlearning.com";
  }}>
                Unauthorized User
              </Button> */}
           {error?.data?.message === "Invalid or expired login token" ? (<>
              <Typography
                sx={{
                  fontSize: "16px !important",
                  color: "#fff",
                  textAlign: "left",
                  mt: 2,
                }}
              >
               You do not have permission to view this page.{" "}
                <Typography
                  component="a"
                  href="https://www.openlearning.com/employability-advantage/"
                  sx={{
                    fontSize: "16px !important",
                    color: "#FFA726",
                    textDecoration: "none",
                    ml: 1,
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Click here
                </Typography>
                </Typography>
                </>
            ):(<>  
            <Button variant="contained" color="error" onClick={() => window.location.reload()}>
                Retry
              </Button>
              <Typography
                sx={{
                  fontSize: "16px !important",
                  color: "#fff",
                  textAlign: "left",
                  mt: 2,
                }}
              >
                If the issue persists, please contact our Support Team for assistance.{" "}
                <Typography
                  component="a"
                  href="https://employabilityadvantage.com/contact-us/"
                  sx={{
                    fontSize: "16px !important",
                    color: "#FFA726",
                    textDecoration: "none",
                    ml: 1,
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Click here
                </Typography>
              </Typography>
              </>

              )}
           <br/>
           {/* <Button  variant="contained"> Try Again</Button> */}
          </Typography>
          <Paper sx={{ backgroundColor: "#182958" }} elevation={3}>
            {/* <LoginFormModal /> */}
          </Paper>
        </Box>
        {/* Right Section: Image and Orange Hexagon */}
        <Box
          sx={{
            flex: "0 0 45%",
            position: "relative",
            overflow: "hidden",
            "@media (max-width: 900px)": {
              display: "none",
            },
          }}
        >
          <Box
            component="img"
            src={HIGH_FIVE_IMAGE}
            alt="People high-fiving"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: "-20%",
              width: "80%",
              height: "100%",
              backgroundColor: "rgba(255, 120, 0, 0.7)",
              clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
              zIndex: 1,
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default MainLandingPage;
