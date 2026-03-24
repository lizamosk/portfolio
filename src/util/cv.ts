import cv from '@/assets/docs/Liza_Moskalenko_CV_Frontend.pdf'

export const downloadCV = async () => {
  const link = document.createElement('a');
  link.href = cv;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};