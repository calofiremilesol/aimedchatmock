import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChatMessage } from "./ChatMessage";
import type { PatientSummary as PatientSummaryType, ChatMessage as ChatMessageType } from "@/types/patient";
import { Send, Stethoscope } from "lucide-react";

interface ChatInterfaceProps {
  patientData: PatientSummaryType;
}

export function ChatInterface({ patientData }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: '1',
      type: 'ai',
      content: `Hello! I'm your medical AI assistant. I have access to ${patientData.patient.name}'s medical records and I'm here to help answer questions about their medical history, current medications, recent visits, and lab results. How can I assist you today?`,
      timestamp: new Date(),
      context: 'Initial greeting'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for medication-related questions
    if (lowerMessage.includes('medication') || lowerMessage.includes('drug') || lowerMessage.includes('prescription')) {
      const medications = patientData.currentMedications;
      return `${patientData.patient.name} is currently taking ${medications.length} medications:\n\n${medications.map(med => 
        `• ${med.name} ${med.dosage} - ${med.frequency}\n  Prescribed by: ${med.prescribedBy}`
      ).join('\n\n')}\n\nIs there a specific medication you'd like to know more about?`;
    }
    
    // Check for allergy-related questions
    if (lowerMessage.includes('allerg')) {
      const allergies = patientData.medicalHistory.allergies;
      return `${patientData.patient.name} has ${allergies.length} documented allergies:\n\n${allergies.map(allergy => 
        `• ${allergy.allergen} - ${allergy.reaction} (${allergy.severity} severity)`
      ).join('\n')}\n\nPlease ensure any prescribed medications or treatments avoid these allergens.`;
    }
    
    // Check for vital signs questions
    if (lowerMessage.includes('vital') || lowerMessage.includes('blood pressure') || lowerMessage.includes('weight')) {
      const vitals = patientData.vitalSigns;
      return `Latest vital signs for ${patientData.patient.name} (recorded ${vitals.lastRecorded}):\n\n• Blood Pressure: ${vitals.bloodPressure}\n• Heart Rate: ${vitals.heartRate}\n• Temperature: ${vitals.temperature}\n• Weight: ${vitals.weight}\n• Height: ${vitals.height}\n• BMI: ${vitals.bmi}\n\nThe patient's BMI indicates they are ${vitals.bmi > 25 ? 'overweight' : vitals.bmi < 18.5 ? 'underweight' : 'within normal range'}.`;
    }
    
    // Check for lab results questions
    if (lowerMessage.includes('lab') || lowerMessage.includes('test') || lowerMessage.includes('result')) {
      const labs = patientData.labResults;
      return `Recent lab results for ${patientData.patient.name}:\n\n${labs.map(lab => 
        `• ${lab.test}: ${lab.result} (${lab.status})\n  Reference range: ${lab.reference}\n  Date: ${lab.date}`
      ).join('\n\n')}\n\nWould you like me to explain any of these results in more detail?`;
    }
    
    // Check for medical history questions
    if (lowerMessage.includes('history') || lowerMessage.includes('condition') || lowerMessage.includes('chronic')) {
      const conditions = patientData.medicalHistory.chronicConditions;
      return `${patientData.patient.name}'s chronic conditions:\n\n${conditions.map(condition => 
        `• ${condition.condition} (${condition.status})\n  Diagnosed: ${condition.diagnosedDate}\n  Current medications: ${condition.medications.join(', ')}`
      ).join('\n\n')}\n\nThese conditions require ongoing monitoring and management.`;
    }
    
    // Check for recent visits questions
    if (lowerMessage.includes('visit') || lowerMessage.includes('appointment') || lowerMessage.includes('recent')) {
      const visits = patientData.recentVisits;
      return `Recent visits for ${patientData.patient.name}:\n\n${visits.map(visit => 
        `• ${visit.date} - ${visit.type}\n  Provider: ${visit.provider}\n  Chief Complaint: ${visit.chiefComplaint}\n  Assessment: ${visit.assessment}\n  Plan: ${visit.plan}`
      ).join('\n\n')}`;
    }
    
    // Default response
    return `I can help you with information about ${patientData.patient.name}'s:\n\n• Current medications and prescriptions\n• Medical allergies and reactions\n• Chronic conditions and medical history\n• Recent vital signs and measurements\n• Laboratory test results\n• Recent visits and appointments\n\nWhat specific information would you like to know about?`;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(inputValue),
        timestamp: new Date(),
        context: 'Medical record analysis'
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-blue-600" />
          Medical AI Assistant
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Ask questions about {patientData.patient.name}'s medical records
        </p>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea ref={scrollAreaRef} className="flex-1 px-4">
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start mb-4">
                <div className="w-8 h-8 mt-1 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                </div>
                <Card className="bg-muted">
                  <CardContent className="p-3">
                    <p className="text-sm text-muted-foreground">AI is analyzing the medical records...</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about medications, allergies, lab results, or medical history..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!inputValue.trim() || isLoading}
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}