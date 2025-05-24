"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { EmployeeManagement } from "@/components/admin/employee-management"
import { AccessLogging } from "@/components/security/access-logging"
import { DataEncryptionStatus } from "@/components/security/data-encryption-status"

export function EnhancedAdminDashboard() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <AdminDashboard />
        </TabsContent>

        <TabsContent value="employees">
          <EmployeeManagement />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <AccessLogging />
          <DataEncryptionStatus />
        </TabsContent>

        <TabsContent value="compliance">
          <div className="grid gap-6">
            <DataEncryptionStatus />
            {/* Additional compliance components would go here */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
