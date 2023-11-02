import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import * as styles from 'styles';
import * as router from 'router';
import * as hooks from 'hooks';

const App = () => {
  return (
    <Provider store={hooks.useStore}>
      <ThemeProvider theme={styles.DarkTheme}>
        <styles.GlobalStyles />
        <router.Router />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
