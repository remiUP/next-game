ssh pi@192.168.1.102
cd next-game
git pull
npm run build
pm2 reload next-game