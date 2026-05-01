import { useState } from 'react';
import {
  Users,
  LayoutDashboard,
  User,
  LogOut,
  Plus,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  ArrowLeft,
  Mail,
  Building2,
  Briefcase,
  CalendarDays,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SelectPicker } from '@/components/ui/select-picker';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AppShell } from '@/components/ui/app-shell';
import { DatePicker } from '@/components/ui/date-picker';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { ThemeToggle } from '@/components/theme-toggle';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  status: 'active' | 'on-leave' | 'probation';
  joinDate: string;
}

const EMPLOYEES: Employee[] = [
  {
    id: '1',
    name: 'Ahmad Razif',
    email: 'ahmad.razif@pandaworks.com',
    department: 'Engineering',
    role: 'Software Engineer',
    status: 'active',
    joinDate: '2023-03-15',
  },
  {
    id: '2',
    name: 'Siti Aminah',
    email: 'siti.aminah@pandaworks.com',
    department: 'Human Resources',
    role: 'HR Manager',
    status: 'active',
    joinDate: '2022-01-10',
  },
  {
    id: '3',
    name: 'Lee Wei Ming',
    email: 'weiming.lee@pandaworks.com',
    department: 'Finance',
    role: 'Financial Analyst',
    status: 'on-leave',
    joinDate: '2023-08-01',
  },
  {
    id: '4',
    name: 'Nurul Izzah',
    email: 'nurul.izzah@pandaworks.com',
    department: 'Engineering',
    role: 'Frontend Developer',
    status: 'active',
    joinDate: '2024-01-22',
  },
  {
    id: '5',
    name: 'Raj Kumar',
    email: 'raj.kumar@pandaworks.com',
    department: 'Operations',
    role: 'Operations Lead',
    status: 'probation',
    joinDate: '2025-11-04',
  },
];

const STATUS_CONFIG: Record<Employee['status'], { label: string; variant: 'default' | 'destructive' | 'outline' }> = {
  active: { label: 'Active', variant: 'default' },
  'on-leave': { label: 'On Leave', variant: 'destructive' },
  probation: { label: 'Probation', variant: 'outline' },
};

const DEPARTMENTS = ['Engineering', 'Human Resources', 'Finance', 'Operations'];

const SKILLS = [
  { value: 'react', label: 'React' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'nodejs', label: 'Node.js' },
  { value: 'python', label: 'Python' },
  { value: 'dotnet', label: '.NET' },
  { value: 'sql', label: 'SQL' },
  { value: 'devops', label: 'DevOps' },
  { value: 'design', label: 'UI/UX Design' },
  { value: 'pm', label: 'Project Management' },
];

const COUNTRIES = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Korea',
  'North Macedonia',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Korea',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe',
].map((c) => ({ value: c.toLowerCase().replace(/\s+/g, '-'), label: c }));

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// ---------------------------------------------------------------------------
// Views
// ---------------------------------------------------------------------------

type View = { type: 'listing' } | { type: 'detail'; employeeId: string };

// ---------------------------------------------------------------------------
// Employee Form Dialog
// ---------------------------------------------------------------------------

function EmployeeFormDialog({
  open,
  onOpenChange,
  employee,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee?: Employee;
}) {
  const isEdit = !!employee;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Employee' : 'Add Employee'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update employee information.' : 'Fill in the details to add a new employee.'}
          </DialogDescription>
        </DialogHeader>

        <div className="-mx-6 flex-1 overflow-y-auto px-6">
          <div className="grid gap-6 py-2">
            {/* Personal Information */}
            <fieldset className="grid gap-4">
              <legend className="text-sm font-semibold text-foreground">Personal Information</legend>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="e.g. Ahmad" defaultValue={employee?.name.split(' ')[0]} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="e.g. Razif"
                    defaultValue={employee?.name.split(' ').slice(1).join(' ')}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="e.g. ahmad@pandaworks.com"
                    defaultValue={employee?.email}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="e.g. +60 12-345 6789" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Date of Birth</Label>
                  <DatePicker placeholder="Select date of birth" />
                </div>
                <div className="grid gap-2">
                  <Label>Gender</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Nationality (200+ options)</Label>
                  <SelectPicker
                    mode="single"
                    value=""
                    onChange={() => {}}
                    placeholder="Search country..."
                    searchPlaceholder="Type to filter countries..."
                    options={COUNTRIES}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Citizenships (multi, 200+)</Label>
                  <SelectPicker
                    mode="multiple"
                    value={[]}
                    onChange={() => {}}
                    placeholder="Select citizenships..."
                    searchPlaceholder="Type to filter countries..."
                    options={COUNTRIES}
                  />
                </div>
              </div>
            </fieldset>

            {/* Employment Details */}
            <fieldset className="grid gap-4">
              <legend className="text-sm font-semibold text-foreground">Employment Details</legend>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Department</Label>
                  <Select defaultValue={employee?.department}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department..." />
                    </SelectTrigger>
                    <SelectContent>
                      {DEPARTMENTS.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Job Title</Label>
                  <Input id="role" placeholder="e.g. Software Engineer" defaultValue={employee?.role} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Employment Type</Label>
                  <Select defaultValue="full-time">
                    <SelectTrigger>
                      <SelectValue placeholder="Select type..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="intern">Intern</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Join Date</Label>
                  <DatePicker selected={employee ? new Date(employee.joinDate) : null} placeholder="Select join date" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Contract Period</Label>
                <DateRangePicker
                  startDate={undefined}
                  endDate={undefined}
                  onChange={() => {}}
                  placeholder={{ start: 'Contract start', end: 'Contract end' }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="employeeId">Employee ID</Label>
                  <Input
                    id="employeeId"
                    placeholder="e.g. PW-001"
                    defaultValue={employee ? `PW-${employee.id.padStart(3, '0')}` : undefined}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Reporting To</Label>
                  <SelectPicker
                    mode="single"
                    value=""
                    onChange={() => {}}
                    placeholder="Search manager..."
                    searchPlaceholder="Search by name..."
                    options={EMPLOYEES.filter((e) => e.id !== employee?.id).map((e) => ({
                      value: e.id,
                      label: e.name,
                    }))}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Skills</Label>
                <SelectPicker
                  mode="multiple"
                  value={[]}
                  onChange={() => {}}
                  placeholder="Select skills..."
                  searchPlaceholder="Search skills..."
                  options={SKILLS}
                />
              </div>
            </fieldset>

            {/* Compensation */}
            <fieldset className="grid gap-4">
              <legend className="text-sm font-semibold text-foreground">Compensation</legend>
              <Separator />
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="salary">Base Salary (MYR)</Label>
                  <Input id="salary" type="number" placeholder="e.g. 5000" />
                </div>
                <div className="grid gap-2">
                  <Label>Pay Frequency</Label>
                  <Select defaultValue="monthly">
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bankAccount">Bank Account</Label>
                  <Input id="bankAccount" placeholder="e.g. 1234-5678-9012" />
                </div>
              </div>
            </fieldset>

            {/* Address */}
            <fieldset className="grid gap-4">
              <legend className="text-sm font-semibold text-foreground">Address</legend>
              <Separator />
              <div className="grid gap-2">
                <Label htmlFor="address1">Address Line 1</Label>
                <Input id="address1" placeholder="e.g. 123 Jalan Ampang" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address2">Address Line 2</Label>
                <Input id="address2" placeholder="e.g. Unit 4A, Tower B" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="e.g. Kuala Lumpur" />
                </div>
                <div className="grid gap-2">
                  <Label>State</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kl">W.P. Kuala Lumpur</SelectItem>
                      <SelectItem value="selangor">Selangor</SelectItem>
                      <SelectItem value="johor">Johor</SelectItem>
                      <SelectItem value="penang">Penang</SelectItem>
                      <SelectItem value="perak">Perak</SelectItem>
                      <SelectItem value="sabah">Sabah</SelectItem>
                      <SelectItem value="sarawak">Sarawak</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="postcode">Postcode</Label>
                  <Input id="postcode" placeholder="e.g. 50450" />
                </div>
              </div>
            </fieldset>

            {/* Emergency Contact */}
            <fieldset className="grid gap-4">
              <legend className="text-sm font-semibold text-foreground">Emergency Contact</legend>
              <Separator />
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="ecName">Contact Name</Label>
                  <Input id="ecName" placeholder="e.g. Siti Nurhaliza" />
                </div>
                <div className="grid gap-2">
                  <Label>Relationship</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="sibling">Sibling</SelectItem>
                      <SelectItem value="friend">Friend</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="ecPhone">Phone Number</Label>
                  <Input id="ecPhone" type="tel" placeholder="e.g. +60 12-345 6789" />
                </div>
              </div>
            </fieldset>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={() => onOpenChange(false)}>{isEdit ? 'Save Changes' : 'Add Employee'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ---------------------------------------------------------------------------
// Employee Detail View
// ---------------------------------------------------------------------------

function EmployeeDetail({ employee, onBack, onEdit }: { employee: Employee; onBack: () => void; onEdit: () => void }) {
  const status = STATUS_CONFIG[employee.status];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-xl font-semibold">Employee Detail</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg">{getInitials(employee.name)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <CardTitle className="text-xl">{employee.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{employee.role}</p>
                <Badge variant={status.variant}>{status.label}</Badge>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Pencil className="mr-1.5 h-3.5 w-3.5" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <dl className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                <dd className="text-sm">{employee.email}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Building2 className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Department</dt>
                <dd className="text-sm">{employee.department}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Briefcase className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Role</dt>
                <dd className="text-sm">{employee.role}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CalendarDays className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Joined</dt>
                <dd className="text-sm">
                  {new Date(employee.joinDate).toLocaleDateString('en-MY', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </dd>
              </div>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Employee Listing View
// ---------------------------------------------------------------------------

function EmployeeListing({ onView, onEdit }: { onView: (id: string) => void; onEdit: (employee: Employee) => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Employees</h1>
          <p className="text-sm text-muted-foreground">Manage your team members and their information.</p>
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead className="hidden sm:table-cell">Department</TableHead>
              <TableHead className="hidden md:table-cell">Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {EMPLOYEES.map((emp) => {
              const status = STATUS_CONFIG[emp.status];
              return (
                <TableRow key={emp.id} className="cursor-pointer" onClick={() => onView(emp.id)}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">{getInitials(emp.name)}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{emp.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{emp.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{emp.department}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">{emp.role}</TableCell>
                  <TableCell>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                          </TooltipTrigger>
                          <TooltipContent>Actions</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            onView(emp.id);
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(emp);
                          }}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------

export default function App() {
  const [view, setView] = useState<View>({ type: 'listing' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | undefined>();

  function openCreate() {
    setEditingEmployee(undefined);
    setDialogOpen(true);
  }

  function openEdit(employee: Employee) {
    setEditingEmployee(employee);
    setDialogOpen(true);
  }

  const currentEmployee = view.type === 'detail' ? EMPLOYEES.find((e) => e.id === view.employeeId) : undefined;

  return (
    <TooltipProvider>
      <AppShell
        branding={{
          name: 'Pandahrms',
          href: '/',
        }}
        navigation={[
          {
            label: 'Dashboard',
            href: '#',
            icon: LayoutDashboard,
          },
          {
            label: 'Employees',
            href: '#',
            icon: Users,
            active: true,
          },
        ]}
        user={{
          name: 'Ahmad Razif',
          email: 'ahmad@pandaworks.com',
          actions: [
            { label: 'Profile', href: '#', icon: User },
            {
              label: 'Sign Out',
              onClick: () => {},
              icon: LogOut,
              variant: 'destructive',
            },
          ],
        }}
        header={
          <div className="flex w-full items-center gap-2">
            <span className="text-sm font-medium">{view.type === 'listing' ? 'Employees' : 'Employee Detail'}</span>
            <div className="ml-auto flex items-center gap-2">
              {view.type === 'listing' && (
                <Button size="sm" onClick={openCreate}>
                  <Plus className="mr-1.5 h-3.5 w-3.5" />
                  Add Employee
                </Button>
              )}
              <ThemeToggle />
            </div>
          </div>
        }
      >
        {view.type === 'listing' && (
          <EmployeeListing onView={(id) => setView({ type: 'detail', employeeId: id })} onEdit={openEdit} />
        )}

        {view.type === 'detail' && currentEmployee && (
          <EmployeeDetail
            employee={currentEmployee}
            onBack={() => setView({ type: 'listing' })}
            onEdit={() => openEdit(currentEmployee)}
          />
        )}

        <EmployeeFormDialog open={dialogOpen} onOpenChange={setDialogOpen} employee={editingEmployee} />
      </AppShell>
    </TooltipProvider>
  );
}
