## 🗂️ Product Backlog (Markdown Format)

### 📩 Use Case 1 – “Flag Automatable Emails”

#### 🧑‍💻 Feature: Flag an email as a candidate for automation

**User Story 1.1 – Prompt user to flag emails**  
As a user, I want to be asked if an email is something the assistant should help with, so I can contribute to improving the system.

- [ ] A visible prompt appears: “Is this an email we should be able to help you with?”
- [ ] A button is provided: “Yes, this one’s a good candidate”
- [ ] Clicking the button expands to show a follow-up form

**User Story 1.2 – Capture automation reasoning**  
As a user, I want to indicate why an email should be automated, so the system can learn which tasks are burdensome.

- [ ] User is presented with multiple-choice options:
  - I get too many like this
  - It’s hard to answer well
  - It’s repetitive admin
  - Other (free text)
- [ ] Submit button sends response to a logging endpoint or mock handler
- [ ] A brief “Thank you” message appears on submission

---

### 🧠 Use Case 2 – “Suggest a Response”

#### 🧑‍💻 Feature: Display AI-generated email response suggestions

**User Story 2.1 – Prompt user to view suggested response**  
As a user, I want to be offered a suggested reply to the current email, so I can work faster and avoid repetitive drafting.

- [ ] Sidebar shows: “Would you like a suggested response?”
- [ ] A short explanation is shown: “We’ve drafted a quick reply you can use or tweak.”
- [ ] Suggested reply is rendered in a readable box

**User Story 2.2 – Insert suggestion into Outlook reply**  
As a user, I want to insert the AI-generated response into a reply email, so I can send or edit it quickly.

- [ ] Clicking “Insert into Reply” opens a new Outlook reply with the response prefilled
- [ ] The user can review and edit before sending
- [ ] Inserted responses are logged for analysis

**User Story 2.3 – Give feedback on unhelpful responses**  
As a user, I want to flag unhelpful AI responses, so the system can improve.

- [ ] “Not Helpful” button logs the feedback
- [ ] A small acknowledgement (e.g., toast) is shown after clicking
- [ ] No follow-up form required in MVP