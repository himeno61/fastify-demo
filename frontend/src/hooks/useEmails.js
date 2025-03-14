import { useState } from "react";

const useEmails = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const fetchEmails = async () => {
    try {
      const response = await fetch("http://localhost:3001/emails", {
        headers: { Accept: "application/json" },
      });
      const data = await response.json();
      setEmails(data);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  const fetchEmailDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/emails/${id}`, {
        headers: { Accept: "application/json" },
      });
      const data = await response.json();
      setSelectedEmail(data);
    } catch (error) {
      console.error("Error fetching email details:", error);
    }
  };

  return {
    emails,
    setEmails,
    selectedEmail,
    fetchEmails,
    fetchEmailDetails,
  };
};

export default useEmails;
