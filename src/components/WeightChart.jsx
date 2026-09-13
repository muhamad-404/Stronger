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
import { usePrefersReducedMotion } from '../hooks/useDialogA11y.js';
import './WeightChart.css';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const row = payload[0]?.payload;
  return (
    <div className="weight-chart__tooltip" role="status">
      <p>{label}</p>
      <strong>{payload[0].value} kg</strong>
      {row?.note ? <span>{row.note}</span> : null}
    </div>
  );
}

export default function WeightChart({ data = [] }) {
  const reduceMotion = usePrefersReducedMotion();

  if (!data.length) {
    return (
      <Card className="weight-chart">
        <h2 className="weight-chart__label">Weight history</h2>
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
  const first = data[0];
  const last = data[data.length - 1];
  const summary = `Weight history chart with ${data.length} entries. Latest ${last.weightKg} kg on ${last.label}. Started at ${first.weightKg} kg on ${first.label}. Range ${min.toFixed(1)} to ${max.toFixed(1)} kg.`;

  return (
    <Card className="weight-chart">
      <h2 className="weight-chart__label" id="weight-chart-heading">
        Weight history
      </h2>
      <p className="visually-hidden" id="weight-chart-summary">
        {summary}
      </p>
      <div
        className="weight-chart__canvas"
        role="img"
        aria-labelledby="weight-chart-heading"
        aria-describedby="weight-chart-summary"
      >
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            data={data}
            margin={{ top: 8, right: 4, left: 0, bottom: 0 }}
          >
            <CartesianGrid stroke="rgba(90,70,62,0.08)" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: 'var(--color-text-soft)', fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
              minTickGap={36}
            />
            <YAxis
              domain={[min - pad, max + pad]}
              tick={{ fill: 'var(--color-text-soft)', fontSize: 11 }}
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
              isAnimationActive={!reduceMotion && data.length > 1}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <details className="weight-chart__table-wrap">
        <summary className="weight-chart__table-summary">View as table</summary>
        <table className="weight-chart__table">
          <caption className="visually-hidden">Weight log entries</caption>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Weight (kg)</th>
              <th scope="col">Note</th>
            </tr>
          </thead>
          <tbody>
            {[...data].reverse().map((row) => (
              <tr key={`${row.label}-${row.weightKg}-${row.note || ''}`}>
                <td>{row.label}</td>
                <td>{row.weightKg}</td>
                <td>{row.note || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
      {data.length === 1 ? (
        <p className="weight-chart__hint">
          First point logged — add more over time to see the curve.
        </p>
      ) : null}
    </Card>
  );
}
