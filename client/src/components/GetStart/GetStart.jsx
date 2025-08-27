import React from 'react';
import pic1 from '../../assets/pic1.png';
import pic2 from '../../assets/pic2.png';
import pic3 from '../../assets/pic3.png';
import pic4 from '../../assets/pic4.png';
import styles from './GetStart.module.css';

const GetStart = () => {
  return (
    <div className={styles.container}>
      <img src={pic1} alt="pic1" className={styles.image} />
      <img src={pic2} alt="pic2" className={styles.image} />
      <img src={pic3} alt="pic3" className={styles.image} />
      <img src={pic4} alt="pic4" className={styles.image} />
    </div>
  );
};

export default GetStart;
