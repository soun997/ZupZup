import { ThemeProvider } from 'styled-components';
import { useAppSelector } from 'hooks';

import * as styles from 'styles';
import * as router from 'router';

const App = () => {
  const curTheme = useAppSelector(state => state.themeChanger.value);

  return (
    <ThemeProvider
      theme={curTheme === 'light' ? styles.Theme : styles.DarkTheme}
    >
      <styles.GlobalStyles />
      <router.Router />
    </ThemeProvider>
  );
};

export default App;
