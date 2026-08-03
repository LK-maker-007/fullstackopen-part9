import { useEffect, useState } from 'react';
import axios from 'axios';
import DiaryForm from './components/DiaryForm';
import DiaryList from './components/DiaryList';
import Notification from './components/Notification';
import { createDiary, getAllDiaries } from './services/diaryService';
import type { DiaryEntry, NewDiaryEntry } from './types';

// pull the reasons out of the zod issues the backend sends back
const reasonFromResponse = (data: unknown): string | null => {
  if (!data || typeof data !== 'object' || !('error' in data)) {
    return null;
  }

  const issues = data.error;
  if (!Array.isArray(issues)) {
    return null;
  }

  return issues
    .map((issue: unknown) => {
      if (
        issue &&
        typeof issue === 'object' &&
        'path' in issue &&
        'message' in issue
      ) {
        const path = Array.isArray(issue.path) ? issue.path.join('.') : '';
        return path ? `${path}: ${String(issue.message)}` : String(issue.message);
      }
      return String(issue);
    })
    .join(', ');
};

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 19
  useEffect(() => {
    void getAllDiaries().then((data) => setDiaries(data));
  }, []);

  const notify = (message: string) => {
    setError(message);
    setTimeout(() => setError(null), 5000);
  };

  // 20 and 21
  const handleCreate = async (entry: NewDiaryEntry) => {
    try {
      const created = await createDiary(entry);
      setDiaries(diaries.concat(created));
      setError(null);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        notify(reasonFromResponse(e.response?.data) ?? e.message);
      } else {
        notify('Unknown error');
      }
    }
  };

  return (
    <div>
      <Notification message={error} />
      <DiaryForm onCreate={(entry) => void handleCreate(entry)} />
      <DiaryList diaries={diaries} />
    </div>
  );
};

export default App;
