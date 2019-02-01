import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { resolve } from 'path';
import { homedir } from 'os';
import { remote } from 'electron';
import uid from 'uuid/v4';

const adapter = new FileSync(resolve(remote.app.getPath('appData'), 'speedster.db.json'));
const db = lowdb(adapter);

db.defaults({
  setting: {
    port: 6812,
    url: 'http://localhost:6812/jsonrpc',
    downloaddir: resolve(homedir(), 'Downloads', 'Speedster'),
  },
  categories: [
    {
      id: uid(),
      name: 'Compresseds',
      extensions: [
        '.gz',
        '.rar',
        '.zip',
      ],
    },
    {
      id: uid(),
      name: 'Musics',
      extensions: [
        '.mp3',
        '.aa',
        '.aac',
        '.aax',
        '.act',
        '.aiff',
        '.amr',
        '.ape',
        '.au',
        '.awb',
        '.dct',
        '.dss',
        '.dvf',
        '.flac',
        '.gsm',
        '.iklax',
        '.ivs',
        '.m4a',
        '.m4b',
        '.m4p',
        '.mmf',
        '.mpc',
        '.msv',
        '.nmf',
        '.nsf',
        '.ogg',
        '.oga',
        '.mogg',
        '.opus',
        '.ra',
        '.rm',
        '.raw',
        '.sln',
        '.tta',
        '.vox',
        '.wav',
        '.wma',
        '.wv',
        '.8svx',
      ],
    },
    {
      id: uid(),
      name: 'Pictures',
      extensions: [
        '.jpg',
      ],
    },
    {
      id: uid(),
      name: 'Documents',
      extensions: [
        '.pdf',
      ],
    },
    {
      id: uid(),
      name: 'Videos',
      extensions: [
        '.mp4',
        '.webm',
        '.mkv',
        '.flv',
        '.vob',
        '.ogv',
        '.ogg',
        '.drc',
        '.gif',
        '.gifv',
        '.mmg',
        '.avi',
        '.mts',
        '.m2ts',
        '.mov',
        '.qt',
        '.wmv',
        '.yuv',
        '.rm',
        '.rmvb',
        '.asf',
        '.amv',
        '.m4p',
        '.m4v',
        '.mpg',
        '.mp2',
        '.mpeg',
        '.mpe',
        '.mpv',
        '.m2v',
        '.m4v',
        '.svi',
        '.3gp',
        '.3g2',
        '.mxf',
        '.roq',
        '.nsv',
        '.f4v',
        '.f4p',
        '.f4a',
        '.f4b',
      ],
    },
    {
      id: uid(),
      name: 'Others',
      extensions: [],
    },
  ],
  downloads: [
  ],
}).write();

db.read();

export default db;
