import { Box, Divider, Typography } from "@mui/material";

const Settings = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        width: "100%",
        padding: { xs: "1rem", md: "1rem 2rem 2rem 2rem", overflow: "hidden" },
        background: "rgb(35,35,48)",
        height: "auto",
        color: "white",
      }}
    >
      <Box sx={{ padding: "8px" }}>
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", mb: 1.5 }}
        >
          Settings
        </Typography>
        <Divider
          variant="middle"
          sx={{ background: "rgb(120,120,126)", margin: "1rem 0 1.5rem 0" }}
        />
      </Box>
    </Box>
  );
};

export default Settings;
