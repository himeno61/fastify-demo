import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Autocomplete,
  Chip,
} from "@mui/material";

export default function ComposeEmailDialog({ open, onClose, onEmailSent }) {
  const [emailData, setEmailData] = useState({
    to: [],
    cc: [],
    bcc: [],
    subject: "",
    body: "",
  });

  const handleEmailChange = (field, value) => {
    setEmailData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setEmailData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/);
  };

  const isFormValid = () => {
    return (
      emailData.to.length > 0 &&
      emailData.to.every(validateEmail) &&
      emailData.subject.trim() !== "" &&
      emailData.body.trim() !== ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        onClose();
        setEmailData({
          to: [],
          cc: [],
          bcc: [],
          subject: "",
          body: "",
        });
        onEmailSent(); // Call the refresh function after successful submission
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const renderEmailField = (field, label, required = false) => (
    <Autocomplete
      multiple
      freeSolo
      options={[]}
      value={emailData[field]}
      onChange={(_, newValue) => handleEmailChange(field, newValue)}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => {
          const { key, ...chipProps } = getTagProps({ index });
          const isValid = validateEmail(option);
          return (
            <Chip
              key={key}
              {...chipProps}
              label={option}
              color={isValid ? "primary" : "error"}
              title={isValid ? "" : "Invalid email format"}
            />
          );
        })
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          required={required}
          placeholder="Enter email addresses"
          error={field === "to" && emailData.to.length === 0}
          helperText={
            field === "to" && emailData.to.length === 0
              ? "At least one recipient is required"
              : ""
          }
          inputProps={{
            ...params.inputProps,
            "aria-label": label,
            "data-novalidate": true,
          }}
        />
      )}
    />
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Compose Email</DialogTitle>
      <form onSubmit={handleSubmit} noValidate>
        <DialogContent>
          <Stack spacing={2}>
            {renderEmailField("to", "To", true)}
            {renderEmailField("cc", "CC")}
            {renderEmailField("bcc", "BCC")}
            <TextField
              fullWidth
              label="Subject"
              name="subject"
              value={emailData.subject}
              onChange={handleTextChange}
              required
            />
            <TextField
              fullWidth
              label="Body"
              name="body"
              value={emailData.body}
              onChange={handleTextChange}
              required
              multiline
              rows={8}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isFormValid()}
          >
            Send
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
