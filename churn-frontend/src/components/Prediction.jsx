import { useLocation, useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { ArrowLeft } from "lucide-react";

function Prediction() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { result, formData } = location.state || {};
   if (!result || !formData) {
    navigate('/');
    return null;
  }

  const handleBack = () => {
    navigate('/');
  };

  const getRiskColor = (risk) => {
    switch(risk?.toLowerCase()) {
      case 'high': return { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-700', chart: '#ef4444' };
      case 'medium': return { bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-700', chart: '#f59e0b' };
      case 'low': return { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-700', chart: '#10b981' };
      default: return { bg: 'bg-gray-50', border: 'border-gray-300', text: 'text-gray-700', chart: '#6b7280' };
    }
  };

  const pieData = [
    { name: 'Churn Risk', value: result.churn_probability * 100 },
    { name: 'Retention', value: (1 - result.churn_probability) * 100 }
  ];

  const barData = [
    { name: 'Tenure', value: Number(formData.tenure), fill: '#3b82f6' },
    { name: 'Monthly', value: Number(formData.MonthlyCharges), fill: '#8b5cf6' },
    { name: 'Contract', value: formData.Contract_One_year || formData.Contract_Two_year ? 100 : 30, fill: '#06b6d4' }
  ];

  const colors = [getRiskColor(result.risk_level).chart, '#d1d5db'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        
        <button
          onClick={handleBack}
          className="mb-6 flex items-center gap-2 text-white hover:text-purple-300 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Form</span>
        </button>

        
        <div className="text-white mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Prediction Dashboard</h1>
          <p className="text-gray-300">Analysis results for customer #{Math.floor(Math.random() * 10000)}</p>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={`lg:col-span-2 ${getRiskColor(result.risk_level).bg} ${getRiskColor(result.risk_level).border} border-2 rounded-2xl p-6 md:p-8 shadow-xl transform hover:scale-[1.02] transition-transform`}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-xs md:text-sm font-medium text-gray-600 mb-2">RISK ASSESSMENT</p>
                <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold ${getRiskColor(result.risk_level).text} mb-2`}>
                  {result.risk_level?.toUpperCase()}
                </h2>
                <p className="text-xl md:text-2xl font-semibold text-gray-700">
                  {(result.churn_probability * 100).toFixed(1)}% Churn Risk
                </p>
              </div>
              <div className="text-5xl md:text-6xl">
                {result.risk_level?.toLowerCase() === 'high' && '⚠️'}
                {result.risk_level?.toLowerCase() === 'medium' && '⚡'}
                {result.risk_level?.toLowerCase() === 'low' && '✅'}
              </div>
            </div>
          </div>

         
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Status</span>
                <span className={`text-sm font-bold ${getRiskColor(result.risk_level).text}`}>
                  {result.churn_prediction}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Confidence</span>
                <span className="text-sm font-bold text-gray-900">
                  {(Math.max(result.churn_probability, 1 - result.churn_probability) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Tenure</span>
                <span className="text-sm font-bold text-gray-900">{formData.tenure} mo</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Monthly</span>
                <span className="text-sm font-bold text-gray-900">${formData.MonthlyCharges}</span>
              </div>
            </div>
          </div>

         
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Churn vs Retention</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2 text-sm">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: colors[0] }}></div>
                <span className="text-gray-600">Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                <span className="text-gray-600">Safe</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Key Factors Analysis</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Prediction;
