import { DemoSection } from "@/showcase/component-page";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const employees = [
  {
    id: "EMP-001",
    name: "Sarah Johnson",
    department: "Engineering",
    role: "Senior Developer",
    status: "Active",
  },
  {
    id: "EMP-002",
    name: "Michael Chen",
    department: "Design",
    role: "UI/UX Designer",
    status: "Active",
  },
  {
    id: "EMP-003",
    name: "Emily Davis",
    department: "Marketing",
    role: "Marketing Manager",
    status: "On Leave",
  },
  {
    id: "EMP-004",
    name: "James Wilson",
    department: "Engineering",
    role: "DevOps Engineer",
    status: "Active",
  },
  {
    id: "EMP-005",
    name: "Priya Patel",
    department: "HR",
    role: "HR Specialist",
    status: "Active",
  },
  {
    id: "EMP-006",
    name: "Robert Kim",
    department: "Finance",
    role: "Financial Analyst",
    status: "Inactive",
  },
];

function StatusBadge({ status }: { status: string }) {
  const variant =
    status === "Active"
      ? "default"
      : status === "On Leave"
        ? "secondary"
        : "outline";

  return <Badge variant={variant}>{status}</Badge>;
}

export default function TableDemo() {
  return (
    <>
      <DemoSection title="Employee Table" code={`import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow,
} from "@/components/ui/table"

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Department</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Sarah Johnson</TableCell>
      <TableCell>Engineering</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
  </TableBody>
</Table>`}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="font-medium">{employee.id}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell className="text-right">
                  <StatusBadge status={employee.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DemoSection>
    </>
  );
}
