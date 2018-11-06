import action from './action';
import { langs } from '../lang';

export const getPlayer = accountId => action('player', process.env.REACT_APP_API_HOST, `api/players/${accountId}`);
export const getGuild = accountId => action('guild', process.env.REACT_APP_API_HOST, `api/guilds/${accountId}`);
export const getStrings = () => async (dispatch) => {
  const savedLang = window.localStorage && window.localStorage.getItem('localization');
  const defaultLang = langs[0];
  const selectedLang = langs.find(lang => lang.value === savedLang) || langs[0];
  const defData = await import(`../lang/${defaultLang.value}.json`);
  const selData = await import(`../lang/${selectedLang.value}.json`);
  dispatch({ type: 'strings', payload: { ...defData, ...selData } });
};
