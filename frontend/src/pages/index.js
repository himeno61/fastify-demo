import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Fab,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import ComposeEmailDialog from "@/components/ComposeEmailDialog";
import EmailList from "@/components/EmailList";
import EmailDetail from "@/components/EmailDetail";
import useEmails from "@/hooks/useEmails";
import useEmailSearch from "@/hooks/useEmailSearch";

export default function Home() {
  const { emails, setEmails, selectedEmail, fetchEmails, fetchEmailDetails } =
    useEmails();
  const { searchText, setSearchText, debouncedSearch } = useEmailSearch(
    (results) => {
      if (results === null) {
        fetchEmails();
      } else {
        setEmails(results);
      }
    }
  );
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  useEffect(() => {
    fetchEmails();

    const interval = setInterval(() => {
      fetchEmails();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleSearchChange = (event) => {
    const text = event.target.value;
    setSearchText(text);
    debouncedSearch(text);
  };

  const handleClearSearch = () => {
    setSearchText("");
    fetchEmails();
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", position: "relative" }}>
      <Paper
        sx={{
          width: 300,
          overflow: "auto",
          borderRight: 1,
          borderColor: "divider",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search emails..."
            value={searchText}
            onChange={handleSearchChange}
            sx={{ mb: 1 }}
            InputProps={{
              endAdornment: searchText ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="clear search"
                    onClick={handleClearSearch}
                    edge="end"
                    size="small"
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
          />
        </Box>
        <EmailList
          emails={emails}
          selectedEmailId={selectedEmail?.id}
          onEmailSelect={fetchEmailDetails}
        />
      </Paper>

      <Box sx={{ flexGrow: 1, p: 3 }}>
        <EmailDetail email={selectedEmail} />
      </Box>

      <Fab
        color="primary"
        aria-label="compose"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
        onClick={() => setIsComposeOpen(true)}
      >
        <EditIcon />
      </Fab>

      <ComposeEmailDialog
        open={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        onEmailSent={fetchEmails}
      />
    </Box>
  );
}
