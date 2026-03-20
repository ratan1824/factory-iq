export const DASHBOARD_STATS = [
  { label: 'On-Time Delivery', value: '98.2%', change: '+1.2%', status: 'success' },
  { label: 'Quality Yield', value: '99.85%', change: '-0.02%', status: 'warning' },
  { label: 'Capacity Utilization', value: '84%', change: '+5%', status: 'success' },
  { label: 'Pending NRAs', value: '12', change: '-3', status: 'success' },
];

export const PRODUCTION_DATA = [
  { name: 'Mon', output: 4000, plan: 4200 },
  { name: 'Tue', output: 3000, plan: 3200 },
  { name: 'Wed', output: 2000, plan: 2500 },
  { name: 'Thu', output: 2780, plan: 2400 },
  { name: 'Fri', output: 1890, plan: 2100 },
  { name: 'Sat', output: 2390, plan: 2500 },
  { name: 'Sun', output: 3490, plan: 3200 },
];

export interface Program {
  id: string;
  name: string;
  manager: string;
  status: 'Green' | 'Yellow' | 'Red';
  phase: 'R&D' | 'NPI' | 'Production';
  completion: number;
  site: string;
  startDate: string;
  endDate: string;
  milestones: { name: string; date: string; status: 'completed' | 'ongoing' | 'delayed'; actualDate?: string }[];
  history: { date: string; event: string; user: string }[];
  artifacts: { id: string; name: string; type: string; version: string; status: string }[];
  bom: { partNo: string; desc: string; qty: number; vendor: string; status: string }[];
  eco: { id: string; title: string; date: string; impact: string; status: string }[];
  evidence: { id: string; name: string; type: string; date: string; signedBy?: string }[];
}

export const PROGRAMS: Program[] = [
  { 
    id: 'PRJ-001', 
    name: 'NextGen Turbine X1', 
    manager: 'Sarah Chen', 
    status: 'Green', 
    phase: 'Production', 
    completion: 85,
    site: 'Shanghai Giga',
    startDate: '2023-01-10',
    endDate: '2023-12-20',
    milestones: [
      { name: 'Design Freeze', date: '2023-03-01', status: 'completed', actualDate: '2023-03-05' },
      { name: 'Prototype V1', date: '2023-05-15', status: 'completed', actualDate: '2023-05-12' },
      { name: 'Line Setup', date: '2023-08-01', status: 'completed', actualDate: '2023-08-10' },
      { name: 'Final Validation', date: '2023-11-15', status: 'ongoing' },
    ],
    history: [
      { date: '2023-11-01', event: 'Phase Gate Review: Pass', user: 'Admin' },
      { date: '2023-10-15', event: 'BOM Updated to v3.0', user: 'Sarah Chen' },
    ],
    artifacts: [
      { id: 'ART-01', name: 'Main Housing Spec', type: 'PDF', version: '2.4', status: 'Approved' },
      { id: 'ART-02', name: 'Blade Aero CAD', type: 'STEP', version: '1.1', status: 'In Review' },
    ],
    bom: [
      { partNo: 'TX1-001', desc: 'Titanium Rotor Hub', qty: 1, vendor: 'Precision Alloys', status: 'Released' },
      { partNo: 'TX1-042', desc: 'Seal Ring Gasket', qty: 12, vendor: 'Global Seals', status: 'Procuring' },
    ],
    eco: [
      { id: 'ECO-202', title: 'Rotor Tolerance Adjustment', date: '2023-09-12', impact: 'High', status: 'Implemented' },
    ],
    evidence: [
      { id: 'EV-01', name: 'FAT Report - Batch A', type: 'Report', date: '2023-10-20', signedBy: 'Michael Ross' },
      { id: 'EV-02', name: 'Thermal Stress Test', type: 'Video', date: '2023-11-05' },
    ]
  },
  { 
    id: 'PRJ-002', 
    name: 'EV Battery Module B4', 
    manager: 'Michael Ross', 
    status: 'Yellow', 
    phase: 'NPI', 
    completion: 45,
    site: 'Austin Factory',
    startDate: '2023-06-01',
    endDate: '2024-03-15',
    milestones: [
      { name: 'Cell Selection', date: '2023-07-20', status: 'completed' },
      { name: 'Thermal Mockup', date: '2023-10-10', status: 'delayed', actualDate: '2023-11-01' },
      { name: 'Safety Certification', date: '2023-12-01', status: 'ongoing' },
    ],
    history: [
      { date: '2023-11-05', event: 'Thermal Mockup Delayed due to material shortage', user: 'Michael Ross' },
    ],
    artifacts: [],
    bom: [],
    eco: [],
    evidence: []
  },
  { 
    id: 'PRJ-003', 
    name: 'Smart Controller V2', 
    manager: 'David Kim', 
    status: 'Red', 
    phase: 'R&D', 
    completion: 15,
    site: 'Seoul Lab',
    startDate: '2023-09-01',
    endDate: '2024-06-30',
    milestones: [],
    history: [],
    artifacts: [],
    bom: [],
    eco: [],
    evidence: []
  },
  { 
    id: 'PRJ-004', 
    name: 'Industrial Sensor Array', 
    manager: 'Emma Watson', 
    status: 'Green', 
    phase: 'Production', 
    completion: 100,
    site: 'Berlin Plant',
    startDate: '2022-12-01',
    endDate: '2023-08-30',
    milestones: [],
    history: [],
    artifacts: [],
    bom: [],
    eco: [],
    evidence: []
  },
];

export const ALERTS = [
  { id: 1, type: 'critical', title: 'Line 4 Downtime', time: '10m ago', description: 'Hydraulic failure detected in robotic assembly arm.' },
  { id: 2, type: 'warning', title: 'Inventory Low', time: '1h ago', description: 'Component XYZ-99 is below safety stock level.' },
  { id: 3, type: 'info', title: 'Audit Scheduled', time: '4h ago', description: 'ISO 9001 internal audit starting tomorrow at 08:00.' },
];

export const SUPPLY_CHAIN_POS = [
  { id: 'PO-8821', vendor: 'Global Logistics Inc', amount: '$45,000', status: 'Shipped', delivery: '2023-11-20' },
  { id: 'PO-8822', vendor: 'Precision Parts Corp', amount: '$12,300', status: 'Pending', delivery: '2023-11-25' },
  { id: 'PO-8823', vendor: 'Techtronics Ltd', amount: '$8,900', status: 'Delivered', delivery: '2023-11-15' },
];

export const QUALITY_REPORTS = [
  { id: 'NCR-441', date: '2023-11-10', part: 'Turbine Blade A', issue: 'Surface Scratch', status: 'Open' },
  { id: 'CAPA-102', date: '2023-11-05', part: 'Battery Seal', issue: 'Material Degradation', status: 'In Review' },
  { id: 'NCR-439', date: '2023-10-28', part: 'Main Housing', issue: 'Dimensional Variance', status: 'Closed' },
];

export const AFTER_SALES_RMAS = [
  { id: 'RMA-900', customer: 'EnergyCorp', product: 'Turbine X1', date: '2023-11-12', status: 'Received' },
  { id: 'RMA-901', customer: 'AutoBuilders', product: 'Battery Module', date: '2023-11-14', status: 'Repairing' },
  { id: 'RMA-902', customer: 'CityGrid', product: 'Smart Controller', date: '2023-11-16', status: 'Approved' },
];

export const INTEGRATIONS = [
  { name: 'SAP ERP', description: 'Enterprise Resource Planning', status: 'Connected', icon: 'Database' },
  { name: 'Siemens Opcenter', description: 'Manufacturing Execution System', status: 'Connected', icon: 'Settings' },
  { name: 'PTC Windchill', description: 'Product Lifecycle Management', status: 'Offline', icon: 'Layers' },
  { name: 'ETQ Reliance', description: 'Quality Management System', status: 'Connected', icon: 'ShieldCheck' },
];
