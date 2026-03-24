import { CV_PATH } from '@/contants'

export const downloadCV = async () => {
  const link = document.createElement('a');
  link.href = CV_PATH;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};