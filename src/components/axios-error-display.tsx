interface AxiosErrorDisplayProps {
  errors: Record<string, string[]>;
}

export function AxiosErrorDisplay({ errors }: AxiosErrorDisplayProps) {
  return (
    <div>
      {
        Object.keys(errors).length > 0 && (
          <div className="text-destructive">
            Errors:
            {Object.entries(errors).map(([field, messages]) => (
              <div key={field}>
                <strong>{field}:</strong> {messages.join(", ")}
              </div>
            ))}
          </div>
        )
      }
    </div>
  )
}
