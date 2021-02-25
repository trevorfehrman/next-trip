import styles from '../../styles/Route.module.scss';
import { motion } from 'framer-motion';

const Route = () => {
  return (
    <motion.main initial={{ x: '100vw' }} animate={{ x: 0 }} exit={{ x: '100vw' }}>
      <div>direction1</div>
    </motion.main>
  );
};

export default Route;
