import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockApi } from "../data/mockData";
import { generateMockChartData } from "@/utils/exportUtils";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const { user } = useAuth();

  const { data: batches = [] } = useQuery({
    queryKey: ["batches"],
    queryFn: () => mockApi.getBatches()
  });

  const { data: stats = { totalStudents: 0, presentToday: 0, activeBatches: 0, attendanceRate: 0 } } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => mockApi.getDashboardStats()
  });

  // Generate mock chart data for dashboard
  const { trendData } = generateMockChartData();

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <main className="max-w-7xl mx-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-800" data-testid="heading-dashboard">
                  Dashboard Overview
                </h2>
                <p className="text-slate-600 mt-1">Welcome back, monitor your classes and attendance</p>
              </div>
              <Button className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors font-medium" data-testid="button-quick-scan">
                <i className="fas fa-qrcode mr-2"></i>
                Quick Scan
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white shadow-sm border border-slate-200" data-testid="card-total-students">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 text-sm">Total Students</p>
                      <p className="text-2xl font-bold text-slate-800" data-testid="stat-total-students">
                        {stats.totalStudents}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <i className="fas fa-user-graduate text-blue-600 text-xl"></i>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center space-x-2">
                    <span className="text-emerald-600 text-sm">↗ 12%</span>
                    <span className="text-slate-500 text-sm">vs last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border border-slate-200" data-testid="card-present-today">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 text-sm">Present Today</p>
                      <p className="text-2xl font-bold text-slate-800" data-testid="stat-present-today">
                        {stats.presentToday}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <i className="fas fa-check-circle text-emerald-600 text-xl"></i>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center space-x-2">
                    <span className="text-emerald-600 text-sm">{stats.attendanceRate}%</span>
                    <span className="text-slate-500 text-sm">attendance rate</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border border-slate-200" data-testid="card-active-batches">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 text-sm">Active Batches</p>
                      <p className="text-2xl font-bold text-slate-800" data-testid="stat-active-batches">
                        {stats.activeBatches}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <i className="fas fa-users text-purple-600 text-xl"></i>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center space-x-2">
                    <span className="text-slate-600 text-sm">All sessions</span>
                    <span className="text-emerald-600 text-sm">running</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border border-slate-200" data-testid="card-weekly-average">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 text-sm">Weekly Average</p>
                      <p className="text-2xl font-bold text-slate-800" data-testid="stat-weekly-average">
                        87%
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <i className="fas fa-chart-line text-orange-600 text-xl"></i>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center space-x-2">
                    <span className="text-emerald-600 text-sm">↗ 3%</span>
                    <span className="text-slate-500 text-sm">improvement</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Attendance Chart & Batch Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white shadow-sm border border-slate-200" data-testid="card-attendance-chart">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Attendance Trend (7 Days)</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis 
                          dataKey="date" 
                          stroke="#64748b"
                          fontSize={12}
                        />
                        <YAxis 
                          stroke="#64748b"
                          fontSize={12}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="attendanceRate" 
                          stroke="#3b82f6" 
                          strokeWidth={3}
                          dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                          name="Attendance Rate (%)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border border-slate-200" data-testid="card-batch-overview">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Batch Overview</h3>
                  <div className="space-y-4">
                    {batches.length > 0 ? (
                      batches.slice(0, 2).map((batch) => (
                        <div key={batch.id} className="p-4 border border-slate-200 rounded-xl" data-testid={`batch-overview-${batch.id}`}>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-slate-800">{batch.name}</h4>
                            <span className={`px-2 py-1 text-xs rounded-lg ${
                              batch.isActive 
                                ? 'bg-emerald-100 text-emerald-700' 
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {batch.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-600">Students enrolled</span>
                            <span className="text-emerald-600 font-medium">0</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-slate-500">
                        <i className="fas fa-users text-4xl mb-4"></i>
                        <p>No batches created yet</p>
                      </div>
                    )}
                  </div>
                  
                  <Button variant="ghost" className="w-full mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium" data-testid="button-view-all-batches">
                    View All Batches →
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
    </div>
  );
}