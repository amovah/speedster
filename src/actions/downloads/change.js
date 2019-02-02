import update from './update';
import suspend from './suspend';
import resume from './resume';

export default async (download, details) => {
  await update(download.id, details);

  await suspend(download.id);

  if (download.downloadStatus === 'downloading') {
    await resume(download.id);
  }
};
