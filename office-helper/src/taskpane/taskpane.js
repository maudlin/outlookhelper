document.addEventListener('DOMContentLoaded', () => {
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
    alert('Thanks! We’ll use your feedback to get better.');

    reasonForm.classList.add('hidden');
    document.querySelectorAll('input[name="reason"]').forEach(input => input.checked = false);
    otherTextInput.value = '';
  });

  // === Insert Suggested Response ===
  insertBtn.addEventListener('click', () => {
    const reply = suggestionBox.innerText;

    Office.context.mailbox.displayNewMessageForm({
      toRecipients: [],
      subject: 'RE: ' + Office.context.mailbox.item.subject,
      htmlBody: reply,
    });

    console.log('📤 Suggested reply inserted:', reply);
  });

  // === Feedback: Not Helpful ===
  notHelpfulBtn.addEventListener('click', () => {
    console.log('❌ User marked suggestion as not helpful.');
    alert('Thanks, we’ll use your feedback to improve.');
  });
});
