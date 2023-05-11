import { Searchbar } from './Searchbar/Searchbar.jsx';

export const App = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Searchbar />
    </div>
  );
};
