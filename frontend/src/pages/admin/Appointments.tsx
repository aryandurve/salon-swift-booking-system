import { useState } from "react";
import { Calendar, Clock, User, List, Grid3X3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/admin/AdminLayout";

const appointments = [
  {
    id: 1,
    name: "Priya Sharma",
    service: "Hair Spa",
    date: "Jan 12, 2026",
    time: "2:00 PM",
    status: "Confirmed",
  },
  {
    id: 2,
    name: "Rahul Verma",
    service: "Haircut + Styling",
    date: "Jan 12, 2026",
    time: "3:30 PM",
    status: "Confirmed",
  },
  {
    id: 3,
    name: "Anita Patel",
    service: "Facial",
    date: "Jan 13, 2026",
    time: "11:00 AM",
    status: "Confirmed",
  },
  {
    id: 4,
    name: "Vikram Singh",
    service: "Hair Coloring",
    date: "Jan 14, 2026",
    time: "10:00 AM",
    status: "Rescheduled",
  },
  {
    id: 5,
    name: "Meera Gupta",
    service: "Haircut",
    date: "Jan 14, 2026",
    time: "4:00 PM",
    status: "Cancelled",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Confirmed":
      return "bg-success/10 text-success";
    case "Rescheduled":
      return "bg-warning/10 text-warning";
    case "Cancelled":
      return "bg-destructive/10 text-destructive";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const Appointments = () => {
  const [view, setView] = useState<"list" | "calendar">("list");

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground">
              Appointments
            </h2>
            <p className="text-muted-foreground text-sm">
              View and manage all scheduled appointments
            </p>
          </div>
          <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
            <Button
              variant={view === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("list")}
            >
              <List className="w-4 h-4 mr-1" />
              List
            </Button>
            <Button
              variant={view === "calendar" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("calendar")}
            >
              <Grid3X3 className="w-4 h-4 mr-1" />
              Calendar
            </Button>
          </div>
        </div>

        {view === "list" ? (
          /* List View */
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-secondary/30">
                      <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">
                        Customer
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">
                        Service
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">
                        Date
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">
                        Time
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((apt) => (
                      <tr
                        key={apt.id}
                        className="border-b border-border hover:bg-secondary/20 transition-colors"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-light to-gold-light flex items-center justify-center">
                              <User className="w-4 h-4 text-primary" />
                            </div>
                            <span className="font-medium text-foreground">
                              {apt.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-foreground">{apt.service}</td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2 text-foreground">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            {apt.date}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2 text-foreground">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            {apt.time}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              apt.status
                            )}`}
                          >
                            {apt.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Calendar View Placeholder */
          <Card className="p-8 text-center">
            <Grid3X3 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold text-foreground mb-2">
              Calendar View Coming Soon
            </h3>
            <p className="text-muted-foreground text-sm">
              A full calendar view will be available in the next update.
            </p>
          </Card>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card variant="stat">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-success">12</p>
              <p className="text-sm text-muted-foreground">Confirmed</p>
            </CardContent>
          </Card>
          <Card variant="stat">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-warning">3</p>
              <p className="text-sm text-muted-foreground">Rescheduled</p>
            </CardContent>
          </Card>
          <Card variant="stat">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-destructive">2</p>
              <p className="text-sm text-muted-foreground">Cancelled</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Appointments;
