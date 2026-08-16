# CV Generator

A responsive CV builder created with React. Users can enter their personal
information, education and professional experience, preview the resulting CV,
and export it as an A4 PDF.

This project was created as part of
[The Odin Project — CV Application](https://www.theodinproject.com/lessons/node-path-react-new-cv-application)
lesson.

## Live Demo

Deployment is coming soon on Vercel.

[View the live application](https://YOUR-VERCEL-PROJECT.vercel.app)

Replace this placeholder with the actual Vercel deployment URL after the first
deployment.

## Features

- Multi-step CV creation process
- Personal information form
- Multiple education and professional experience entries
- Add and remove individual entries
- Step completion and navigation system
- Final review with edit buttons
- Live A4 CV preview
- PDF export using the browser print system
- Responsive interface for desktop and mobile
- Accessible labels and semantic form elements

## Built With

- [React 19](https://react.dev/)
- [Vite 8](https://vite.dev/)
- JavaScript and JSX
- CSS
- React state and props
- Web Crypto API for unique entry identifiers
- CSS `@media print` and `window.print()` for PDF export
- [ESLint](https://eslint.org/)

No UI framework or PDF generation library is used.

## How It Works

The application state is managed in the main `App` component and passed to the
form, review and preview components through props.

```text
App state
├── Personal information
├── Education entries
├── Experience entries
└── Completed steps
        ↓
Forms and final review
        ↓
A4 CV preview
        ↓
Browser PDF export
```

The forms use controlled inputs. Each input reads its value from React state
and sends changes back to `App`.

Education and experience entries are stored as arrays. Every entry receives a
unique identifier through `crypto.randomUUID()`, allowing individual entries
to be updated or removed safely.

## PDF Export

The CV is exported using the browser's native print functionality:

```js
window.print()
```

A dedicated print stylesheet hides the application interface, keeps only the
CV preview, applies A4 dimensions and avoids splitting individual entries
across pages. The user can then select **Save as PDF** in the browser print
dialog. This approach keeps the document text sharp and selectable.

## Getting Started

### Prerequisites

Install a recent version of [Node.js](https://nodejs.org/).

### Installation

Clone the repository:

```bash
git clone https://github.com/adrienrouland-cmyk/CV-Generator.git
```

Open the project and install its dependencies:

```bash
cd CV-Generator
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at the local URL displayed by Vite, usually
`http://localhost:5173/`.

## Available Scripts

```bash
npm run dev      # Start the development server
npm run lint     # Check the code with ESLint
npm run build    # Create a production build
npm run preview  # Preview the production build locally
```

## Project Structure

```text
src/
├── components/
│   ├── CVPreview.jsx
│   ├── EducationForm.jsx
│   ├── ExperienceForm.jsx
│   ├── FinalReview.jsx
│   ├── PersonalInfoForm.jsx
│   └── Stepper.jsx
├── styles/
│   └── print.css
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## Learning Objectives

This project focuses on the React concepts introduced by The Odin Project:

- Creating and composing components
- Managing state with `useState`
- Passing data and callbacks through props
- Working with controlled form elements
- Updating objects and arrays immutably
- Rendering lists with stable keys
- Conditionally rendering components
- Sharing state between forms and previews

## Future Improvements

- Persist CV data with `localStorage`
- Add multiple CV templates
- Add customizable colors and typography
- Add drag-and-drop section ordering
- Improve validation and error messages
- Add optional profile pictures
- Support additional languages
- Deploy the application to Vercel

## Author

Created by [Adrien Rouland](https://github.com/adrienrouland-cmyk) as part of
[The Odin Project](https://www.theodinproject.com/).
