import type { CoursePart } from '../types';

interface PartProps {
  part: CoursePart;
}

// a value that should never be reached tells the compiler the switch is complete
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: PartProps) => {
  const heading = (
    <strong>
      {part.name} {part.exerciseCount}
    </strong>
  );

  // 18: an exhaustive switch, so a new kind of part cannot be forgotten
  switch (part.kind) {
    case 'basic':
      return (
        <p>
          {heading}
          <br />
          <em>{part.description}</em>
        </p>
      );
    case 'group':
      return (
        <p>
          {heading}
          <br />
          project exercises {part.groupProjectCount}
        </p>
      );
    case 'background':
      return (
        <p>
          {heading}
          <br />
          <em>{part.description}</em>
          <br />
          submit to {part.backgroundMaterial}
        </p>
      );
    case 'special':
      return (
        <p>
          {heading}
          <br />
          <em>{part.description}</em>
          <br />
          required skills: {part.requirements.join(', ')}
        </p>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
