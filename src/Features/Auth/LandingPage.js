import { Box, Paper, Typography } from "@mui/material";
const HIGH_FIVE_IMAGE =
  "https://portal.employabilityadvantage.com/assets/images/highFive.png";

const MainLandingPage = () => {
  return (
    <>
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
              maxWidth: "400px",
              mb: 2,
              "@media (max-width: 900px)": {
                textAlign: "center",
              },
            }}
          >
            Employability Advantage
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
