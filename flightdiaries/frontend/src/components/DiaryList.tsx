import type { DiaryEntry } from '../types';

interface DiaryListProps {
  diaries: DiaryEntry[];
}

const DiaryList = ({ diaries }: DiaryListProps) => (
  <div>
    <h2>Diary entries</h2>
    {diaries.map((diary) => (
      <div key={diary.id}>
        <h3>{diary.date}</h3>
        <div>visibility: {diary.visibility}</div>
        <div>weather: {diary.weather}</div>
        {diary.comment && <div>{diary.comment}</div>}
      </div>
    ))}
  </div>
);

export default DiaryList;
