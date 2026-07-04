// /Custom Hooks
// - start with use
// - can call other hooks
// - return value that compotent can use.
// - encalpulate the logic.

// e.g
const userProfile = ()=>{
    const [user,setUser]=useState();
    const [error,setError]=useState();
    const [loading,setLoading]=useState(false);
    
    
    };

    /**
     * - First, always start with use
     * - only call at top level of your component or custom hook
     * - only call from React function component or custom hook
     * - keep them focused.
     * 
     --when to use custom hooks?
      - you are copying usestate/useEffect logic between components
      - A component has more than 3-4 useState calls.
      - Your useEffectis doing multiple unrelated things.
      - You have complex state calucations happening in your component.
      - You're managing localstorage or API calls directly in component.


      Expense Tracker
      complex state management (expense,category,filters)
      localstorage persistence(saving/loading data)
      calculation logic (total, filtering)
      form handing (addming new expense)

      
     */