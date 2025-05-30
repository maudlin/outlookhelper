Office.onReady(function(info) {
  // === Elements ===
  const flagBtn = document.getElementById('flag-btn');
  const reasonForm = document.getElementById('reason-form');
  const submitReason = document.getElementById('submit-reason');
  const insertBtn = document.getElementById('insert-btn');
  const notHelpfulBtn = document.getElementById('not-helpful-btn');
  const suggestionBox = document.getElementById('suggestion-box');
  const otherTextInput = document.getElementById('other-text');

  // === Reveal Reason Form ===
  flagBtn.addEventListener('click', () => {
    reasonForm.classList.remove('hidden');
  });

  // === Submit Reason ===
  submitReason.addEventListener('click', () => {
    const selected = document.querySelector('input[name="reason"]:checked');
    const reason = selected ? selected.value : null;
    const other = otherTextInput.value.trim();

    const payload = {
      reason: reason === 'other' ? other : reason,
      timestamp: new Date().toISOString(),
    };

    console.log('🚀 Automation feedback submitted:', payload);
    alert('Thanks! We&apos;ll use your feedback to get better.');

    reasonForm.classList.add('hidden');
    document.querySelectorAll('input[name="reason"]').forEach(input => input.checked = false);
    otherTextInput.value = '';
  });

  // === Insert Suggested Response ===
  insertBtn.addEventListener('click', () => {
    const reply = suggestionBox.innerText;
    let toRecipients = [];

    if (Office.context.mailbox.item) {
      if (Office.context.mailbox.item.from && Office.context.mailbox.item.from.emailAddress) {
        toRecipients = [Office.context.mailbox.item.from.emailAddress];
      } else if (Office.context.mailbox.item.sender && Office.context.mailbox.item.sender.emailAddress) {
        toRecipients = [Office.context.mailbox.item.sender.emailAddress];
      }
    }

    Office.context.mailbox.displayNewMessageForm({
      toRecipients: toRecipients,
      subject: 'RE: ' + (Office.context.mailbox.item ? Office.context.mailbox.item.subject : "Suggested Reply"),
      htmlBody: reply,
    });

    console.log('📤 Suggested reply inserted for recipients:', toRecipients, 'with reply:', reply);
  });

  // === Feedback: Not Helpful ===
  notHelpfulBtn.addEventListener('click', () => {
    console.log('❌ User marked suggestion as not helpful.');
    alert('Thanks, we&apos;ll use your feedback to improve.');
  });

  // Function to retrieve the body of the current email
  function getEmailBody() {
    // Check if an email item is selected
    if (!Office.context.mailbox.item) {
      suggestionBox.innerText = "Please select or open an email to see suggestions.";
      console.log("getEmailBody: No email item selected or available.");
      return;
    }

    Office.context.mailbox.item.body.getAsync("text", function(result) {
      if (result.status === Office.AsyncResultStatus.Succeeded) {
        const emailBodyText = result.value;
        console.log("Email Body (Plain Text):");
        console.log(emailBodyText);

        // Initially set suggestion box to loading
        suggestionBox.innerText = "Loading suggestion...";

        getLLMSuggestion(emailBodyText)
          .then(suggestion => {
            suggestionBox.innerText = suggestion;
          })
          .catch(error => {
            console.error("Error displaying suggestion:", error);
            suggestionBox.innerText = "Failed to load suggestion.";
          });
      } else {
        console.error("Failed to get email body: " + result.error.message);
        suggestionBox.innerText = "Failed to load email body."; // Also update UI
      }
    });
  }

  // Get the email body and then the suggestion when the add-in is ready
  getEmailBody();
});

// Function to get LLM suggestion
async function getLLMSuggestion(emailContent) {
  const apiUrl = "https://api.example-azure-ai-foundry.com/llm/suggest-reply";
  const requestBody = {
    emailText: emailContent
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.suggestion) {
        return data.suggestion;
      } else {
        console.error("LLM suggestion not found in response:", data);
        throw new Error("LLM suggestion not found in response.");
      }
    } else {
      console.error("Failed to get LLM suggestion. Status:", response.status);
      throw new Error(`Failed to get LLM suggestion. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching LLM suggestion:", error);
    // Rethrow the error to ensure the promise returned by getLLMSuggestion rejects
    throw new Error("Error fetching LLM suggestion: " + error.message);
  }
}
