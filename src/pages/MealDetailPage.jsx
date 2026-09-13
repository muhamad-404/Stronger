import { useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import EatBackLink from '../components/EatBackLink.jsx';
import MealActionBar from '../components/MealActionBar.jsx';
import NoteSheet from '../components/NoteSheet.jsx';
import PageHeader from '../components/PageHeader.jsx';
import SubstituteSheet from '../components/SubstituteSheet.jsx';
import {
  getMealById,
  getSlotMeta,
  getSubstitutesForMeal,
  MEAL_SLOTS,
} from '../data/meals.js';
import { useTodayMeals } from '../hooks/useTodayMeals.js';
import { logCatalogMeal } from '../services/foodLog.js';
import { toDateKey } from '../utils/dates.js';
import './EatSubpage.css';
import './MealDetailPage.css';

export default function MealDetailPage() {
  const { mealId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const meal = getMealById(mealId);
  const slotFromQuery = searchParams.get('slot');
  const dateKey = toDateKey();

  const { slots, loading, markEaten, substitute, saveNote, refresh } =
    useTodayMeals(dateKey);

  const [subOpen, setSubOpen] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState(null);

  const slot = useMemo(() => {
    if (slotFromQuery) {
      return slots.find((s) => s.slotId === slotFromQuery) || null;
    }
    return slots.find((s) => s.mealId === mealId) || null;
  }, [slots, slotFromQuery, mealId]);

  const alternatives = useMemo(
    () => (meal ? getSubstitutesForMeal(meal.id) : []),
    [meal],
  );

  if (!meal) {
    return (
      <div className="page eat-subpage">
        <EatBackLink to="/eat/browse" label="Ideas" />
        <PageHeader
          title="Meal not found"
          subtitle="Try another idea from the library."
        />
      </div>
    );
  }

  const resolveSlotId = () => {
    if (slotFromQuery) return slotFromQuery;
    if (slot?.slotId) return slot.slotId;
    const match = MEAL_SLOTS.find((s) => s.category === meal.category);
    return match?.id || 'breakfast';
  };

  const handleToggleEaten = async () => {
    setBusy(true);
    setActionError(null);
    try {
      const sid = resolveSlotId();
      if (!slot || slot.mealId !== meal.id) {
        await substitute(sid, meal.id);
      }
      const currentlyEaten = Boolean(slot?.eaten && slot?.mealId === meal.id);
      await markEaten(sid, !currentlyEaten);
      await refresh();
    } catch {
      setActionError('Couldn’t update that right now.');
    } finally {
      setBusy(false);
    }
  };

  const handleSubstituteSelect = async (nextMealId) => {
    setBusy(true);
    setActionError(null);
    try {
      const sid = resolveSlotId();
      await substitute(sid, nextMealId);
      setSubOpen(false);
      navigate(`/eat/meal/${nextMealId}?slot=${sid}`, { replace: true });
      await refresh();
    } catch {
      setActionError('Couldn’t switch meals.');
    } finally {
      setBusy(false);
    }
  };

  const handleSaveNote = async (text) => {
    const sid = resolveSlotId();
    if (!slot || slot.mealId !== meal.id) {
      await substitute(sid, meal.id);
    }
    await saveNote(sid, text);
    await refresh();
  };

  const handleLogMeal = async () => {
    setBusy(true);
    setActionError(null);
    try {
      const sid = resolveSlotId();
      if (!slot || slot.mealId !== meal.id) {
        await substitute(sid, meal.id);
      }
      await logCatalogMeal({
        dateKey,
        slotId: sid,
        mealId: meal.id,
        eaten: true,
      });
      navigate('/eat/today');
    } catch {
      setActionError('Couldn’t add this meal to your food log.');
    } finally {
      setBusy(false);
    }
  };

  const eaten = Boolean(slot?.eaten && slot?.mealId === meal.id);
  const noteValue = slot?.mealId === meal.id ? slot?.note || '' : '';
  const slotLabel = getSlotMeta(resolveSlotId())?.label;

  return (
    <div className="page eat-subpage meal-detail">
      <EatBackLink to="/eat/browse" label="Ideas" />
      <PageHeader title={meal.title} subtitle={meal.description} />

      <div className="meal-detail__meta">
        <span className="meal-detail__chip">{meal.category}</span>
        {meal.pakistani ? (
          <span className="meal-detail__chip">Home-style</span>
        ) : null}
        {meal.easyWhenAppetiteLow ? (
          <span className="meal-detail__chip meal-detail__chip--soft">
            Easy when low appetite
          </span>
        ) : null}
        {slotLabel ? (
          <span className="meal-detail__chip">For {slotLabel}</span>
        ) : null}
      </div>

      <Card>
        <h2 className="meal-detail__section-title">Ingredients</h2>
        <ul className="meal-detail__list">
          {meal.ingredients.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h2 className="meal-detail__section-title">How to prepare</h2>
        <p className="meal-detail__prep">{meal.preparation}</p>
        <p className="meal-detail__protein">
          Protein focus: {meal.proteinSource}
        </p>
      </Card>

      <Button
        variant="primary"
        size="lg"
        fullWidth
        disabled={busy}
        onClick={handleLogMeal}
      >
        Log this meal
      </Button>

      {loading ? (
        <p className="page-placeholder">Checking today’s plan…</p>
      ) : (
        <MealActionBar
          eaten={eaten}
          disabled={busy}
          onToggleEaten={handleToggleEaten}
          onSubstitute={() => setSubOpen(true)}
          onAddNote={() => setNoteOpen(true)}
        />
      )}

      {actionError ? (
        <p className="eat-subpage__error" role="alert">
          {actionError}
        </p>
      ) : null}

      <SubstituteSheet
        open={subOpen}
        alternatives={alternatives}
        currentMealId={meal.id}
        onClose={() => setSubOpen(false)}
        onSelect={handleSubstituteSelect}
      />

      <NoteSheet
        open={noteOpen}
        initialValue={noteValue}
        onClose={() => setNoteOpen(false)}
        onSave={handleSaveNote}
      />
    </div>
  );
}
