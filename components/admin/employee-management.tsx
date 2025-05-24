"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserPlus, Mail, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Employee {
  id: string
  email: string
  firstName: string
  lastName: string
  role: "admin" | "manager" | "analyst" | "viewer"
  status: "active" | "pending" | "suspended"
  lastLogin?: Date
  invitedAt: Date
  invitedBy: string
}

export function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
  const [inviteForm, setInviteForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    role: "viewer" as const,
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      const response = await fetch("/api/admin/employees")
      const data = await response.json()
      setEmployees(data.employees || [])
    } catch (error) {
      console.error("Failed to fetch employees:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleInviteEmployee = async () => {
    try {
      const response = await fetch("/api/admin/employees/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inviteForm),
      })

      const result = await response.json()

      if (response.ok) {
        toast({
          title: "Invitation Sent",
          description: `Invitation sent to ${inviteForm.email}`,
        })
        setInviteDialogOpen(false)
        setInviteForm({ email: "", firstName: "", lastName: "", role: "viewer" })
        fetchEmployees()
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "Invitation Failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      })
    }
  }

  const handleUpdateRole = async (employeeId: string, newRole: string) => {
    try {
      const response = await fetch(`/api/admin/employees/${employeeId}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      })

      if (response.ok) {
        toast({
          title: "Role Updated",
          description: "Employee role has been updated successfully",
        })
        fetchEmployees()
      } else {
        throw new Error("Failed to update role")
      }
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update employee role",
        variant: "destructive",
      })
    }
  }

  const handleSuspendEmployee = async (employeeId: string) => {
    try {
      const response = await fetch(`/api/admin/employees/${employeeId}/suspend`, {
        method: "PATCH",
      })

      if (response.ok) {
        toast({
          title: "Employee Suspended",
          description: "Employee access has been suspended",
        })
        fetchEmployees()
      } else {
        throw new Error("Failed to suspend employee")
      }
    } catch (error) {
      toast({
        title: "Suspension Failed",
        description: "Failed to suspend employee",
        variant: "destructive",
      })
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-600"
      case "manager":
        return "bg-blue-600"
      case "analyst":
        return "bg-green-600"
      case "viewer":
        return "bg-gray-600"
      default:
        return "bg-gray-600"
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600"
      case "pending":
        return "bg-yellow-600"
      case "suspended":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">Loading employees...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Employee Management
          </CardTitle>
          <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Invite Employee
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite New Employee</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={inviteForm.firstName}
                      onChange={(e) => setInviteForm((prev) => ({ ...prev, firstName: e.target.value }))}
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={inviteForm.lastName}
                      onChange={(e) => setInviteForm((prev) => ({ ...prev, lastName: e.target.value }))}
                      placeholder="Smith"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={inviteForm.email}
                    onChange={(e) => setInviteForm((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={inviteForm.role}
                    onValueChange={(value: any) => setInviteForm((prev) => ({ ...prev, role: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="viewer">Viewer - Read-only access</SelectItem>
                      <SelectItem value="analyst">Analyst - Search and export data</SelectItem>
                      <SelectItem value="manager">Manager - Manage team data</SelectItem>
                      <SelectItem value="admin">Admin - Full system access</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleInviteEmployee} className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Invitation
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{employees.length}</div>
              <div className="text-sm text-gray-600">Total Employees</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {employees.filter((e) => e.status === "active").length}
              </div>
              <div className="text-sm text-gray-600">Active</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {employees.filter((e) => e.status === "pending").length}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {employees.filter((e) => e.role === "admin").length}
              </div>
              <div className="text-sm text-gray-600">Admins</div>
            </div>
          </div>

          {/* Employee Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {employee.firstName} {employee.lastName}
                        </div>
                        <div className="text-sm text-gray-600">{employee.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleBadgeColor(employee.role)}>
                        {employee.role.charAt(0).toUpperCase() + employee.role.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(employee.status)}>
                        {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {employee.lastLogin ? new Date(employee.lastLogin).toLocaleDateString() : "Never"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Select value={employee.role} onValueChange={(value) => handleUpdateRole(employee.id, value)}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="viewer">Viewer</SelectItem>
                            <SelectItem value="analyst">Analyst</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                        {employee.status === "active" && (
                          <Button variant="outline" size="sm" onClick={() => handleSuspendEmployee(employee.id)}>
                            Suspend
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {employees.length === 0 && (
            <div className="text-center py-8 text-gray-600">No employees found. Start by inviting team members.</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
