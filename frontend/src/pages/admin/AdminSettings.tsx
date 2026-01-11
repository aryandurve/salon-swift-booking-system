import { useState } from "react";
import { Clock, Save, Power } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import AdminLayout from "@/components/admin/AdminLayout";
import { useToast } from "@/hooks/use-toast";

const AdminSettings = () => {
  const { toast } = useToast();
  const [voiceAssistant, setVoiceAssistant] = useState(true);
  const [hours, setHours] = useState({
    monday: { open: "10:00", close: "20:00", closed: false },
    tuesday: { open: "10:00", close: "20:00", closed: false },
    wednesday: { open: "10:00", close: "20:00", closed: false },
    thursday: { open: "10:00", close: "20:00", closed: false },
    friday: { open: "10:00", close: "20:00", closed: false },
    saturday: { open: "10:00", close: "20:00", closed: false },
    sunday: { open: "10:00", close: "20:00", closed: true },
  });

  const [services, setServices] = useState([
    { id: 1, name: "Haircut", price: 500 },
    { id: 2, name: "Haircut + Styling", price: 700 },
    { id: 3, name: "Hair Spa", price: 1200 },
    { id: 4, name: "Beard Trim", price: 300 },
    { id: 5, name: "Hair Coloring", price: 2000 },
    { id: 6, name: "Facial", price: 1500 },
  ]);

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ] as const;

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground">
              Settings
            </h2>
            <p className="text-muted-foreground text-sm">
              Manage your salon settings and preferences
            </p>
          </div>
          <Button variant="default" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>

        {/* Voice Assistant Toggle */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Power className="w-5 h-5" />
              Voice Receptionist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Enable Smart Receptionist</p>
                <p className="text-sm text-muted-foreground">
                  When enabled, customers can book appointments via phone call
                </p>
              </div>
              <Switch
                checked={voiceAssistant}
                onCheckedChange={setVoiceAssistant}
              />
            </div>
            <div
              className={`mt-4 p-4 rounded-lg ${
                voiceAssistant ? "bg-success/10" : "bg-destructive/10"
              }`}
            >
              <p
                className={`text-sm font-medium ${
                  voiceAssistant ? "text-success" : "text-destructive"
                }`}
              >
                {voiceAssistant
                  ? "✓ Voice receptionist is active and taking calls"
                  : "✗ Voice receptionist is currently disabled"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Opening Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Opening Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {days.map((day) => (
                <div
                  key={day}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-4 min-w-[120px]">
                    <span className="font-medium text-foreground capitalize">
                      {day}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    {hours[day].closed ? (
                      <span className="text-destructive font-medium">Closed</span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <input
                          type="time"
                          value={hours[day].open}
                          onChange={(e) =>
                            setHours((prev) => ({
                              ...prev,
                              [day]: { ...prev[day], open: e.target.value },
                            }))
                          }
                          className="px-3 py-2 rounded-lg border border-border bg-card text-foreground"
                        />
                        <span className="text-muted-foreground">to</span>
                        <input
                          type="time"
                          value={hours[day].close}
                          onChange={(e) =>
                            setHours((prev) => ({
                              ...prev,
                              [day]: { ...prev[day], close: e.target.value },
                            }))
                          }
                          className="px-3 py-2 rounded-lg border border-border bg-card text-foreground"
                        />
                      </div>
                    )}
                    <Switch
                      checked={!hours[day].closed}
                      onCheckedChange={(checked) =>
                        setHours((prev) => ({
                          ...prev,
                          [day]: { ...prev[day], closed: !checked },
                        }))
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Services & Pricing */}
        <Card>
          <CardHeader>
            <CardTitle>Services & Pricing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <input
                    type="text"
                    value={service.name}
                    onChange={(e) =>
                      setServices((prev) =>
                        prev.map((s) =>
                          s.id === service.id ? { ...s, name: e.target.value } : s
                        )
                      )
                    }
                    className="px-3 py-2 rounded-lg border border-border bg-card text-foreground flex-1 mr-4"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">₹</span>
                    <input
                      type="number"
                      value={service.price}
                      onChange={(e) =>
                        setServices((prev) =>
                          prev.map((s) =>
                            s.id === service.id
                              ? { ...s, price: parseInt(e.target.value) || 0 }
                              : s
                          )
                        )
                      }
                      className="w-24 px-3 py-2 rounded-lg border border-border bg-card text-foreground"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
