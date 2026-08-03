import { useState } from 'react';
import { Visibility, Weather } from '../types';
import type { NewDiaryEntry } from '../types';

interface DiaryFormProps {
  onCreate: (entry: NewDiaryEntry) => void;
}

// 22: a date input and radio buttons, so the shapes cannot be mistyped
const DiaryForm = ({ onCreate }: DiaryFormProps) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [comment, setComment] = useState('');

  const submit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    onCreate({ date, weather, visibility, comment });

    setDate('');
    setComment('');
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="date">date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>

        <div>
          visibility
          {Object.values(Visibility).map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="visibility"
                value={option}
                checked={visibility === option}
                onChange={() => setVisibility(option)}
              />
              {option}
            </label>
          ))}
        </div>

        <div>
          weather
          {Object.values(Weather).map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="weather"
                value={option}
                checked={weather === option}
                onChange={() => setWeather(option)}
              />
              {option}
            </label>
          ))}
        </div>

        <div>
          <label htmlFor="comment">comment</label>
          <input
            id="comment"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>

        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
