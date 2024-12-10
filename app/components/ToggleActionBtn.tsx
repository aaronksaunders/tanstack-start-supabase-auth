/**
 * ToggleActionButton component renders a button that toggles between "CREATE ACCOUNT" and "GO BACK"
 * based on the provided action prop.
 *
 * @param {Object} props - The props object.
 * @param {"signin" | "signup"} props.action - The action type to determine the button label.
 * @param {(e: React.MouseEvent<HTMLButtonElement>) => void} props.onChange - The event handler for button click.
 *
 * @returns {JSX.Element} The rendered button element.
 */
const ToggleActionButton = ({
  action,
  onChange,
}: {
  action: 'signin' | 'signup';
  onChange: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <button
      type='button'
      onClick={onChange}
      className='w-full rounded py-2 font-semibold uppercase text-emerald-600 border border-emerald-600'>
      {action === 'signin' ? 'CREATE ACCOUNT' : 'GO BACK'}
    </button>
  );
};

export default ToggleActionButton;
