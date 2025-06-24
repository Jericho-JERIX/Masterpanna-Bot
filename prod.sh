$name="Masterpanna-Bot"

echo "[$name] Initializing..."

echo "[$name] Initalizing database..."
npx prisma migrate deploy
echo "[$name] Initalizing database... done"

echo "[$name] Building..."
npm run build
echo "[$name] Building... done"

echo "[$name] Starting $name to pm2 ..."
pm2 restart 10
echo "[$name] Done."
