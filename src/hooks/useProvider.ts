import { useContext } from 'react';
import context from '../context/context';

const useProvider = () => {
	return useContext(context);
};

export default useProvider;
