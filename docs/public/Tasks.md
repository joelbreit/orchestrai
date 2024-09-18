# Tasks

## Bugs

- [ ] This composition caused an infinite loop with the cleanup code: m0wtjbep
- [ ] Clean up report
- [ ] When API fails, you should stop it right away instead of continueing the progress bar for 2ish minutes
- [ ] Audio stops working in tabs after a while
- [x] ABC editor limits height (scrolls) but ABC formatter does not
- [ ] Have tried to set min-height for formatted ABCBlock component, but it gets overridden somehow

## Features

- [ ] Workflow capability (brainstorming -> composing -> feedback -> cleanup)
- [ ] Easy feedback right away (awful, poor, fine, good, incredible)
- [ ] Easy reporting right away (notation broken (timing), notation broken (other), 
- [ ] Live tracking of users / compositions in past day etc
- [ ] Personal stats
  - [ ] You've created x compositions. That's more than y% of users.
  - [ ] You joined on x date making you the yth user out of z.
- [ ] Ability to use other LLMs
- [ ] 2 compositions per attempt
- [ ] Make private/public functionality
- [ ] Site-wide small modal for live update of in-progress compositions
- [ ] Standardize format of compositions (description always hidden, etc)
- [ ] Allow commenting on compositions
- [ ] Recent compositions feed
- [ ] Give the user a hint to unmute their mobile device if they can't hear anything
- [ ] Add "Add LLM to improve this composition" button
- [ ] "Keep me logged in" checkbox
- [ ] Ability to load more tunes on profile page
- [ ] Enable "Edit Profile" button
- [ ] Replace with clipboard button in ABC Input component
- [ ] Allow other import/export formats
- [ ] Ability to upload MIDI/XML files

## Changes

- [ ] Invite only
- [ ] Allow non-logged in users to create some public compositions
- [ ] De-fun-ify the site (remove emojis, orcas)
- [ ] New domain name?

## Refactors

- [ ] Move Lambda functions to folders
- [ ] Organize components into folders
- [ ] Create page component
- [ ] Rename ABC components

## Ideas

- [ ] Move all buttons for ABC text editor/formatter to a toolbar

## Explore

- [ ] https://github.com/fuhton/react-abc

## Research

- [ ] Can LLMs reproduce existing music?
- [x] Clean up research rubric
- [ ] Archive old Reseach component and rubric
- [ ] Create page or tab for ABC vs note-duration pair comparisons and link in research