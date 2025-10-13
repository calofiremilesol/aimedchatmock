# Medical AI Chat Application

A modern React-based medical AI chat application built with TypeScript, Vite, and ShadCN UI components. This application provides an intelligent interface for healthcare professionals to interact with patient medical records through an AI assistant.

## Features

### 🩺 Patient Medical Summary
- Comprehensive patient information display
- Medical history with allergies and chronic conditions
- Current medications with dosages and prescribing doctors
- Recent vital signs and measurements
- Laboratory test results with reference ranges
- Recent visits and appointments

### 🤖 AI Chat Assistant
- Intelligent medical record analysis
- Context-aware responses based on patient data
- Support for queries about:
  - Medications and prescriptions
  - Allergies and contraindications
  - Vital signs and measurements
  - Laboratory results and trends
  - Medical history and chronic conditions
  - Recent visits and care plans

### 📱 Modern UI/UX
- Responsive design for desktop and mobile
- Clean, professional medical interface
- Real-time chat with typing indicators
- Sidebar navigation with patient quick info
- Dark/light mode support (via ShadCN theming)

## Technology Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **UI Components:** ShadCN UI (built on Radix UI)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State Management:** React Hooks (useState, useEffect)

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd medical-ai-chat
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be available in the `dist` directory.

## Project Structure

```
medical-ai-chat/
├── src/
│   ├── components/
│   │   ├── ui/                 # ShadCN UI components
│   │   ├── ChatInterface.tsx   # Main chat interface
│   │   ├── ChatMessage.tsx     # Individual chat message
│   │   └── PatientSummary.tsx  # Patient information display
│   ├── types/
│   │   └── patient.ts          # TypeScript type definitions
│   ├── App.tsx                 # Main application component
│   ├── main.tsx               # Application entry point
│   ├── index.css              # Global styles and Tailwind
│   └── summary.json           # Sample patient data
├── public/                     # Static assets
├── tailwind.config.js         # Tailwind CSS configuration
├── vite.config.ts            # Vite configuration
└── package.json              # Project dependencies
```

## Patient Data Structure

The application uses a comprehensive patient data model including:

- **Patient Demographics:** Name, age, gender, MRN
- **Medical History:** Allergies, chronic conditions, surgical history
- **Current Medications:** Name, dosage, frequency, prescribing provider
- **Vital Signs:** Blood pressure, heart rate, weight, BMI
- **Laboratory Results:** Test results with reference ranges
- **Recent Visits:** Appointments with assessments and plans

## AI Assistant Capabilities

The AI assistant can intelligently respond to queries about:

1. **Medication Information**
   - Current prescriptions and dosages
   - Prescribing physicians
   - Medication schedules

2. **Allergy Management**
   - Known allergens and reactions
   - Severity levels
   - Contraindication warnings

3. **Vital Signs Analysis**
   - Current measurements
   - BMI calculations and interpretations
   - Trend analysis

4. **Laboratory Results**
   - Recent test results
   - Reference range comparisons
   - Abnormal value identification

5. **Medical History Review**
   - Chronic condition management
   - Surgical history
   - Treatment timelines

## Customization

### Adding New Patient Data
Replace the content in `src/summary.json` with your patient data following the established schema.

### Extending AI Responses
Modify the `generateAIResponse` function in `ChatInterface.tsx` to add new query patterns and responses.

### Styling Customization
- Update `tailwind.config.js` for theme modifications
- Modify CSS variables in `src/index.css` for color scheme changes
- Customize ShadCN components in `src/components/ui/`

## Development Notes

- The application uses TypeScript for type safety
- All components are built with accessibility in mind
- The design follows medical application UI/UX best practices
- State management is handled through React hooks
- The AI responses are simulated (no actual AI model integration)

## Future Enhancements

- Integration with real AI/ML models for medical analysis
- Real-time patient data synchronization
- Multi-patient support with patient switching
- Advanced search and filtering capabilities
- Export functionality for chat transcripts
- Integration with EHR systems
- Voice input/output capabilities

## License

This project is intended for educational and demonstration purposes. Please ensure compliance with healthcare data regulations (HIPAA, GDPR, etc.) when using with real patient data.