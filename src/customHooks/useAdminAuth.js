import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { checkUserIsAdmin } from '../utils/utils';

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const useAdminAuthS = () => {
  const history = useHistory();
  // returns current user
  const { currentUser } = useSelector(mapState);
  useEffect(() => {
    if (!checkUserIsAdmin(currentUser)) {
      history.push('/login');
    }
  }, [currentUser]);

  return currentUser;
};

export default useAdminAuthS;
