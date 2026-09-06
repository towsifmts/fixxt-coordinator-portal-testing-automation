export const AGENCY_ID = '25111044';

export const providerTestData = {
  verifiedAbn: '70 138 591 901',

  firstName: 'Test',
  lastName: 'Provider002',

  email: 'test.provider@example.com',

  mobile: '0430000000',

  phone: '0399999999',
  
  mainstreamSupportType: 'Mainstream',

  mainstreamServiceTypes: [
    'Health / Medical Services (e.g. GP, hospital, pharmacy)',
    'Government Services (e.g. Justice, Child Protection, Education, Health)',
    'Charities / Community Organisations',
  ],

  ndisSupportType: 'NDIS Support',

  ndisServiceTypes: [
    'Personal Care / Daily Living',
    'Domestic Assistance / Cleaning',
    'Community Access / Social & Recreational Support',
  ],

  specialisations: [
    'Behavioural Support (BSP)',
    'Mental Health',
    'Health',
  ],
};

export const abnVerify = {
  verifiedAbn: providerTestData.verifiedAbn.replace(/\s/g, ''),
};

export const providerStatusOptions = [
  'Available',
  'Not recommended',
  'Onboarded',
  'Waitlist',
] as const;

export const selectedProviderStatus = 'Available';

export const providerSupportTypeOptions = [
  {
    value: 'SUPPORT_TYPE_INFORMAL',
    label: 'Informal',
  },
  {
    value: 'SUPPORT_TYPE_MAINSTREAM',
    label: 'Mainstream',
  },
  {
    value: 'SUPPORT_TYPE_NDIS',
    label: 'NDIS Support',
  },
] as const;

export const selectedProviderSupportType = {
  value: 'SUPPORT_TYPE_NDIS',
  label: 'NDIS Support',
};

export const providerSpecialisationOptions = [
  {
    value: 'PROVIDER_SPCL_BSP',
    label: 'Behavioural Support (BSP)',
  },
  {
    value: 'PROVIDER_SPCL_SIL',
    label: 'Supported Independent Living (SIL)',
  },
  {
    value: 'PROVIDER_SPCL_HEALTH',
    label: 'Health',
  },
  {
    value: 'PROVIDER_SPCL_JUSTICE',
    label: 'Justice',
  },
  {
    value: 'PROVIDER_SPCL_HOUSING',
    label: 'Housing',
  },
  {
    value: 'PROVIDER_SPCL_EDUCATION',
    label: 'Education',
  },
  {
    value: 'PROVIDER_SPCL_MENTAL_HEALTH',
    label: 'Mental Health',
  },
  {
    value: 'PROVIDER_SPCL_GUARDIANSHIP',
    label: 'Guardianship',
  },
  {
    value: 'PROVIDER_SPCL_CALD',
    label: 'Cultural and Linguistic Diversity (CALD)',
  },
  {
    value: 'PROVIDER_SPCL_CPCS',
    label: 'Child Protection and Children’s Service',
  },
  {
    value: 'PROVIDER_SPCL_ADAPTIVE',
    label: 'Adaptive Equipment',
  },
  {
    value: 'PROVIDER_SPCL_ASSITIVE',
    label: 'Assistive Technology',
  },
  {
    value: 'PROVIDER_SPCL_TRANSITION',
    label: 'Transitions/Discharge from other support systems – hospital/prison',
  },
] as const;

export const ndisServiceTypesOptions = [
    'Personal Care / Daily Living',
    'Domestic Assistance / Cleaning',
    'Community Access / Social & Recreational Support',
    'Transport Services',
    'Allied Health (General)',
    'Occupational Therapy',
    'Physiotherapy',
    'Psychology / Counselling',
    'Speech Pathology',
    'Behaviour Support',
    'Exercise Physiology',
    'Dietitian / Nutrition Services',
    'Other Therapy',
    'Support Coordination',
    'Plan Management',
    'Housing / SIL / ILO Providers',
    'Respite / Short-Term Accommodation',
    'Employment / DES Providers',
    'Equipment / Assistive Technology / Home Modifications',
] as const;

export const mainstreamServiceTypesOptions = [
    'Health / Medical Services (e.g. GP, hospital, pharmacy)',
    'Government Services (e.g. Justice, Child Protection, Education, Health)',
    'Charities / Community Organisations',
    'Public Guardians / Trustees',
    'Advocacy Services',
    'Legal / Financial / Administrative Services',
] as const;