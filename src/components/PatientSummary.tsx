import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { PatientSummary as PatientSummaryType } from "@/types/patient";

interface PatientSummaryProps {
  patientData: PatientSummaryType;
}

export function PatientSummary({ patientData }: PatientSummaryProps) {
  const { patient, medicalHistory, currentMedications, vitalSigns, labResults } = patientData;

  return (
    <div className="space-y-4 h-full overflow-y-auto p-4">
      {/* Patient Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Patient Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Name</p>
              <p className="text-sm text-muted-foreground">{patient.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium">MRN</p>
              <p className="text-sm text-muted-foreground">{patient.mrn}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Age</p>
              <p className="text-sm text-muted-foreground">{patient.age} years</p>
            </div>
            <div>
              <p className="text-sm font-medium">Gender</p>
              <p className="text-sm text-muted-foreground">{patient.gender}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vital Signs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Latest Vital Signs</CardTitle>
          <p className="text-sm text-muted-foreground">Recorded: {vitalSigns.lastRecorded}</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Blood Pressure</p>
              <p className="text-sm text-muted-foreground">{vitalSigns.bloodPressure}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Heart Rate</p>
              <p className="text-sm text-muted-foreground">{vitalSigns.heartRate}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Weight</p>
              <p className="text-sm text-muted-foreground">{vitalSigns.weight}</p>
            </div>
            <div>
              <p className="text-sm font-medium">BMI</p>
              <p className="text-sm text-muted-foreground">{vitalSigns.bmi}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Allergies */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Allergies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {medicalHistory.allergies.map((allergy, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm">{allergy.allergen}</span>
                <Badge variant={allergy.severity === 'Severe' ? 'destructive' : 'secondary'}>
                  {allergy.severity}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Medications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Current Medications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentMedications.map((med, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium">{med.name}</p>
                  <Badge variant="outline">{med.dosage}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{med.frequency}</p>
                <p className="text-xs text-muted-foreground">Prescribed by: {med.prescribedBy}</p>
                {index < currentMedications.length - 1 && <Separator className="mt-2" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chronic Conditions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Chronic Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {medicalHistory.chronicConditions.map((condition, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">{condition.condition}</p>
                  <Badge variant={condition.status === 'Active' ? 'default' : 'secondary'}>
                    {condition.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">Diagnosed: {condition.diagnosedDate}</p>
                {index < medicalHistory.chronicConditions.length - 1 && <Separator className="mt-2" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Lab Results */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Lab Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {labResults.map((lab, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">{lab.test}</p>
                  <Badge variant={lab.status === 'Normal' ? 'default' : 'destructive'}>
                    {lab.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{lab.result}</p>
                <p className="text-xs text-muted-foreground">Reference: {lab.reference}</p>
                <p className="text-xs text-muted-foreground">Date: {lab.date}</p>
                {index < labResults.length - 1 && <Separator className="mt-2" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}