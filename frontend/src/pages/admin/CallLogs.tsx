import { useState } from "react";
import { Phone, Play, Clock, Search, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/admin/AdminLayout";

const callLogs = [
  {
    id: 1,
    number: "+91 98765 12345",
    date: "Jan 10, 2026",
    time: "10:30 AM",
    duration: "3:45",
    type: "Booking",
    status: "Completed",
    hasRecording: true,
  },
  {
    id: 2,
    number: "+91 87654 32109",
    date: "Jan 10, 2026",
    time: "10:15 AM",
    duration: "1:20",
    type: "Enquiry",
    status: "Completed",
    hasRecording: true,
  },
  {
    id: 3,
    number: "+91 76543 21098",
    date: "Jan 10, 2026",
    time: "9:45 AM",
    duration: "2:10",
    type: "Booking",
    status: "Transferred",
    hasRecording: false,
  },
  {
    id: 4,
    number: "+91 65432 10987",
    date: "Jan 10, 2026",
    time: "9:30 AM",
    duration: "0:45",
    type: "Cancellation",
    status: "Completed",
    hasRecording: true,
  },
  {
    id: 5,
    number: "+91 54321 09876",
    date: "Jan 9, 2026",
    time: "5:15 PM",
    duration: "4:20",
    type: "Booking",
    status: "Completed",
    hasRecording: true,
  },
  {
    id: 6,
    number: "+91 43210 98765",
    date: "Jan 9, 2026",
    time: "4:00 PM",
    duration: "0:00",
    type: "Unknown",
    status: "Missed",
    hasRecording: false,
  },
];

const getTypeColor = (type: string) => {
  switch (type) {
    case "Booking":
      return "bg-success/10 text-success";
    case "Enquiry":
      return "bg-info/10 text-info";
    case "Cancellation":
      return "bg-destructive/10 text-destructive";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "text-success";
    case "Transferred":
      return "text-warning";
    case "Missed":
      return "text-destructive";
    default:
      return "text-muted-foreground";
  }
};

const CallLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCalls = callLogs.filter(
    (call) =>
      call.number.includes(searchTerm) ||
      call.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground">Call Logs</h2>
            <p className="text-muted-foreground text-sm">
              View and manage all voice receptionist calls
            </p>
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by phone number or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Call Logs Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary/30">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">
                      Caller
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">
                      Date & Time
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">
                      Duration
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">
                      Type
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">
                      Status
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">
                      Recording
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCalls.map((call) => (
                    <tr
                      key={call.id}
                      className="border-b border-border hover:bg-secondary/20 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Phone className="w-4 h-4 text-primary" />
                          </div>
                          <span className="font-medium text-foreground">
                            {call.number}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-foreground">{call.date}</p>
                        <p className="text-sm text-muted-foreground">{call.time}</p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {call.duration}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(
                            call.type
                          )}`}
                        >
                          {call.type}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`font-medium ${getStatusColor(call.status)}`}>
                          {call.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {call.hasRecording ? (
                          <Button variant="ghost" size="sm">
                            <Play className="w-4 h-4 mr-1" />
                            Play
                          </Button>
                        ) : (
                          <span className="text-muted-foreground text-sm">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default CallLogs;
