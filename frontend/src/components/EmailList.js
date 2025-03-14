import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";

const EmailList = ({ emails, selectedEmailId, onEmailSelect }) => {
  return (
    <List
      sx={{
        flexGrow: 1,
        overflow: "auto",
        width: 300,
        maxWidth: 300,
        "& .MuiListItemButton-root": {
          width: "100%",
        },
        "& .MuiListItemText-root": {
          width: "100%",
          overflow: "hidden",
        },
      }}
    >
      {emails.map((email) => (
        <ListItemButton
          key={email.id}
          selected={selectedEmailId === email.id}
          onClick={() => onEmailSelect(email.id)}
          sx={{
            display: "block",
            "&:hover": { bgcolor: "action.hover" },
          }}
        >
          <ListItemText
            primary={email.subject}
            secondary={
              <Box component="span">
                <Typography
                  component="span"
                  variant="body2"
                  color="text.primary"
                  display="block"
                  noWrap
                >
                  {email.from}
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                  noWrap
                >
                  {email.preview}
                </Typography>
              </Box>
            }
          />
          <Divider />
        </ListItemButton>
      ))}
    </List>
  );
};

export default EmailList;
