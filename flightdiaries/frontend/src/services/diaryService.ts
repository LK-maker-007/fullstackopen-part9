import axios from 'axios';
import type { DiaryEntry, NewDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllDiaries = async (): Promise<DiaryEntry[]> => {
  const { data } = await axios.get<DiaryEntry[]>(baseUrl);
  return data;
};

export const createDiary = async (
  entry: NewDiaryEntry
): Promise<DiaryEntry> => {
  const { data } = await axios.post<DiaryEntry>(baseUrl, entry);
  return data;
};
