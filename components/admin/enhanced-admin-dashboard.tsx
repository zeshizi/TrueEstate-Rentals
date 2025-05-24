import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Database, Users } from "lucide-react"
import { UserTable } from "@/components/admin/user-table"
import { RedisDashboard } from "./redis-dashboard"

export default function EnhancedAdminDashboard() {
  return (
    <Tabs defaultValue="users" className="space-y-4">
      <TabsList>
        <TabsTrigger value="users" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          Users
        </TabsTrigger>
        <TabsTrigger value="redis" className="flex items-center gap-2">
          <Database className="h-4 w-4" />
          Redis & Performance
        </TabsTrigger>
      </TabsList>
      <TabsContent value="users" className="space-y-6">
        <UserTable />
      </TabsContent>
      <TabsContent value="redis" className="space-y-6">
        <RedisDashboard />
      </TabsContent>
    </Tabs>
  )
}
