import withRheostat, { HandlersState } from './hoc/withRheostat';
import AreaChart from './charts/AreaChart';
import BarChart from './charts/BarChart';
import RheostatThemeProvider, { RheostatThemeContext, defaultTheme, useRheostatTheme } from './theme';

const Rheostat = withRheostat();

const AreaRheostat = withRheostat(AreaChart);

const BarRheostat = withRheostat(BarChart);

export {
  Rheostat as default,
  AreaRheostat,
  BarRheostat,
  withRheostat,
  RheostatThemeProvider,
  RheostatThemeContext,
  defaultTheme,
  useRheostatTheme,
  HandlersState,
};
