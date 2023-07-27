import { store } from '@/redux/store';
import { useDispatch } from 'react-redux';

export const useAppDispatch = useDispatch<typeof store.dispatch>;
