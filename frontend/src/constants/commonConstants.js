export const MONTH_COLUMN = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
  ];

export const PRIMARY_STATISTICS_CUSTOM = [
    'monthly_currentYear',
    'overall_currentYear',
    'monthly_lastYear',
    'overall_lastYear',
  ];
  
  export const STATISTIC_DEFINITIONS_CUSTOM = {
    monthly_currentYear: {
      displayName: 'Monthlhy currentYear',
      format: 'int',
    },
    overall_currentYear: {
      displayName: 'Overall currentYear',
      format: 'int',
    },
    monthly_lastYear: {
      displayName: 'Monthlhy lastYear',
      format: 'int',
    },
    overall_lastYear: {
      displayName: 'Overall lastYear',
      format: 'int',
    },
  };
  
  export const EXPENSE_DEFINITIONS = {
    monthly_currentYear: {
      displayName: 'Expenses in currentYear',
      color: '#ff073a',
    },
    monthly_lastYear: {
      displayName: 'Expenses in lastYear',
      color: '#007bff',
    },
    recursive: {
      displayName: 'Recursive Expenses',
      color: '#28a745',
    },
    onetime: {
      displayName: 'One time Expenses',
      color: '#6c757d',
    },
    must: {
      displayName: 'Must Spend',
      color: '#6c757d',
    },
    nice: {
      displayName: 'Nice to Spend',
      color: '#4b1eaa',
    },
    zing_cc: {
      displayName: 'Zing Credit Card',
      color: '#fb5581',
    },
    zing_hdfc: {
      displayName: 'Zing HDFC Debit Card',
      color: '#fb5581',
    },
    zing_current: {
      displayName: 'Google Pay',
      color: '#fb5581',
    },
    pinky_hdfc: {
      displayName: 'Pinky HDFC Debit Card',
      color: '#fb5581',
    },
    pinky_canara: {
      displayName: 'Pinky Canara Card',
      color: '#fb5581',
    },
    family_expenses: {
      displayName: 'Family',
      color: '#fb5581',
    },
    zing_expenses: {
      displayName: 'Zing',
      color: '#fb5581',
    },
    pinky_expenses: {
      displayName: 'Pinky',
      color: '#fb5581',
    },
    saket_expenses: {
      displayName: 'Saket',
      color: '#fb5581',
    },
    stuti_expenses: {
      displayName: 'Stuti',
      color: '#fb5581',
    },
  };

  export const EXPENSE_CATEGORY = {
    RM: 'Regular Expenses',
    GR: 'Grocery',
    OT: 'One Time',
    CL: 'Clothing',
    HO: 'Hotel',
    ME: 'Medical',
    TT: 'Grand Total',
    LT: 'Local Transport',
    ED: 'Education',
    DO: 'Donation',
    GF: 'Gift',
    YR: 'Yearly',
    TR: 'Travel',
  };
  
  export const TABLE_COLUMNS = [
    'monthly_currentYear',
    'monthly_lastYear',
    'recursive',
    'onetime',
    'must', 
    'nice',
    'zing_cc',
    'zing_hdfc',
    'zing_current',
    'pinky_hdfc',
    'pinky_canara',
    'family_expenses',
    'zing_expenses',
    'pinky_expenses',
    'saket_expenses',
    'stuti_expenses',
  ];

  export var monthlyExpenses = [
    {month:'', expense:0},
    {month:'', expense:0},
    {month:'', expense:0},
    {month:'', expense:0},
    {month:'', expense:0},
    {month:'', expense:0},
    {month:'', expense:0},
    {month:'', expense:0},
    {month:'', expense:0},
    {month:'', expense:0},
    {month:'', expense:0},
    {month:'', expense:0},
  ]; 

  export var summaryExpense  = {
      delta: {monthly_currentYear:0, overall_currentYear:0, monthly_lastYear:0, monthly_lastYear:0},
      total: {monthly_currentYear:0, overall_currentYear:0, monthly_lastYear:0, monthly_lastYear:0},
      current:0,
      availableBalance:0,
  }

  export var expenseDetails = {
    RM:{
      delta:{
        monthly_currentYear:0, monthly_lastYear:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,family_expenses:0, zing_expenses:0, pinky_expenses:0,saket_expenses:0, stuti_expenses:0,
      },
      total:{
        monthly_currentYear:0, monthly_lastYear:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,family_expenses:0, zing_expenses:0, pinky_expenses:0,saket_expenses:0, stuti_expenses:0,
      },
    },
    GR:{
      delta:{
        monthly_currentYear:0, monthly_lastYear:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,family_expenses:0, zing_expenses:0, pinky_expenses:0,saket_expenses:0, stuti_expenses:0,
      },
      total:{
        monthly_currentYear:0, monthly_lastYear:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,family_expenses:0, zing_expenses:0, pinky_expenses:0,saket_expenses:0, stuti_expenses:0,
      },
    },
    OT:{
      delta:{
        monthly_currentYear:0, monthly_lastYear:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,family_expenses:0, zing_expenses:0, pinky_expenses:0,saket_expenses:0, stuti_expenses:0,
      },
      total:{
        monthly_currentYear:0, monthly_lastYear:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,family_expenses:0, zing_expenses:0, pinky_expenses:0,saket_expenses:0, stuti_expenses:0,
      },
    },
    CL:{
      delta:{
        monthly_currentYear:0, monthly_lastYear:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,family_expenses:0, zing_expenses:0, pinky_expenses:0,saket_expenses:0, stuti_expenses:0,
      },
      total:{
        monthly_currentYear:0, monthly_lastYear:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,family_expenses:0, zing_expenses:0, pinky_expenses:0,saket_expenses:0, stuti_expenses:0,
      },
    },
    HO:{
      delta:{
        monthly_currentYear:0, monthly_lastYear:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,family_expenses:0, zing_expenses:0, pinky_expenses:0,saket_expenses:0, stuti_expenses:0,
      },
      total:{
        monthly_currentYear:0, monthly_lastYear:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,family_expenses:0, zing_expenses:0, pinky_expenses:0,saket_expenses:0, stuti_expenses:0,
      },
    },
    ME:{
      delta:{
        monthly_currentYear:0, monthly_lastYear:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,family_expenses:0, zing_expenses:0, pinky_expenses:0,saket_expenses:0, stuti_expenses:0,
      },
      total:{
        monthly_currentYear:0, monthly_lastYear:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,family_expenses:0, zing_expenses:0, pinky_expenses:0,saket_expenses:0, stuti_expenses:0,
      },
    },
    LT:{
      delta:{
        monthly_currentYear:0, monthly_lastYear:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,family_expenses:0, zing_expenses:0, pinky_expenses:0,saket_expenses:0, stuti_expenses:0,
      },
      total:{
        monthly_currentYear:0, monthly_lastYear:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,family_expenses:0, zing_expenses:0, pinky_expenses:0,saket_expenses:0, stuti_expenses:0,
      },
    },
    ED:{
      delta:{
        monthly_currentYear:0, monthly_lastYear:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,family_expenses:0, zing_expenses:0, pinky_expenses:0,saket_expenses:0, stuti_expenses:0,
      },
      total:{
        monthly_currentYear:0, monthly_lastYear:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,family_expenses:0, zing_expenses:0, pinky_expenses:0,saket_expenses:0, stuti_expenses:0,
      },
    },
    DO:{
      delta:{
        monthly_currentYear:0, monthly_lastYear:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,family_expenses:0, zing_expenses:0, pinky_expenses:0,saket_expenses:0, stuti_expenses:0,
      },
      total:{
        monthly_currentYear:0, monthly_lastYear:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,family_expenses:0, zing_expenses:0, pinky_expenses:0,saket_expenses:0, stuti_expenses:0,
      },
    },
    TT:{
      delta:{
        monthly_currentYear:0, monthly_lastYear:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,family_expenses:0, zing_expenses:0, pinky_expenses:0,saket_expenses:0, stuti_expenses:0,
      },
      total:{
        monthly_currentYear:0, monthly_lastYear:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,family_expenses:0, zing_expenses:0, pinky_expenses:0,saket_expenses:0, stuti_expenses:0,
      },
    },
    GF:{
      delta:{
        monthly_currentYear:0, monthly_lastYear:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,family_expenses:0, zing_expenses:0, pinky_expenses:0,saket_expenses:0, stuti_expenses:0,
      },
      total:{
        monthly_currentYear:0, monthly_lastYear:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,family_expenses:0, zing_expenses:0, pinky_expenses:0,saket_expenses:0, stuti_expenses:0,
      },
    },
    YR:{
      delta:{
        monthly_currentYear:0, monthly_lastYear:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,family_expenses:0, zing_expenses:0, pinky_expenses:0,saket_expenses:0, stuti_expenses:0,
      },
      total:{
        monthly_currentYear:0, monthly_lastYear:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,family_expenses:0, zing_expenses:0, pinky_expenses:0,saket_expenses:0, stuti_expenses:0,
      },
    },
    TR:{
      delta:{
        monthly_currentYear:0, monthly_lastYear:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,family_expenses:0, zing_expenses:0, pinky_expenses:0,saket_expenses:0, stuti_expenses:0,
      },
      total:{
        monthly_currentYear:0, monthly_lastYear:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,family_expenses:0, zing_expenses:0, pinky_expenses:0,saket_expenses:0, stuti_expenses:0,
      },
    },
  };
  
  
  
  
