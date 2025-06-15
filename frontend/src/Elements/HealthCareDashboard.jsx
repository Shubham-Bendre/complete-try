import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Calendar,
  CheckCircle,
  Plus,
  Bell,
  User,
  Shield,
  HeartPulse,
  AlertCircle,
  Home,
  FileText,
  Settings
} from 'lucide-react';
import { Button } from "@/components/ui/button";
// import { GetChildren, GetUpcomingVaccines, GetVaccineStats } from '../api';

export default function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [children, setChildren] = useState([]);
  const [upcomingVaccines, setUpcomingVaccines] = useState([]);
  const [stats, setStats] = useState({
    totalChildren: 0,
    upcomingCount: 0,
    completedCount: 0,
    overdueCount: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [childrenData, vaccinesData, statsData] = await Promise.all([
          GetChildren(),
          GetUpcomingVaccines(),
          GetVaccineStats()
        ]);

        setChildren(childrenData);
        setUpcomingVaccines(vaccinesData);
        setStats({
          totalChildren: statsData.totalChildren,
          upcomingCount: statsData.upcomingVaccines,
          completedCount: statsData.completedVaccines,
          overdueCount: statsData.overdueVaccines
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const sidebarItems = [
    { name: 'Dashboard', icon: Home },
    { name: 'Children', icon: Users },
    { name: 'Vaccination Records', icon: FileText },
    { name: 'Appointments', icon: Calendar },
    { name: 'Health Records', icon: HeartPulse },
    { name: 'Settings', icon: Settings }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r hidden md:block">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900">VaxTrack</h1>
              <p className="text-sm text-gray-500">Parent Portal</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === item.name
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Profile</h2>
            </div>
            <div className="flex items-center space-x-4">
              <button aria-label="Notifications">
                <Bell className="h-5 w-5 text-gray-400" />
              </button>
              {/* Profile Icon Navigation */}
              <button
                onClick={() => navigate('/profile-page')}
                className="flex items-center space-x-2"
                aria-label="Profile"
              >
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-indigo-600" />
                </div>
                <span className="hidden md:inline text-sm">Profile</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {activeTab === 'Dashboard' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <StatCard
                  icon={<Users className="h-6 w-6" />}
                  title="Registered Children"
                  value={stats.totalChildren}
                  color="blue"
                />
                <StatCard
                  icon={<Calendar className="h-6 w-6" />}
                  title="Upcoming Vaccines"
                  value={stats.upcomingCount}
                  color="yellow"
                />
                <StatCard
                  icon={<CheckCircle className="h-6 w-6" />}
                  title="Completed Vaccines"
                  value={stats.completedCount}
                  color="green"
                />
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Button onClick={() => navigate('/employee')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Child
                </Button>
                <Button variant="outline" onClick={() => navigate('/vaccine-schedule')}>
                  <Shield className="h-4 w-4 mr-2" />
                  Vaccine Schedule
                </Button>
                <Button variant="outline" onClick={() => navigate('/health-records')}>
                  <HeartPulse className="h-4 w-4 mr-2" />
                  Health Records
                </Button>
              </div>

              {/* Children List */}
              <Section title="My Children" className="mb-8">
                {children.length > 0 ? (
                  <div className="space-y-3">
                    {children.map(child => (
                      <ChildCard
                        key={child.id}
                        child={child}
                        onClick={() => navigate(`/child/${child.id}`)}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    message="No children registered yet"
                    actionText="Add First Child"
                    onAction={() => navigate('/employee')}
                  />
                )}
              </Section>

              {/* Upcoming Vaccines */}
              <Section title="Upcoming Vaccinations">
                {upcomingVaccines.length > 0 ? (
                  <div className="space-y-3">
                    {upcomingVaccines.map(vaccine => (
                      <VaccineCard
                        key={vaccine.id}
                        vaccine={vaccine}
                        onSchedule={() => navigate(`/schedule/${vaccine.id}`)}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    message="No upcoming vaccinations"
                    actionText="View Full Schedule"
                    onAction={() => navigate('/vaccine-schedule')}
                  />
                )}
              </Section>
            </>
          )}

          {activeTab !== 'Dashboard' && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900">{activeTab} View</h3>
              <p className="text-gray-500 mt-2">This section is under development</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// Reusable Components (same as before)
function StatCard({ icon, title, value, color }) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    green: 'bg-green-100 text-green-600',
    red: 'bg-red-100 text-red-600'
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex items-center space-x-4">
        <div className={`p-2 rounded-full ${colorClasses[color]}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children, className = '' }) {
  return (
    <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
}

function ChildCard({ child, onClick }) {
  return (
    <div
      className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center">
            {child.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-medium">{child.name}</h3>
            <p className="text-sm text-gray-500">
              Age: {child.age} • {child.vaccinesCompleted}/{child.vaccinesTotal} vaccines
            </p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs ${child.vaccinesCompleted === child.vaccinesTotal
            ? 'bg-green-100 text-green-800'
            : 'bg-yellow-100 text-yellow-800'
          }`}>
          {child.vaccinesCompleted === child.vaccinesTotal ? 'Complete' : 'In Progress'}
        </div>
      </div>
    </div>
  );
}

function VaccineCard({ vaccine, onSchedule }) {
  const isOverdue = new Date(vaccine.dueDate) < new Date();

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{vaccine.childName}</h3>
          <p className="text-sm text-gray-600">{vaccine.vaccineName}</p>
          <div className="flex items-center mt-1">
            <Calendar className="h-4 w-4 text-gray-400 mr-1" />
            <span className={`text-sm ${isOverdue ? 'text-red-600' : 'text-gray-500'
              }`}>
              Due: {new Date(vaccine.dueDate).toLocaleDateString()}
              {isOverdue && (
                <span className="ml-2 inline-flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Overdue
                </span>
              )}
            </span>
          </div>
        </div>
        <Button size="sm" onClick={onSchedule}>
          Schedule
        </Button>
      </div>
    </div>
  );
}

function EmptyState({ message, actionText, onAction }) {
  return (
    <div className="text-center py-8 text-gray-500">
      <p>{message}</p>
      <Button
        variant="link"
        className="mt-2"
        onClick={onAction}
      >
        {actionText}
      </Button>
    </div>
  );
}