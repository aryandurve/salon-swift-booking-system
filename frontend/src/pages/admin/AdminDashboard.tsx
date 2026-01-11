import { Phone, Calendar, Clock, PhoneMissed, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "@/components/admin/AdminLayout";

const stats = [
  {
    title: "Total Calls Today",
    value: "24",
    change: "+12%",
    icon: Phone,
    trend: "up",
  },
  {
    title: "Booking Requests",
    value: "8",
    change: "3 pending",
    icon: Calendar,
    trend: "neutral",
  },
  {
    title: "Confirmed Appointments",
    value: "15",
    change: "+5 today",
    icon: Clock,
    trend: "up",
  },
  {
    title: "Missed Calls",
    value: "2",
    change: "-50%",
    icon: PhoneMissed,
    trend: "down",
  },
];

const recentCalls = [
  {
    id: 1,
    number: "+91 98765 12345",
    time: "10:30 AM",
    type: "Booking",
    status: "Completed",
    duration: "3:45",
  },
  {
    id: 2,
    number: "+91 87654 32109",
    time: "10:15 AM",
    type: "Enquiry",
    status: "Completed",
    duration: "1:20",
  },
  {
    id: 3,
    number: "+91 76543 21098",
    time: "9:45 AM",
    type: "Booking",
    status: "Transferred",
    duration: "2:10",
  },
];

const pendingBookings = [
  {
    id: 1,
    name: "Priya Sharma",
    service: "Hair Spa",
    date: "Jan 12, 2026",
    time: "2:00 PM",
  },
  {
    id: 2,
    name: "Rahul Verma",
    service: "Haircut + Styling",
    date: "Jan 12, 2026",
    time: "3:30 PM",
  },
  {
    id: 3,
    name: "Anita Patel",
    service: "Facial",
    date: "Jan 13, 2026",
    time: "11:00 AM",
  },
];

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card
              key={stat.title}
              variant="stat"
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    <p
                      className={`text-xs mt-1 ${
                        stat.trend === "up"
                          ? "text-success"
                          : stat.trend === "down"
                          ? "text-destructive"
                          : "text-muted-foreground"
                      }`}
                    >
                      {stat.change}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Calls */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Calls</CardTitle>
              <a href="/admin/calls" className="text-sm text-primary hover:underline">
                View All
              </a>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCalls.map((call) => (
                  <div
                    key={call.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Phone className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          {call.number}
                        </p>
                        <p className="text-xs text-muted-foreground">{call.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                          call.type === "Booking"
                            ? "bg-success/10 text-success"
                            : "bg-info/10 text-info"
                        }`}
                      >
                        {call.type}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">
                        {call.duration}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Bookings */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Pending Booking Requests</CardTitle>
              <a href="/admin/bookings" className="text-sm text-primary hover:underline">
                View All
              </a>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                        <Users className="w-4 h-4 text-gold" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          {booking.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {booking.service}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">
                        {booking.date}
                      </p>
                      <p className="text-xs text-muted-foreground">{booking.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Today's Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-success/10">
                <p className="text-2xl font-bold text-success">12</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-warning/10">
                <p className="text-2xl font-bold text-warning">3</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-info/10">
                <p className="text-2xl font-bold text-info">5</p>
                <p className="text-sm text-muted-foreground">Upcoming</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-destructive/10">
                <p className="text-2xl font-bold text-destructive">1</p>
                <p className="text-sm text-muted-foreground">Cancelled</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
