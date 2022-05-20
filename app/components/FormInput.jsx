export default function FormInput({ name, label, type, ...props }) {
  if (label.length > 0) {
    return (
      <label class="flex flex-col items-start">
        {label}
        <input {...props} name={name} type={type} class="border mt-2 border-slate-500 rounded-md" />
      </label>
    )
  } else {
    return (
      <input {...props} name={name} type={type} class="border mt-2 border-slate-500 rounded-md" />
    )
  }
}