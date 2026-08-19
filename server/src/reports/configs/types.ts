export interface ReportSectionBlueprint {
  id: string;
  sectionNumber: number;
  title: string;
  subtitle: string;
  category: 'cover' | 'overview' | 'natal' | 'deep-analysis' | 'predictions' | 'remedies' | 'conclusion';
  targetPages: number;
  promptGuidance: string;
}

export interface ReportModularConfig {
  reportType: string;
  title: string;
  subtitle: string;
  targetMinPages: number;
  targetMaxPages: number;
  totalSections: number;
  sections: ReportSectionBlueprint[];
}
