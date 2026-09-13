import { useCallback, useEffect, useMemo, useState } from 'react';
import { buildTodaysTasks, DAILY_TASK_COUNT } from '../data/dailyTasks.js';
import { getTipForDay } from '../data/tips.js';
import {
  getDailyLog,
  getLogsForDates,
  saveTodayNote,
  toggleTask as toggleTaskInDb,
} from '../services/dailyLog.js';
import {
  computeMilestoneProgress,
  ensureStableWeightGoals,
  getLatestWeightKg,
  getProfile,
} from '../services/profile.js';
import {
  formatLongDate,
  getDayOfYear,
  getGreetingLabel,
  getGreetingPeriod,
  listDateKeys,
  toDateKey,
} from '../utils/dates.js';

/**
 * Home dashboard data + actions.
 */
export function useTodayDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [todayLog, setTodayLog] = useState(null);
  const [weekLogs, setWeekLogs] = useState([]);
  const [currentWeightKg, setCurrentWeightKg] = useState(null);
  const [now] = useState(() => new Date());

  const dateKey = toDateKey(now);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      let nextProfile = await getProfile();
      nextProfile = await ensureStableWeightGoals(nextProfile);
      const [log, weekKeys] = await Promise.all([
        getDailyLog(dateKey),
        Promise.resolve(listDateKeys(7, now)),
      ]);
      const logs = await getLogsForDates(weekKeys);
      const latestWeight = await getLatestWeightKg(nextProfile);

      setProfile(nextProfile);
      setTodayLog(log);
      setWeekLogs(logs);
      setCurrentWeightKg(latestWeight);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [dateKey, now]);

  useEffect(() => {
    load();
  }, [load]);

  const completedSet = useMemo(
    () => new Set(todayLog?.completedTaskIds || []),
    [todayLog],
  );

  const baseTasks = useMemo(
    () =>
      buildTodaysTasks(
        profile?.wakeTime || '07:00',
        profile?.bedTime || '22:30',
      ),
    [profile?.wakeTime, profile?.bedTime],
  );

  const tasks = useMemo(
    () =>
      baseTasks.map((task) => ({
        ...task,
        completed: completedSet.has(task.id),
      })),
    [baseTasks, completedSet],
  );

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = DAILY_TASK_COUNT;

  const weightStats = useMemo(() => {
    const startingKg = profile?.startingWeightKg;
    const milestoneKg = profile?.firstMilestoneKg;
    const currentKg =
      currentWeightKg ?? profile?.currentWeightKg ?? startingKg ?? null;

    if (
      !Number.isFinite(currentKg) ||
      !Number.isFinite(startingKg) ||
      !Number.isFinite(milestoneKg)
    ) {
      return null;
    }

    const { percent, deltaKg } = computeMilestoneProgress(
      currentKg,
      startingKg,
      milestoneKg,
    );

    return {
      currentKg,
      startingKg,
      milestoneKg,
      percent,
      deltaKg,
    };
  }, [profile, currentWeightKg]);

  const weeklySummary = useMemo(() => {
    const keys = listDateKeys(7, now);
    const byDate = new Map(
      weekLogs.map((log) => [log.date || log.id, log]),
    );
    let daysWithCheckIns = 0;
    const days = keys.map((key) => {
      const log = byDate.get(key);
      const count = log?.completedTaskIds?.length || 0;
      const hasCheckIn = count > 0;
      if (hasCheckIn) daysWithCheckIns += 1;
      return { dateKey: key, completedCount: count, hasCheckIn };
    });
    return {
      daysWithCheckIns,
      totalDays: 7,
      days,
    };
  }, [weekLogs, now]);

  const tip = useMemo(() => getTipForDay(getDayOfYear(now)), [now]);

  const greeting = useMemo(() => {
    const period = getGreetingPeriod(now);
    const name = profile?.preferredName?.trim() || 'friend';
    return {
      period,
      text: `${getGreetingLabel(period)}, ${name}`,
      dateLabel: formatLongDate(now),
      name,
    };
  }, [now, profile?.preferredName]);

  const toggleTask = useCallback(
    async (taskId) => {
      const previous = todayLog;
      const set = new Set(previous?.completedTaskIds || []);
      if (set.has(taskId)) set.delete(taskId);
      else set.add(taskId);

      const optimistic = {
        ...(previous || { id: dateKey, date: dateKey, note: '' }),
        id: dateKey,
        date: dateKey,
        completedTaskIds: Array.from(set),
        updatedAt: new Date().toISOString(),
      };
      setTodayLog(optimistic);

      // Keep week strip in sync for today
      setWeekLogs((prev) => {
        const others = prev.filter((l) => (l.date || l.id) !== dateKey);
        return [...others, optimistic];
      });

      try {
        const saved = await toggleTaskInDb(dateKey, taskId);
        setTodayLog(saved);
        setWeekLogs((prev) => {
          const others = prev.filter((l) => (l.date || l.id) !== dateKey);
          return [...others, saved];
        });
      } catch (err) {
        setTodayLog(previous);
        setWeekLogs((prev) => {
          const others = prev.filter((l) => (l.date || l.id) !== dateKey);
          return previous ? [...others, previous] : others;
        });
        setError(err instanceof Error ? err : new Error(String(err)));
      }
    },
    [todayLog, dateKey],
  );

  const saveNote = useCallback(
    async (text) => {
      const saved = await saveTodayNote(dateKey, text);
      setTodayLog(saved);
      return saved;
    },
    [dateKey],
  );

  return {
    loading,
    error,
    profile,
    greeting,
    weightStats,
    tasks,
    completedCount,
    totalCount,
    weeklySummary,
    tip,
    todayNote: todayLog?.note || '',
    toggleTask,
    saveNote,
    refresh: load,
  };
}
