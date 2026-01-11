import { useState } from "react";
import { Check, X, Clock, Mail, User, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/admin/AdminLayout";
import { useToast } from "@/hooks/use-toast";

interface BookingRequest {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  status: "pending" | "approved" | "rejected";
}

const initialBookings: BookingRequest[] = [
  {
    id: 1,
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 98765 12345",
    service: "Hair Spa",
    preferredDate: "Jan 12, 2026",
    preferredTime: "2:00 PM",
    status: "pending",
  },
  {
    id: 2,
    name: "Rahul Verma",
    email: "rahul.v@email.com",
    phone: "+91 87654 32109",
    service: "Haircut + Styling",
    preferredDate: "Jan 12, 2026",
    preferredTime: "3:30 PM",
    status: "pending",
  },
  {
    id: 3,
    name: "Anita Patel",
    email: "anita.patel@email.com",
    phone: "+91 76543 21098",
    service: "Facial",
    preferredDate: "Jan 13, 2026",
    preferredTime: "11:00 AM",
    status: "pending",
  },
  {
    id: 4,
    name: "Vikram Singh",
    email: "vikram.s@email.com",
    phone: "+91 65432 10987",
    service: "Hair Coloring",
    preferredDate: "Jan 14, 2026",
    preferredTime: "10:00 AM",
    status: "pending",
  },
];

const BookingRequests = () => {
  const [bookings, setBookings] = useState<BookingRequest[]>(initialBookings);
  const { toast } = useToast();

  const handleApprove = (id: number) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status: "approved" as const } : booking
      )
    );
    toast({
      title: "Booking Approved",
      description: "Confirmation email sent to customer.",
    });
  };

  const handleReject = (id: number) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status: "rejected" as const } : booking
      )
    );
    toast({
      title: "Booking Rejected",
      description: "Customer has been notified.",
      variant: "destructive",
    });
  };

  const pendingBookings = bookings.filter((b) => b.status === "pending");
  const processedBookings = bookings.filter((b) => b.status !== "pending");

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">
            Booking Requests
          </h2>
          <p className="text-muted-foreground text-sm">
            Approve or reject appointment requests from customers
          </p>
        </div>

        {/* Pending Requests */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Pending Requests ({pendingBookings.length})
          </h3>
          {pendingBookings.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No pending booking requests</p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {pendingBookings.map((booking) => (
                <Card key={booking.id} variant="elevated" className="overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-primary to-gold" />
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">
                            {booking.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {booking.phone}
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-warning/10 text-warning text-xs font-medium">
                        Pending
                      </span>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Service:</span>
                        <span className="font-medium text-foreground">
                          {booking.service}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">
                          {booking.preferredDate} at {booking.preferredTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">{booking.email}</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="success"
                        className="flex-1"
                        onClick={() => handleApprove(booking.id)}
                      >
                        <Check className="w-4 h-4" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleReject(booking.id)}
                      >
                        <Clock className="w-4 h-4" />
                        Suggest New Time
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleReject(booking.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Processed Requests */}
        {processedBookings.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Recently Processed
            </h3>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {processedBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                          <User className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {booking.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {booking.service} • {booking.preferredDate}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === "approved"
                            ? "bg-success/10 text-success"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {booking.status === "approved" ? "Approved" : "Rejected"}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default BookingRequests;
