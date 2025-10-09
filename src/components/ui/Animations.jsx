import { useSpring, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export default function AnimatedNumber({ value }) {
  const count = useMotionValue(0);

  useEffect(() => {
    count.set(value);
  }, [value, count]);

  const spring = useSpring(count, {
    bounce: 0.25,
    duration: 0.6,
  });

  const rounded = useTransform(spring, (latest) => Math.round(latest));

  return <motion.span>{rounded}</motion.span>;
}