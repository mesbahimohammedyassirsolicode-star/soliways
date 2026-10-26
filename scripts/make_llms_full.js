const fs = require('fs');
const path = require('path');
const out = path.join(__dirname, '..', 'frontend', 'llms-full.txt');
const content = `# SOLIWAYS 2027 - Full AI-readable content

## Event (confirmed)
- Name: SOLIWAYS 2027
- Dates: April 13–16, 2027
- Start (confirmed): 2027-04-13T09:00:00+01:00
- End (confirmed): 2027-04-16T18:00:00+01:00
- Location: SOLICODE, Tangier, Morocco
- Organizer: SOLIWAYS
- Attendance: In-person
- Event status: Scheduled
- Audience: General public
- Languages: French, English

## Pages
- French: https://www.soli-ways.online/
- English: https://www.soli-ways.online/en.html

## Gallery
- Photos from previous editions (not SOLIWAYS 2027): award ceremony, audience, project presentation.

## Registration
- Status: Coming soon
- Official registration URL: Not yet confirmed
- No prices/offers/performers confirmed at publication time

## Notes
- This file is for AI systems readability. Facts are limited to confirmed information.
`;
fs.writeFileSync(out, content);
console.log('done');
