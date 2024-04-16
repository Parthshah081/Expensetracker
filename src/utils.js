export const loadExpenses = () => {
    try {
      const serializedExpenses = localStorage.getItem('expenses');
      if (serializedExpenses === null) {
        return undefined;
      }
      return JSON.parse(serializedExpenses);
    } catch (err) {
      console.error('Error loading expenses:', err);
      return undefined;
    }
  };
  
  export const saveExpenses = (expenses) => {
    try {
      const serializedExpenses = JSON.stringify(expenses);
      localStorage.setItem('expenses', serializedExpenses);
    } catch (err) {
      console.error('Error saving expenses:', err);
    }
  };
  