import styles from '../../styles/Route.module.scss';
import { motion } from 'framer-motion';

const Route = () => {
  return (
    <motion.main initial={{ y: '-100vh' }} animate={{ y: 0 }} exit={{ y: '-100vh' }}>
      <div>direction1</div>
    </motion.main>
  );
};

export default Route;
