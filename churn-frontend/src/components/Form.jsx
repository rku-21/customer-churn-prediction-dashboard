import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Form() {
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    tenure: "",
    MonthlyCharges: "",
    TotalCharges: "",
    Contract_One_year: '',
    Contract_Two_year: '',
    InternetService_Fiber_optic: '',
    OnlineSecurity_Yes: '',
    TechSupport_Yes: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name.includes("_") ? Number(value) : value });
    
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: null });
    }
    setError(null);
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    validateField(field);
  };

  const validateField = (field) => {
    let error = null;
    
    if (field === 'tenure' || field === 'MonthlyCharges' || field === 'TotalCharges') {
      if (!form[field]) {
        error = 'This field is required';
      } else if (form[field] < 0) {
        error = 'Value cannot be negative';
      }
    } else {
      if (form[field] === '') {
        error = 'Please select an option';
      }
    }
    
    setFieldErrors({ ...fieldErrors, [field]: error });
    return !error;
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;
    ['tenure', 'MonthlyCharges', 'TotalCharges'].forEach(field => {
      if (!form[field]) {
        errors[field] = 'This field is required';
        isValid = false;
      } else if (form[field] < 0) {
        errors[field] = 'Value cannot be negative';
        isValid = false;
      }
    });
    ['Contract_One_year', 'Contract_Two_year', 'InternetService_Fiber_optic', 
     'OnlineSecurity_Yes', 'TechSupport_Yes'].forEach(field => {
      if (form[field] === '') {
        errors[field] = 'Please select an option';
        isValid = false;
      }
    });

    setFieldErrors(errors);
    return isValid;
  };

  const predictChurn = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
     
      const apiUrl = import.meta.env.VITE_API_URL || window.location.origin;
      const res = await fetch(`${apiUrl}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tenure: Number(form.tenure),
          MonthlyCharges: Number(form.MonthlyCharges),
          TotalCharges: Number(form.TotalCharges)
        })
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
     navigate('/prediction', { state: { result: data, formData: form } });
      
    } catch (err) {
      setError(err.message || "Failed to connect to prediction service. Make sure the API is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-2xl">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Customer Churn Prediction
          </h1>
          <p className="text-gray-500 text-sm">Enter customer details to predict churn risk</p>
        </div>

        <div className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tenure (months) *
              </label>
              <input 
                type="number"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition ${
                  fieldErrors.tenure 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-purple-500'
                }`}
                name="tenure" 
                placeholder="e.g., 12" 
                value={form.tenure}
                onChange={handleChange}
                onBlur={() => handleBlur('tenure')}
                min="0"
              />
              {fieldErrors.tenure && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.tenure}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Charges ($) *
              </label>
              <input 
                type="number"
                step="0.01"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition ${
                  fieldErrors.MonthlyCharges 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-purple-500'
                }`}
                name="MonthlyCharges" 
                placeholder="e.g., 79.99" 
                value={form.MonthlyCharges}
                onChange={handleChange}
                onBlur={() => handleBlur('MonthlyCharges')}
                min="0"
              />
              {fieldErrors.MonthlyCharges && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.MonthlyCharges}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Charges ($) *
              </label>
              <input 
                type="number"
                step="0.01"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition ${
                  fieldErrors.TotalCharges 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-purple-500'
                }`}
                name="TotalCharges" 
                placeholder="e.g., 1250.50" 
                value={form.TotalCharges}
                onChange={handleChange}
                onBlur={() => handleBlur('TotalCharges')}
                min="0"
              />
              {fieldErrors.TotalCharges && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.TotalCharges}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                One Year Contract *
              </label>
              <select 
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition bg-white ${
                  fieldErrors.Contract_One_year 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-purple-500'
                }`}
                name="Contract_One_year" 
                onChange={handleChange}
                onBlur={() => handleBlur('Contract_One_year')}
                value={form.Contract_One_year}
              >
                <option value="">-- Select --</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
              {fieldErrors.Contract_One_year && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.Contract_One_year}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Two Year Contract *
              </label>
              <select 
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition bg-white ${
                  fieldErrors.Contract_Two_year 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-purple-500'
                }`}
                name="Contract_Two_year" 
                onChange={handleChange}
                onBlur={() => handleBlur('Contract_Two_year')}
                value={form.Contract_Two_year}
              >
                <option value="">-- Select --</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
              {fieldErrors.Contract_Two_year && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.Contract_Two_year}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fiber Optic Internet *
              </label>
              <select 
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition bg-white ${
                  fieldErrors.InternetService_Fiber_optic 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-purple-500'
                }`}
                name="InternetService_Fiber_optic" 
                onChange={handleChange}
                onBlur={() => handleBlur('InternetService_Fiber_optic')}
                value={form.InternetService_Fiber_optic}
              >
                <option value="">-- Select --</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
              {fieldErrors.InternetService_Fiber_optic && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.InternetService_Fiber_optic}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Online Security *
              </label>
              <select 
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition bg-white ${
                  fieldErrors.OnlineSecurity_Yes 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-purple-500'
                }`}
                name="OnlineSecurity_Yes" 
                onChange={handleChange}
                onBlur={() => handleBlur('OnlineSecurity_Yes')}
                value={form.OnlineSecurity_Yes}
              >
                <option value="">-- Select --</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
              {fieldErrors.OnlineSecurity_Yes && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.OnlineSecurity_Yes}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tech Support *
              </label>
              <select 
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition bg-white ${
                  fieldErrors.TechSupport_Yes 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-purple-500'
                }`}
                name="TechSupport_Yes" 
                onChange={handleChange}
                onBlur={() => handleBlur('TechSupport_Yes')}
                value={form.TechSupport_Yes}
              >
                <option value="">-- Select --</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
              {fieldErrors.TechSupport_Yes && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.TechSupport_Yes}</p>
              )}
            </div>
          </div>

          <button
            onClick={predictChurn}
            disabled={loading}
            className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-semibold shadow-lg"
          >
            {loading ? "Predicting..." : "Predict Churn"}
          </button>

          {error && (
            <div className="mt-4 p-4 rounded-lg bg-red-50 border border-red-200">
              <p className="text-red-600 text-sm font-medium flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Form;
