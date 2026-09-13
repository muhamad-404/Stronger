import { Link } from 'react-router-dom';
import Card from './Card.jsx';
import { formatKg } from '../utils/dates.js';
import './WeeklyReviewCard.css';

export default function WeeklyReviewCard({ review }) {
  if (!review) return null;

  const weightChange = review.weight?.changeKg;
  const changeLabel =
    weightChange == null
      ? null
      : Math.abs(weightChange) < 0.05
        ? 'About the same'
        : `${weightChange > 0 ? '+' : ''}${weightChange.toFixed(1)} kg`;

  return (
    <Card className="weekly-review">
      <div className="weekly-review__head">
        <div>
          <p className="weekly-review__label">Weekly review</p>
          {review.label ? (
            <p className="weekly-review__range">{review.label}</p>
          ) : null}
        </div>
        <Link to="/review" className="weekly-review__open">
          Open
        </Link>
      </div>

      {review.encouragement ? (
        <p className="weekly-review__encourage">{review.encouragement}</p>
      ) : null}

      <ul className="weekly-review__stats">
        <li>
          <span>Weight</span>
          <strong>
            {review.weight?.latestKg != null
              ? `${formatKg(review.weight.latestKg)}${
                  changeLabel ? ` · ${changeLabel}` : ''
                }`
              : review.avgWeightKg != null
                ? formatKg(review.avgWeightKg)
                : 'No weigh-ins'}
          </strong>
        </li>
        <li>
          <span>Food consistency</span>
          <strong>
            {review.food?.consistencyPercent != null
              ? `${review.food.consistencyPercent}%`
              : review.foodPercent != null
                ? `${review.foodPercent}%`
                : '—'}
          </strong>
        </li>
        <li>
          <span>Workouts</span>
          <strong>
            {review.workout
              ? `${review.workout.completed} / ${review.workout.planned}`
              : `${review.workoutsCompleted ?? 0}${
                  review.workoutsPlanned != null
                    ? ` / ${review.workoutsPlanned}`
                    : ''
                }`}
          </strong>
        </li>
        <li>
          <span>Sleep</span>
          <strong>
            {review.sleep?.avgHours != null
              ? `${review.sleep.avgHours} h`
              : review.avgSleepHours != null
                ? `${review.avgSleepHours} h`
                : '—'}
          </strong>
        </li>
        <li>
          <span>Appetite · Energy</span>
          <strong>
            {review.appetite?.average != null || review.energy?.average != null
              ? `${
                  review.appetite?.average != null
                    ? `${review.appetite.average}`
                    : '—'
                } · ${
                  review.energy?.average != null
                    ? `${review.energy.average}`
                    : '—'
                }`
              : review.avgAppetite != null
                ? `${review.avgAppetite} / 5`
                : '—'}
          </strong>
        </li>
      </ul>
    </Card>
  );
}
