import Button from "./Button";

export default function Welcome({ label }: WelcomeProps) {
  return (
    <div>
      <div>
        <label>{label}</label>
        <input name={label} id={label} />
      </div>
      <Button type="primary">Submit</Button>
    </div>
  );
}

interface WelcomeProps {
  label: string;
}
