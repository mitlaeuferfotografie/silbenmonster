# lokal_bauen.sh – baut die App nach _site/ (dieselben Schritte wie .github/workflows/pages.yml, das dieses Skript aufruft).
# Aufruf im Repo-Ordner:  bash werkzeuge/lokal_bauen.sh   danach z. B.  npx serve _site  oder  python -m http.server -d _site
# Abhängigkeiten: Node 20 + npm (lädt react, lucide-react, qrcode-generator, esbuild, tailwindcss in build/).
set -e
cd "$(dirname "$0")/.."
rm -rf build _site
mkdir -p build _site
cp -r src build/src
cd build
npm init -y > /dev/null
npm install --silent react@18.1.0 react-dom@18.1.0 lucide-react@^0.577.0 qrcode-generator@1.4.4 esbuild tailwindcss@3
npx esbuild src/index.js --bundle --minify --loader:.js=jsx --jsx=automatic \
  --define:process.env.NODE_ENV='"production"' --outfile=../_site/bundle.js
# Tailwind wird beim Bauen erzeugt (kein CDN, keine Verbindung zu Drittanbietern)
npx tailwindcss@3 -i src/tailwind-input.css -o ../_site/tailwind.css \
  --content "src/**/*.{js,jsx},../public/index.html" --minify
cd ..
node -e "
  const fs = require('fs');
  let h = fs.readFileSync('public/index.html', 'utf8');
  h = h.replace(/<script type=\"module\"[^>]*><\/script>/, '');
  // Versionsnummer an die Dateien hängen: So holt jedes iPad nach einem Update die neue Fassung
  const v = (process.env.GITHUB_SHA || String(Date.now())).slice(0, 8);
  h = h.replace('href=\"tailwind.css\"', 'href=\"tailwind.css?v=' + v + '\"');
  h = h.replace('</body>', '  <script src=\"bundle.js?v=' + v + '\"></script>\n  </body>');
  fs.writeFileSync('_site/index.html', h);
"
# mitliefern, falls vorhanden
for d in fonts audio silben bilder; do [ -d public/$d ] && cp -r public/$d _site/$d; done
[ -f public/apple-touch-icon.png ] && cp public/apple-touch-icon.png _site/ || true
touch _site/.nojekyll
echo "Fertig: _site/"
