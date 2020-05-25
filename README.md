- [feeels](#feeels)

  - [Features to add](#features-to-add)
    - [account](#account)
    - [entry management](#entry-management)
    - [emotion selection](#emotion-selection)
    - [UI](#ui)

# feeels

For checking in with yourself.

Built using React + Next, MongoDB, emotion, Theme-UI, with serverless auth supported by Passport.

## Features to add

### account

- [x] User can reset password
- [x] User can validate email
- [x] User can change email
- [x] User can delete their account
- [x] Password length / form requirements
- [ ] Email for profile updates

### entry management

- [ ] User can edit entries
- [ ] User can delete entries
- [ ] User can choose visibility of entries

### emotion selection

- [x] User sees a sunburst view of all emotions at once
- [ ] User can select multiple emotions

### UI

- [ ] sunburst drop shadow: http://bl.ocks.org/cpbotha/5200394
- [ ] sunburst colors
- [ ] sunburst circle expands to fill space
- [ ] Forms with https://jaredpalmer.com/formik/ (https://chakra-ui.com/formcontrol#usage-with-form-libraries)

### Bugs

- [x] Delete account still shows a logged in user
- [x] Emotion form error when signing up
- [ ] Email links funky
- [ ] sunburst form displaced before sunburst loads
