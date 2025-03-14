import { Box, Typography } from "@mui/material";

const EmailDetail = ({ email }) => {
  if (!email) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Select an email to read
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 800,
        margin: "0 auto",
        padding: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        {email.subject}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        From: {email.from}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Date: {new Date(Date.parse(email.created_at)).toLocaleString()}
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        {email.body}
      </Typography>
    </Box>
  );
};

export default EmailDetail;
