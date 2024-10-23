# Tasks

## Bugs

- [ ] This composition caused an infinite loop with the cleanup code: m0wtjbep
- [x] Clean up report
- [ ] When API fails, you should stop it right away instead of continueing the progress bar for 2ish minutes
- [ ] Audio stops working in tabs after a while
- [ ] Music keeps playing when you navigate away
- [x] ABC editor limits height (scrolls) but ABC formatter does not
- [x] Have tried to set min-height for formatted ABCBlock component, but it gets overridden somehow
- [x] Shows "Enter a vibe above to generate music." for easy compose tab
- [ ] Notations aren't getting cleaned (e.g. m1cmysxk)
- [ ] m1cmysxk gets cleaned incorrectly (removes note instead of adding one)
- [x] Article PDF doesn't show completely on mobile
- [ ] Prompt textarea doesn't expand to fit text when lines wrap
- [ ] notation mechanic removes `abc` at beginning, and trailing lyric lines

## Features

- [ ] Workflow capability (brainstorming -> composing -> feedback -> cleanup)
- [ ] Easy feedback right away (awful, poor, fine, good, incredible)
- [ ] Easy reporting right away (notation broken (timing), notation broken (other), 
- [ ] Live tracking of users / compositions in past day etc
- [ ] Personal stats
  - [ ] You've created x compositions. That's more than y% of users.
  - [ ] You joined on x date making you the yth user out of z.
- [x] Ability to use other LLMs
- [ ] 2 compositions per attempt
- [ ] Make private/public functionality
- [ ] Site-wide small modal for live update of in-progress compositions
- [ ] Standardize format of compositions (description always hidden, etc)
- [ ] Allow commenting on compositions
- [ ] Recent compositions feed
- [ ] Give the user a hint to unmute their mobile device if they can't hear anything
- [ ] Add "Ask LLM to improve this composition" button
- [ ] "Keep me logged in" checkbox
- [ ] Ability to load more tunes on profile page
- [ ] Enable "Edit Profile" button
- [x] Replace with clipboard button in ABC Input component
- [ ] Allow other import/export formats
- [ ] Ability to upload MIDI/XML files
- [ ] Bring back spacebar to play/pause feature
- [ ] Highlight notation when notes selected
- [ ] Allow dragging of notes on paper
- [ ] Add follow-up ability to send message to same chat thread
- [x] Switch Layout button
- [ ] Dark mode
- [ ] Export to PDF
- [ ] Format ABC so that measures line up across voices
- [ ] "Discourage lyrics, pickup measures, and percussion" checkbox(es)
- [ ] Number of voices/measures dropdowns
- [x] Keep Paste button in edit mode
- [x] Add a Copy button as well
- [x] Exit ABC notation box after successfully pasteing
- [ ] Uncleaned notation tab in viewer
- [ ] Load more compositions on profile page
- [ ] Immediately viewable fix, warning, and normalization counts

### Notation Mechanic

- [x] Improve tool
- [x] Add repair button to ABC formatter
- [ ] Complete TODOs
- [ ] Include normalizations, fixes, and warnings on the page
- [ ] Rename to "Notation Mechanic"

## Changes

- [ ] Invite only
- [x] Allow non-logged in users to create some public compositions
- [x] De-fun-ify the site (remove emojis, orcas)
- [ ] New domain name?
- [x] Move description to below even when first composing

## Refactors

- [ ] Move Lambda functions to folders
- [ ] Organize components into folders
- [ ] Create page component
- [x] Rename ABC components
- [ ] Rename/organize styles files

## Ideas

- [x] Move all buttons for ABC text editor/formatter to a toolbar

## Explore

- [ ] https://github.com/fuhton/react-abc

## Research

- [ ] Can LLMs reproduce existing music?
- [x] Clean up research rubric
- [ ] Archive old Reseach component and rubric
- [ ] Create page or tab for ABC vs note-duration pair comparisons and link in research

## Upgrades

- [ ] Use TypeScript
- [ ] Use Tailwind CSS