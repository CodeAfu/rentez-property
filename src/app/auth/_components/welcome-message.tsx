
interface WelcomeMessageProps {
  message: string;
}

export default function WelcomeMessage({ message }: WelcomeMessageProps) {
  return (
    <p className="inline-flex flex-col text-xs leading-none">
      <span>Welcome, </span>
      <span className="font-semibold text-primary text-sm leading-none">
        {message}
      </span>
    </p>
  );
}
