import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import Card from './Card.jsx';
import './WeightChart.css';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const row = payload[0]?.payload;
  return (
    <div className="weight-chart__tooltip">
      <p>{label}</p>
      <strong>{payload[0].value} kg</strong>
      {row?.note ? <span>{row.note}</span> : null}
    </div>
  );
}

export default function WeightChart({ data = [] }) {
  if (!data.length) {
    return (
      <Card className="weight-chart">
        <p className="weight-chart__label">Weight history</p>
        <p className="weight-chart__empty">
          Log a few weigh-ins to see your gentle trend here. One or two points
          are still useful — the line grows with you.
        </p>
      </Card>
    );
  }

  const weights = data.map((d) => d.weightKg);
  const min = Math.min(...weights);
  const max = Math.max(...weights);
  const pad = Math.max(0.5, (max - min) * 0.35 || 0.8);

  return (
    <Card className="weight-chart">
      <p className="weight-chart__label">Weight history</p>
      <div className="weight-chart__canvas">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            data={data}
            margin={{ top: 8, right: 4, left: 0, bottom: 0 }}
          >
            <CartesianGrid stroke="rgba(90,70,62,0.08)" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: '#9a8a84', fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
              minTickGap={36}
            />
            <YAxis
              domain={[min - pad, max + pad]}
              tick={{ fill: '#9a8a84', fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              width={36}
              tickFormatter={(v) => Number(v).toFixed(1)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="weightKg"
              stroke="#c4787a"
              strokeWidth={2.5}
              dot={{ r: 3.5, fill: '#c4787a', strokeWidth: 0 }}
              activeDot={{ r: 5 }}
              isAnimationActive={data.length > 1}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {data.length === 1 ? (
        <p className="weight-chart__hint">
          First point logged — add more over time to see the curve.
        </p>
      ) : null}
    </Card>
  );
}
