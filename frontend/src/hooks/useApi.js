import { useEffect, useState } from 'react';
import { get } from '../api';
import * as fallback from '../data/fallback';

// path e.g. '/faqs' -> fallback.faqs (backend band ho tab bhi site me content dikhe)
export default function useApi(path) {
  const key = path.replace('/', '');
  const [data, setData] = useState(fallback[key] || []);
  useEffect(() => { get(path).then(setData).catch(() => setData(fallback[key] || [])); }, [path, key]);
  return { data };
}
