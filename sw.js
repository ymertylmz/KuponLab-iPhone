const CACHE='kuponlab-pwa-v2';
const ASSETS=[
  '/KuponLab-iPhone/',
  '/KuponLab-iPhone/index.html',
  '/KuponLab-iPhone/manifest.webmanifest',
  '/KuponLab-iPhone/kuponlab_logo.png'
];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(u.origin===self.location.origin){
    e.respondWith(
      fetch(e.request).catch(()=>caches.match(e.request).then(r=>r||caches.match('/KuponLab-iPhone/')))
    );
  }
});
