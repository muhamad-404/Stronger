import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import AddFoodSheet from '../components/AddFoodSheet.jsx';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import DateSwitcher from '../components/DateSwitcher.jsx';
import EatBackLink from '../components/EatBackLink.jsx';
import FoodDaySummary from '../components/FoodDaySummary.jsx';
import FoodLogItem from '../components/FoodLogItem.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { useFoodLog } from '../hooks/useFoodLog.js';
import { useTodayMeals } from '../hooks/useTodayMeals.js';
import { getMealById } from '../data/meals.js';
import './EatSubpage.css';
import './EatTodayPage.css';

export default function EatTodayPage() {
  const foodLog = useFoodLog();
  const { slots } = useTodayMeals(foodLog.dateKey);

  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetMode, setSheetMode] = useState('add');
  const [editing, setEditing] = useState(null);
  const [prefSlotId, setPrefSlotId] = useState('breakfast');
  const [busyId, setBusyId] = useState(null);

  const slotIdeas = useMemo(() => {
    const map = {};
    slots.forEach((slot) => {
      map[slot.slotId] = slot.meal;
    });
    return map;
  }, [slots]);

  const openAdd = (slotId) => {
    setSheetMode('add');
    setEditing(null);
    setPrefSlotId(slotId || 'breakfast');
    setSheetOpen(true);
  };

  const openEdit = (entry) => {
    setSheetMode('edit');
    setEditing(entry);
    setPrefSlotId(entry.slotId);
    setSheetOpen(true);
  };

  const quickPicks = useMemo(() => {
    const meal = slotIdeas[prefSlotId] || getMealById(editing?.mealId);
    return meal?.ingredients?.slice(0, 6) || [];
  }, [slotIdeas, prefSlotId, editing]);

  const initialValues = editing
    ? editing
    : { slotId: prefSlotId, eaten: true };

  const handleSave = async (form) => {
    if (sheetMode === 'edit' && editing) {
      await foodLog.edit(editing.id, form);
    } else {
      await foodLog.add(form);
    }
  };

  const handleDelete = async (entry) => {
    const ok = window.confirm(`Remove “${entry.foodTitle}” from this day?`);
    if (!ok) return;
    setBusyId(entry.id);
    try {
      await foodLog.remove(entry.id);
    } finally {
      setBusyId(null);
    }
  };

  const handleAddFromIdea = async (slotId, meal) => {
    if (!meal) return;
    setBusyId(slotId);
    try {
      await foodLog.logMeal({ slotId, mealId: meal.id, eaten: true });
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="page eat-subpage eat-today-log">
      <EatBackLink />
      <PageHeader
        title="Food log"
        subtitle="Track what you ate — portions, not calories."
      />

      <DateSwitcher
        dateKey={foodLog.dateKey}
        todayKey={foodLog.todayKey}
        canGoNext={foodLog.canGoNext}
        onPrev={foodLog.goPrevDay}
        onNext={foodLog.goNextDay}
        onToday={foodLog.goToday}
      />

      {foodLog.loading ? (
        <p className="page-placeholder">Loading this day…</p>
      ) : null}

      {foodLog.error ? (
        <p className="eat-subpage__error" role="alert">
          Couldn’t load the food log. Try refreshing.
        </p>
      ) : null}

      {!foodLog.loading ? (
        <>
          <FoodDaySummary summary={foodLog.summary} />

          <div className="eat-today-log__slots">
            {foodLog.grouped.map(({ slot, entries }) => {
              const idea = slotIdeas[slot.id];
              return (
                <Card key={slot.id} padding="none" className="eat-today-log__slot-card">
                  <div className="eat-today-log__slot-head">
                    <div>
                      <h2 className="eat-today-log__slot-title">{slot.label}</h2>
                      {idea ? (
                        <p className="eat-today-log__idea">Idea: {idea.title}</p>
                      ) : null}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openAdd(slot.id)}
                    >
                      <Plus size={16} aria-hidden />
                      Add
                    </Button>
                  </div>

                  {idea && !entries.length ? (
                    <div className="eat-today-log__idea-actions">
                      <Button
                        variant="secondary"
                        size="sm"
                        disabled={busyId === slot.id}
                        onClick={() => handleAddFromIdea(slot.id, idea)}
                      >
                        Add from idea
                      </Button>
                    </div>
                  ) : null}

                  {entries.length ? (
                    <ul className="eat-today-log__list">
                      {entries.map((entry) => (
                        <li key={entry.id}>
                          <FoodLogItem
                            entry={entry}
                            onToggle={(id) => foodLog.toggleEaten(id)}
                            onEdit={openEdit}
                            onDelete={handleDelete}
                          />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="eat-today-log__empty">No foods logged yet.</p>
                  )}
                </Card>
              );
            })}
          </div>
        </>
      ) : null}

      <AddFoodSheet
        open={sheetOpen}
        mode={sheetMode}
        initialValues={initialValues}
        quickPicks={quickPicks}
        onClose={() => setSheetOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
