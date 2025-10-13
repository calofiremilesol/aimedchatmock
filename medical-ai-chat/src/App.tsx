import { useState } from 'react';
import { PatientSummary } from './components/PatientSummary';
import { ChatInterface } from './components/ChatInterface';
import type { PatientSummary as PatientSummaryType } from './types/patient';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Separator } from './components/ui/separator';
import { User, MessageSquare, FileText, Menu, X } from 'lucide-react';
import patientData from './summary.json';

function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'summary'>('chat');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const typedPatientData = patientData as PatientSummaryType;

  return (
    <div className="h-screen bg-background flex">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </Button>

      {/* Sidebar */}
      <div className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 fixed md:relative z-40 w-80 h-full bg-card border-r transition-transform duration-300 ease-in-out`}>
        
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h1 className="font-semibold text-lg">Medical AI Chat</h1>
              <p className="text-sm text-muted-foreground">Patient Care Assistant</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4">
          <div className="space-y-2">
            <Button
              variant={activeTab === 'chat' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => {
                setActiveTab('chat');
                setSidebarOpen(false);
              }}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              AI Chat Assistant
            </Button>
            <Button
              variant={activeTab === 'summary' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => {
                setActiveTab('summary');
                setSidebarOpen(false);
              }}
            >
              <FileText className="w-4 h-4 mr-2" />
              Patient Summary
            </Button>
          </div>
        </div>

        <Separator />

        {/* Patient Quick Info */}
        <div className="p-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Current Patient</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-sm font-medium">{typedPatientData.patient.name}</p>
                <p className="text-xs text-muted-foreground">
                  {typedPatientData.patient.age} years old • {typedPatientData.patient.gender}
                </p>
                <p className="text-xs text-muted-foreground">
                  MRN: {typedPatientData.patient.mrn}
                </p>
              </div>
              <Separator />
              <div className="space-y-1">
                <p className="text-xs font-medium">Active Conditions:</p>
                {typedPatientData.medicalHistory.chronicConditions.map((condition, index) => (
                  <p key={index} className="text-xs text-muted-foreground">
                    • {condition.condition}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-0">
        <div className="flex-1 p-4 md:p-6">
          {activeTab === 'chat' ? (
            <ChatInterface patientData={typedPatientData} />
          ) : (
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Patient Medical Summary</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Comprehensive medical record for {typedPatientData.patient.name}
                </p>
              </CardHeader>
              <CardContent className="p-0 h-full">
                <PatientSummary patientData={typedPatientData} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;