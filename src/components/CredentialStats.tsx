
import { Credential, UserCredential } from "@/types";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip 
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CredentialStatsProps {
  credentials: UserCredential[] | Credential[];
}

const CredentialStats = ({ credentials }: CredentialStatsProps) => {
  // Data for the fraud status pie chart
  const fraudStats = [
    { name: "Valid", value: credentials.filter(c => c.fraudStatus === "Valid").length || 0 },
    { name: "Suspicious", value: credentials.filter(c => c.fraudStatus === "Suspicious").length || 0 },
    { name: "Unchecked", value: credentials.filter(c => !c.fraudStatus).length || 0 }
  ].filter(stat => stat.value > 0);
  
  // Colors for the pie chart
  const COLORS = ["#4ade80", "#f87171", "#94a3b8"];
  
  // Data for the score trend line chart
  const scoreData = credentials
    .filter(c => typeof c.score === 'number')
    .map(c => ({
      name: c.name.length > 15 ? c.name.substring(0, 15) + "..." : c.name,
      score: c.score || 0
    }));
  
  // Calculate overall stats
  const totalCredentials = credentials.length;
  const validCredentials = credentials.filter(c => c.fraudStatus === "Valid").length || 0;
  const averageScore = scoreData.length > 0 
    ? Math.round(scoreData.reduce((acc, curr) => acc + curr.score, 0) / scoreData.length) 
    : 0;
  const validPercentage = totalCredentials > 0 
    ? Math.round((validCredentials / totalCredentials) * 100) 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Credential Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-primary/10 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Credentials</p>
              <h3 className="text-2xl font-bold">{totalCredentials}</h3>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Valid Credentials</p>
              <h3 className="text-2xl font-bold">{validPercentage}%</h3>
            </div>
            <div className="bg-blue-500/10 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Average Score</p>
              <h3 className="text-2xl font-bold">{averageScore}</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fraud Status Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Credential Verification Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={fraudStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {fraudStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Score Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Credential Score Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scoreData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CredentialStats;
